package com.growstory.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    // 엔드 포인트 및 CORS 설정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
                // STOMP 접속 주소
        registry.addEndpoint("/ws")
                // CORS 설정
                .setAllowedOrigins("*", "https://growstory.vercel.app", "http://localhost:3000")
                // SockJS 라이브러리 사용
                .withSockJS();
    }

    // 메시지 브로커 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 서버 -> 클라이언트, '/sub'이 prefix로 붙은 destination의 클라이언트에게 메시지 전송
        registry.enableSimpleBroker("/sub");
        // 클라이언트 -> 서버, '/pub'이 prefix로 붙은 메시지들은 @MessageMapping이 붙은 메소드로 바운드 된다.
        registry.setApplicationDestinationPrefixes("/pub");
    }


}
