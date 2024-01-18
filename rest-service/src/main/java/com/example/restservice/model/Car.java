package com.example.restservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
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
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carId;
    @Column
    private String producer;
    @Column
    private String model;
    @Column
    private Integer engineSize;
    @Column
    private Integer engineHP;
    @Column
    private Integer weight;
}
