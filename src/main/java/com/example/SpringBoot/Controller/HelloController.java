package com.example.SpringBoot.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.SpringBoot.Bean.Person;

@RestController
public class HelloController {


	@Autowired
	Person person;
	
	@RequestMapping("hello")
	public String hello() {
		
		return person.toString();
		
	}
	
}
