import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import { Text } from '@chakra-ui/react';

const routing = [
  {
    path: '/',
    element: (
        <Login />
    ),
  },
  {
    path: '/home',
    element: (
        <Home />
    ),
  },
  {
    path: '/not-allowed',
    element: (
        <Text fontSize="4xl">You are not allowed here :D</Text>
    ),
  },
  {
    path: '*',
    element: (
        <Text>Not found</Text>
    ),
  },
];
export default routing;
