package com.example.SpringBoot.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.example.SpringBoot.Bean.Person;
import com.example.SpringBoot.Bean.Student;

@RestController
public class HelloController {


	@Autowired
	Person person;
	
	@RequestMapping("hello")
	public String hello() {
		
		return JSON.toJSONString(person);
		
//		return person.toString();
		
	}
	
	@RequestMapping("/table/get")
	public String getTableData() {
		List<Student> personList = new ArrayList<Student>();
		
		for(int i = 0; i < 6; i++) {
			personList.add(new Student(randomString(), randomInt()));
		}
		
		return JSON.toJSONString(personList);
	}
	
	private String randomString() {
		StringBuilder sb = new StringBuilder();
		char base = 'A';
		int max=25,min=0;
		int length = 6;
		for (int i = 0; i < length; i++) {
			int ran = (int) (Math.random()*(max-min)+min);
			sb.append((char)(base+ran));
		}
		return sb.toString();
	}
	
	private int randomInt() {
		int max=80,min=10;
		int ran = (int) (Math.random()*(max-min)+min);
		return ran;
	}
}
