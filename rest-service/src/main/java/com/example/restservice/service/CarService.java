package com.example.restservice.service;

import com.example.restservice.dto.CarDto;
import com.example.restservice.kafka.NotificationMessage;
import com.example.restservice.kafka.NotificationProducer;
import com.example.restservice.model.Car;
import com.example.restservice.repo.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CarService {
    @Autowired
    CarRepository carRepository;

    @Autowired
    NotificationProducer notificationProducer;
    public List<Car> getAllCars() {
        List<Car> cars = new ArrayList();
        carRepository.findAll().forEach(car -> cars.add(car));
        return cars;
    }

    public Optional<Car> getCarById(Integer carId) {
        return carRepository.findById(carId);
    }

    private Car dtoToCar(CarDto carDto){
        return new Car(carDto.getProducer(), carDto.getModel(), carDto.getEngineSize(), carDto.getEngineHP(), carDto.getWeight());
    }

    public Car addCar(CarDto carDto) {

        Car car = carRepository.save(dtoToCar(carDto));
        notificationProducer.send(new NotificationMessage("new car", car));
        return car;
    }

    public void deleteCar(Integer carId) {
        var car = carRepository.findById(carId);
        if(car.isPresent()){
            carRepository.deleteById(carId);
            notificationProducer.send(new NotificationMessage("deleted car", car.get()));
        }
    }

    public Car updateCar(Integer carId, CarDto carDto) {
        Car car = dtoToCar(carDto);
        car.setCarId(carId);
        Car updatedCar = carRepository.save(car);
        notificationProducer.send(new NotificationMessage("updated car", updatedCar));
        return car;
    }
}
