package com.example.restservice.controller;

import com.example.restservice.dto.CarDto;
import com.example.restservice.model.Car;
import com.example.restservice.service.CarService;
import org.apache.http.HttpStatus;
import org.hibernate.tool.schema.internal.exec.GenerationTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/car")
public class CarsController {
    @Autowired
    CarService carService;

    @GetMapping("/")
    private List<Car> getAllCars(){
        return carService.getAllCars();
    }

    @GetMapping("/{carId}")
    private ResponseEntity<Car> getCarbyId(@PathVariable Integer carId){
        Optional<Car> car = carService.getCarById(carId);
        if(car.isEmpty())
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        else
            return new ResponseEntity<>(car.get(), HttpStatusCode.valueOf(200));
    }

    @PostMapping("/")
    private ResponseEntity<Car> addCar(@RequestBody CarDto carDto){
        return new ResponseEntity<>(carService.addCar(carDto), HttpStatusCode.valueOf(200));
    }

    @DeleteMapping("/{carId}")
    private ResponseEntity<String> deleteCar(@PathVariable Integer carId){
        carService.deleteCar(carId);
        return new ResponseEntity<>(HttpStatusCode.valueOf(200));
    }

    @PutMapping("/{carId}")
    private ResponseEntity<Car> updateCar(@PathVariable Integer carId, @RequestBody CarDto carDto){
        return new ResponseEntity<>(carService.updateCar(carId, carDto), HttpStatusCode.valueOf(200));
    }

    @GetMapping("/powerToWeight/{carId}")
    private ResponseEntity<Double> getPowertoRatiobyId(@PathVariable Integer carId) {
        Optional<Double> ratio = carService.getPowertoWeightRatio(carId);
        if (ratio.isEmpty())
            return new ResponseEntity<>(HttpStatusCode.valueOf(404));
        else
            return new ResponseEntity<>(ratio.get(), HttpStatusCode.valueOf(200));

    }
}
