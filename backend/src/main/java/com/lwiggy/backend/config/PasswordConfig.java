package com.lwiggy.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class PasswordConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

/**
*
* npm run dev
* java -jar target/*.jar
*
 * nohup java -jar backend/target/*.jar > logs/backend.log 2>&1 &
 *
 * cd frontend/
 *
 * nohup npm run dev > ../logs/frontend.log 2>&1 &
 *
 * */