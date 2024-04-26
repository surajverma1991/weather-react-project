import React, { useEffect, useState } from "react";
import "../Weather/style.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("new panvel");
  const [tempInfo, setTempInfo] = useState({});

  const weatherApiKey = process.env.REACT_APP_API_KEY;

  const getWetherInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${weatherApiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('render')
    getWetherInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWetherInfo}
          >
            Search
          </button>
        </div>
        <WeatherCard tempInfo={tempInfo} />
      </div>
    </>
  );
};

export default Temp;
