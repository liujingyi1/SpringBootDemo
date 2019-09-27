/**
 * 
 */

$(document).ready(function(){
	
	var stompClient = null;
	function setConnected(connected) {
		document.getElementById("connect").disable = connected;
		document.getElementById("disconnect").disable = !connected;
		$("#message").html("");
	}
	
	function connect() {
		var socket = new SockJS("webServer");
		stompClient = Stomp.over(socket);
		stompClient.connect({}, function(frame) {
			setConnected(true);
			console.log('Connected: '+frame);
			listenInfo();
			retryCount = 0;
			
//			stompClient.subscribe('/user/zhangsan/message', function(response){
//				console.log('response: '+response.body);
//				setMessageInnerHTML(response.body);
//			});
			
		}, function(frame) {
			console.log('error: '+frame);
			reconnectWs();
		});
	}

	var lastSendDate = new Date();
	function listenInfo() {
		var listenUrl = "/topic/getResponse";
		stompClient.subscribe(listenUrl, function(response){
			console.log('response: '+response.body);
			setMessageInnerHTML(response.body);

			var currentDate = new Date();
            if((currentDate.getTime()-lastSendDate.getTime())>=50000){
				stompClient.send("/topic/heartbeat", {}, currentDate);
                lastSendDate = new Date();
            }
		});
	}
	
	var retryCount = 0;
	var MAX_RETRY_COUNT = 10;
	function reconnectWs(){
		if (retryCount < MAX_RETRY_COUNT) {
			retryCount += 1;
			setTimeout(function(){
				  console.log('>>> try to reconnect');
				  connect();
			}, 3000);
		}
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