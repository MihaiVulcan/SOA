package com.example.restservice.kafka;

import com.google.common.util.concurrent.ListenableFuture;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFutureCallback;

import java.io.Serializable;
import java.util.concurrent.CompletableFuture;
import java.util.function.BiConsumer;


@NoArgsConstructor
@Component
@Log4j2
public class NotificationProducer {
    final String notificationTopic = "notification";

    private KafkaTemplate<String, Serializable> kafkaTemplate;

    @Autowired
    public NotificationProducer(KafkaTemplate<String, Serializable> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(NotificationMessage message) {
        CompletableFuture<SendResult<String, Serializable>> future = kafkaTemplate.send(notificationTopic, message);

        future.whenComplete(new BiConsumer() {
            @Override
            public void accept(Object o, Object o2) {
                log.info("Message sent successfully with offset = {}");
            }

            @Override
            public BiConsumer andThen(BiConsumer after) {
                return BiConsumer.super.andThen(after);
            }

//            @Override
//            public void onFailure(Throwable ex) {
//                log.error("Unable to send message = {} dut to: {}", message.toString(), ex.getMessage());
//            }
//
//            @Override
//            public void onSuccess(SendResult<String, Serializable> result) {
//                log.info("Message sent successfully with offset = {}", result.getRecordMetadata().offset());
//            }
        });
    }
}
