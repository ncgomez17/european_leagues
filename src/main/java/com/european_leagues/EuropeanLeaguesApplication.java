package com.european_leagues;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableJpaRepositories(basePackages="com.european_leagues.european_leagues.model.repositories")
@ComponentScan({"com.european_leagues.european_leagues.model.ws.controllers"})
@EntityScan("com.european_leagues.european_leagues.model.entities")
@EnableTransactionManagement
@EnableAutoConfiguration
public class EuropeanLeaguesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EuropeanLeaguesApplication.class, args);
	}

}
