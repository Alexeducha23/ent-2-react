import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'
import WeatherCard from './components/WeatherCard';

function App() {


  const [coords, setCoords] = useState();
  const [weather, setWheather] = useState();
  const [temp, setTemp] = useState();


  const success = position => {
    console.log(position);
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    setCoords(obj);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
   }, [])

  useEffect(() => {
    if (coords) {
    const APIkey = 'ccfdc913d63244aa953a4d9f33bbe576';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`;
  axios.get(url)
    .then(res => {
      const obj = {
        celsius: (res.data.main.temp -273.15).toFixed(2),
        fahrenheit: ((res.data.main.temp -273.15) * (9/5) + 32).toFixed(2),

      }
      setTemp(obj);

      setWheather(res.data)
    })
    .catch(err => console.log(err))
    }
  }, [coords])
  

  return (
    < div className='app'>
    <WeatherCard
      weather={weather}
      temp={temp}
    />
    </div>
  )
}

export default App
