package com.example.restservice.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class RestControllerTest {
    @GetMapping
    public String getTest(){
        return "Mere ma nebunule";
    }
}
