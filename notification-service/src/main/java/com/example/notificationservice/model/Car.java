package com.example.notificationservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Car {

    public Car(String producer, String model, Integer engineSize, Integer engineHP, Integer weight){
        this.producer = producer;
        this.model = model;
        this.engineSize = engineSize;
        this.engineHP = engineHP;
        this.weight = weight;
    }

    private Integer carId;

    private String producer;

    private String model;

    private Integer engineSize;

    private Integer engineHP;

    private Integer weight;
}
