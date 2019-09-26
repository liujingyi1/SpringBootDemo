/**
 * 
 */

$(document).ready(function(){
	
	var stompClient = null;
	function setConnected(connected) {
		document.getElementById("connect").disable = connected;
		document.getElementById("disconnect").disable = !connected;
		$("#message").html;
	}
	
	function connect() {
		var socket = new SockJS("webServer");
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			setConnected(true);
			console.log('Connected: '+frame);
			stompClient.subscribe('/topic/getResponse', function(response){
				console.log('response: '+response.body);
				setMessageInnerHTML(response.body);
			});
//			stompClient.subscribe('/user/zhangsan/message', function(response){
//				console.log('response: '+response.body);
//				setMessageInnerHTML(response.body);
//			});
		});
	}
	
    function disconnect() {
        if (stompClient != null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }
    
    function sendName() {
        var name = document.getElementById('input_text').value;
        console.info(1111111111);
        /*
         * 123是路径参数
         * {}里面的会作为Header传过去
         */
        stompClient.send("/welcome/123", {name:"xiaohong"}, "nihao");
//        stompClient.send("/subscribe", {}, JSON.stringify({ 'name': name }));
//        stompClient.send("/queue", {}, "xiaohong");
    }
    
    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
        document.getElementById('message').innerHTML += innerHTML + '<br/>';
    }

    $("#connect").click(function() {
		connect();
	});
    
    $("#disconnect").click(function() {
		disconnect();
	});
    
    $("#send_message").click(function() {
		sendName();
	});
	
});