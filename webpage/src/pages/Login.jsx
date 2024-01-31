import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { FiMail, FiLock } from 'react-icons/fi';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { logInUsernameAndPassword } from '../services/authService.jsx';
import RabbitMQConsumer from '../amq/RabbitMQConsumer.jsx';
import {testAuth} from '../services/carService.jsx';


const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();
      const toast = useToast();

      const textColor = useColorModeValue('gray.200', 'gray.300');
      const labelColor = useColorModeValue('gray.400', 'gray.500');
      const inputBorderFocusColor = useColorModeValue('blue.900', 'blue.700');

      const onSubmit = data => {
        logInUsernameAndPassword(data.username, data.password)
          .then(result => {
            testAuth()
            navigate('/home');
          })
          .catch(error => {
            if (error) {
              if (error.code) {
                toast({
                  title: error.code,
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: 'AnErrorOccurred',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              }
            }
          });    
      };

    return (
        
        <HStack w="100vw" h="100vh" spacing={0}>
        <RabbitMQConsumer></RabbitMQConsumer>
        <Box w="60%" h="100%" bg="blue.900">
          <Flex h="100%" justifyContent="center" alignItems="center">
            <VStack alignItems="start">
              <Heading fontSize="4xl" color={textColor}>
                Login Page
              </Heading>
            </VStack>
          </Flex>
        </Box>
        <Box w="40%" h="100%">
          <Flex h="100%" justifyContent="center" alignItems="center">
            <VStack alignItems="start" spacing={5} w="100%" padding={20}>
              <Heading fontSize="3xl" color={inputBorderFocusColor}>
                Log In
              </Heading>
              <FormControl isInvalid={errors.username}>
                <FormLabel color={labelColor}>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMail />
                  </InputLeftElement>
                  <Input
                    placeholder='Username'
                    focusBorderColor={inputBorderFocusColor}
                    {...register('username', { required: true})}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel color={labelColor}>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiLock />
                  </InputLeftElement>
                  <Input
                    placeholder='Password'
                    focusBorderColor={inputBorderFocusColor}
                    type="password"
                    {...register('password', { required: true })}
                  />
                </InputGroup>
              </FormControl>
                <Button
                  minW={'200px'}
                  alignSelf="center"
                  color="white"
                  bgColor={inputBorderFocusColor}
                  _hover={{ backgroundColor: 'var(--chakra-colors-blue-700)' }}
                  variant="solid"
                  onClick={handleSubmit(onSubmit)}
                  mt="5"
                >
                  Log In
                </Button>
            </VStack>
          </Flex>
        </Box>
      </HStack>
  
    );
}

export default Login