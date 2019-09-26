package com.example.SpringBoot.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.SpringBoot.Controller.WebSocketController;

@Component
public class ServerTask {
	
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServerTask.class);


    /**
     * 每隔 2s 执行一次
     */
//    @Scheduled(cron = "0/5 * * * * ?")
    public void websocket() throws Exception {
    	LOGGER.info("推送消息");
    	WebSocketController.sendAllClientMessage();
    }
	
}













