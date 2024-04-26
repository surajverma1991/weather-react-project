import React, { useEffect, useState } from "react";
import "../Weather/style.css";
import WeatherCard from "./WeatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("new panvel");
  const [tempInfo, setTempInfo] = useState({});

  const getWetherInfo = async () => {
    try {
      if (!searchValue) return;

      const url = `/.netlify/functions/weather?keyword=${searchValue}`;

      const res = await fetch(url , {
        method: "GET",
        headers: { accept: "application/json" }
      });

      if (!res.ok) {
        // Handle specific HTTP error statuses
        if (res.status === 401) {
          throw new Error("API unauthorized - Invalid API key");
        } else if (res.status === 403) {
          throw new Error("API forbidden - Check API key permissions");
        } else {
          throw new Error(`API error - HTTP Status: ${res.status}`);
        }
      }

      const data = await res.json();

      console.log(data);

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
