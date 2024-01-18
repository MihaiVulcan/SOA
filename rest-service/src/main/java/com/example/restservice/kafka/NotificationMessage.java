package com.example.restservice.kafka;

import com.example.restservice.model.Car;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class NotificationMessage extends Car implements Serializable {
    String action;

    public NotificationMessage(String action, Car car){
        this.action = action;
        this.setCarId(car.getCarId());
        this.setModel(car.getModel());
        this.setProducer(car.getProducer());
        this.setWeight(car.getWeight());
        this.setEngineHP(car.getEngineHP());
        this.setEngineSize(car.getEngineSize());

    }
}
