package com.example.restservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDto {

    private String producer;

    private String model;

    private Integer engineSize;

    private Integer engineHP;

    private Integer weight;
}
