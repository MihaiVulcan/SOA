package com.example.notificationservice.amq;

import com.example.notificationservice.model.NotificationMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.log4j.Log4j2;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Log4j2
@Component
public class NotificationSender {

    ObjectMapper Obj = new ObjectMapper();
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Autowired
    private TopicExchange topicExchange;
    @Scheduled(fixedDelay = 1000, initialDelay = 500)
    public void send(NotificationMessage notificationMessage) {
        try {
            String json = Obj.writeValueAsString(notificationMessage);
            log.info("Sending message on " + topicExchange.getName() + " " + json);
            rabbitTemplate.convertAndSend(topicExchange.getName(), "notification", json);
        }
        catch(Exception e) {
            log.error("Error");
        }

    }
}

