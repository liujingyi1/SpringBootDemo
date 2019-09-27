package com.example.SpringBoot.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketSockJSController {
	
	private static final Logger LOGGER = 
			LoggerFactory.getLogger(WebSocketSockJSController.class);
	
	@Autowired
	public SimpMessagingTemplate template;
	
	/*
	 * 收到发送给subscribe的消息,然后回复给订阅了/topic/getResponse的用户
	 */
	@MessageMapping("/subscribe")
	public void subscribe(String name) {
		template.convertAndSend("/topic/getResponse", name);
	}
	
	/*
	 * 会在路径最前面加上/user，所以这个消息发送的路径应该是/user/zhangsan/message
	 */
	@MessageMapping("/queue")
	public void queuw(String name) {
		template.convertAndSendToUser("zhangsan", "/message", name);
	}
	
	/*
	 * SentTo相当于回复消息， 和convertAndSend效果一样
	 * 其中id可以接受路径参数
	 * header里的name是js中发送的第二个参数stompClient.send("/welcome/123", {name:"xiaohong"}, "nihao");
	 */
	@MessageMapping("/welcome/{id}")
	@SendTo("/topic/getResponse")
	public String say(String message, @Header("name") String name,
			@DestinationVariable("id") String id) throws Exception {

		LOGGER.info("receive message id={},name={},message={}",id,name,message);
		Thread.sleep(1000);
		return "jingyi";
	}
	
    @SubscribeMapping("/topic/getResponse")
    public String sub() {
    	LOGGER.info("XXX用户订阅了我。。。");
        return "订阅成功";
    }
    
    @MessageMapping("/topic/heartbeat")
    public String heart(String date) {
    	LOGGER.info("heart beating date:{}", date);
    	return "11";
    }
}
