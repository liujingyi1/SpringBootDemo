package com.example.SpringBoot.Controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;

@Controller
public class PageController {
	private static final String TAG = "PageController";
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PageController.class);

	@RequestMapping("index")
	public String homePage(HttpServletRequest request) {
		Object obj = request.getSession().getAttribute("SPRING_SECURITY_CONTEXT");
		LOGGER.info("sesson {}", JSON.toJSONString(obj));
		LOGGER.info("-----homePage------");
		return "index";
	}
	
	@RequestMapping("table-sample")
	public String tablePage() {
		LOGGER.info("-----tableSample------");
		return "table-sample";
	}
	
	@RequestMapping("websocket-sample")
	public String websocketPage() {
		LOGGER.info("-----websocketPage------");
		return "websocket-sample";
	}
	
}
