package com.dev.DevApp;

import com.dev.DevApp.service.ActivityService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })

public class DevAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(DevAppApplication.class, args);
	}
	

}
