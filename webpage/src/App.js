import './App.css';
import { Box, Grid } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routing from './routing/routing.jsx';

function App() {

  const router = createBrowserRouter(routing);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid>
        <RouterProvider router={router} />
      </Grid>
    </Box>
  );
}

export default App;
