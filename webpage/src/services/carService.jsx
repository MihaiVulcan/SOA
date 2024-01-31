import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const testAuth = async () => {
    axios.get("/api/test",{
        headers:{
            'Authorization': 'Bearer ' + cookies.get("accessToken") 
        }
    })
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
}

const getAllCars = async () => {
    return axios.get("/api/car/",{
        headers:{
            'Authorization': 'Bearer ' + cookies.get("accessToken")

        }
    })
}

const deleteCar = async (carId) => {
    return axios.delete(`/api/car/${carId}`,{
        headers:{
            'Authorization': 'Bearer ' + cookies.get("accessToken") 
        }
    })
}

export {testAuth, getAllCars, deleteCar}