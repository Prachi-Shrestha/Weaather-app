import { EnvironmentOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css'

function Weather() {
  const [city, setcity] = useState(null);
  const [search, setsearch] = useState('Kathmandu');
  
  const inputchange = (event) => {
      let firstchar = event.target.value.charAt(0);
      let newText= firstchar.toUpperCase(); 
      setsearch(newText+event.target.value.slice(1)); 
  }

  useEffect(() => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f257ecf07084ec132a0e1a5e1b48806f&units=metric`)
    .then(response => {
      setcity(response.data);
    })
    .catch(error => {
      setcity(null);
    })
  },[search]);
  

  return (
    <div className='bg'>
        <Card>
        <Input placeholder="Enter City" type="search" onChange={inputchange}/> 
        {
          city == null ? (
            <p style={{color: 'black'}}>No city found</p>
          )
          : (
          <div style={{paddingTop: '20px', color: 'black', textAlign: 'center'}}>
            <h2><EnvironmentOutlined /> {search}</h2>
            <h4>{city.weather[0].main}</h4>
            <h1>{city.main.temp} <sup>o</sup>C</h1>
            <h3>{city.main.temp_min} <sup>o</sup>C min - {city.main.temp_max} <sup>o</sup>C max</h3>
          </div>
          )
        }
        
        </Card>
    </div>
  )
}

export default Weather