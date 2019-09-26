/**
 * 
 */
$(document).ready(function(){

	
	$("#send_message").click(function() {
		if (websocket != null && websocket.readyState == 1) {
			send();
		}
	});
	
	var websocket = null;
	$("#link").click(function(){
		//判断当前浏览器是否支持WebSocket
		if ('WebSocket' in window) {
			if (websocket == null || websocket.readyState != 1) {
		        // 不带参数的写法
	//	        websocket = new WebSocket("ws://127.0.0.1:8081/demo/testWebsocket");
		        // 通过路径传递参数的方法（服务端采用第一种方法"@ServerEndpoint"实现）
		        websocket = new WebSocket("ws://127.0.0.1:8081/demo/testWebsocket/23/Lebron");
		        // 通过类似GET请求方式传递参数的方法（服务端采用第二种方法"WebSocketHandler"实现）
	//	        websocket = new WebSocket("ws://127.0.0.1:8081/demo/testWebsocket?id=23&name=Lebron");
			
		        //连接发生错误的回调方法
		        websocket.onerror = function () {
		            setMessageInnerHTML("WebSocket连接发生错误");
		        };

		        //连接成功建立的回调方法
		        websocket.onopen = function () {
		            setMessageInnerHTML("WebSocket连接成功");
		        }

		        //接收到消息的回调方法
		        websocket.onmessage = function (event) {
		            setMessageInnerHTML(event.data);
		        }

		        //连接关闭的回调方法
		        websocket.onclose = function () {
		            setMessageInnerHTML("WebSocket连接关闭");
		        }

		        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
		        window.onbeforeunload = function () {
		            closeWebSocket();
		        }
			}
	    } else {
	        alert('当前浏览器 Not support websocket')
	    }
	});

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

    //关闭WebSocket连接
    function closeWebSocket() {
        websocket.close();
    }

    //发送消息
    function send() {
        var message = document.getElementById('input_text').value;
        websocket.send(message);
    }
});