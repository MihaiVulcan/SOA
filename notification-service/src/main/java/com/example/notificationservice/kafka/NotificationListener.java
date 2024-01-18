package com.example.notificationservice.kafka;

import com.example.notificationservice.amq.NotificationSender;
import com.example.notificationservice.model.NotificationMessage;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class NotificationListener {
    @Autowired
    NotificationSender notificationSender;
    @KafkaListener(topics = "notification", containerFactory = "kafkaListenerContainerFactory")
    public void newProductListener(NotificationMessage notification) {
        log.info("Get request from notification topic " + notification.toString());
        notificationSender.send(notification) ;
    }
}
