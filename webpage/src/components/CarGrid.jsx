import { Box, SimpleGrid, VStack, Flex, Text, HStack, Divider, Button} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getAllCars, deleteCar } from '../services/carService'
import { MdDelete } from "react-icons/md";

const CarGrid = () => {

    const [cars, setCars] = useState([])

    useEffect( ()=> {
        getCars()
    }, [])

    const getCars = () =>{
        getAllCars().then( res => {
            if(res.status==200){
                res.data.sort((a, b)=>b.carId - a.carId)
                setCars(res.data)
                console.log(cars)
            }
        })
    }

    const onDeleteClick = (carId) => {
        deleteCar(carId).then(res => {
            if(res.status==200){
                console.log(res);
                getCars()
            }
        })
    }

  return (
    <SimpleGrid columns={3} spacing={10} px='5'>
        {
        cars.length>0?
        cars.map((item, index) =>(
            <Box key={index} bg="gray.400" minH='80px' borderRadius='md' p='5'>
                    <VStack  w='100%'>
                        <Flex justifyContent='center' alignItems='center'>
                            <Text fontSize='2xl' >{item.producer} {item.model}</Text>
                        </Flex>
                        <Divider></Divider>
                        <HStack w='100%' justifyContent='space-between'>
                            <Text fontSize='md'>Horse Power</Text>
                            <Text fontSize='md'>{item.engineHP}hp</Text>
                        </HStack>
                        <HStack w='100%' justifyContent='space-between'>
                            <Text fontSize='md'>Weight</Text>
                            <Text fontSize='md'>{item.weight}kg</Text>
                        </HStack>
                        <HStack w='100%' justifyContent='space-between'>
                            <Text fontSize='md'>Engine Size</Text>
                            <Text fontSize='md'>{item.engineSize}cm2</Text>
                        </HStack>
                        <HStack w='100%' justifyContent='end'>
                            <Button colorScheme='red' onClick={()=>onDeleteClick(item.carId)}>
                                <MdDelete />
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
                ))
                :
                <div>No cars</div>
            }
    </SimpleGrid>
  )
}

export default CarGrid