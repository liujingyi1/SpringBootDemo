package com.example.SpringBoot.Controller;

import java.util.Iterator;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;

@ServerEndpoint("/testWebsocket/{id}/{name}")
@RestController
public class WebSocketController {
    // 用来记录当前连接数的变量
    private static volatile int onlineCount = 0;

    // concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象
    private static CopyOnWriteArraySet<WebSocketController> webSocketSet = new CopyOnWriteArraySet<WebSocketController>();

    // 与某个客户端的连接会话，需要通过它来与客户端进行数据收发
    private Session session;
    
    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketController.class);
    
    @OnOpen
    public void onOpen(Session session, @PathParam("id") long id, @PathParam("name") String name) throws Exception {
        this.session = session;
        LOGGER.info("Open a websocket. session.getId()={}", this.session.getId());
        webSocketSet.add(this);
        
        addOnlineCount();
        LOGGER.info("Open a websocket. id={}, name={}", id, name);
        LOGGER.info("Open a websocket. onlineCount={}", onlineCount);
    }
    
    @OnClose
    public void onClose() {
        webSocketSet.remove(this);
        subOnlineCount();
        LOGGER.info("Close a websocket. ");
    }
    
    @OnMessage
    public void onMessage(String message, Session session) {
    	LOGGER.info("Open a websocket. this.session={}", this.session.getId());
    	LOGGER.info("Open a websocket. current.session={}", session.getId());
        LOGGER.info("Receive a message from client: " + message);
    }
    
    @OnError
    public void onError(Session session, Throwable error) {
        LOGGER.error("Error while websocket. ", error);
    }
    
    public void sendMessage(String message) throws Exception {
        if (this.session.isOpen()) {
            this.session.getBasicRemote().sendText("Send a message from server. ");
        }
    }
    
    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketController.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketController.onlineCount--;
    }
    
    public static void sendAllClientMessage() {
    	Iterator<WebSocketController> iterator = webSocketSet.iterator();
    	while (iterator.hasNext()) {
			try {
				WebSocketController webSocket = iterator.next();
				webSocket.sendMessage("我向所有人发送了一个消息");
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
    }
}
