import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';


const Weather = () => {

  const inputRef = useRef(); // this function search input property in the search bar

  // this functon will store the data coming from the API
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n":cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }

    // this function make a API request by city name
    const search = async(city) =>{
      if(city === ""){
        alert("Enter City Name")
        return;
      }
      try{
        // create an URL to make the API call 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=3f6777ae391e04939890c1fb0ef0f8a7`;
      
        //Fetch API to get the data from the URL
        const response = await fetch(url);
        const data = await response.json(); // convert the response to json

       if(!response.ok){
        alert(data.message); // error message if you get the worng API address
        return;
       }

        console.log(data); // will print the data in the console.
        
        const icon = allIcons[data.weather[0].icon] || clear_icon;
      
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,

        });
      } catch(error){
        setWeatherData(false)
        console.error("Error fetching weather data");
  
      }
    };
  
    // use effect call the search function when the contain get loaded 
    useEffect(() =>{
      search("Drexel Hill");
    },[]); 



  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/> 
            <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}/>
         </div>  {/*whatever city name is type it will be pass into the search function and will update the API data that is store in weatherData  */}
      
         {weatherData? <>  <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'> {weatherData.temperature}°F</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-date"> 
          <div className="col">
            <img src={humidity_icon} alt=""/>
            <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src={wind_icon} alt=""/>
            <div>
            <p>{weatherData.windSpeed}mph</p>
            <span>Wind Speed</span>
            </div>
          </div>

        </div>  
        </> : <></>}

       
        </div>

        
      
        
  )
}

export default Weather;