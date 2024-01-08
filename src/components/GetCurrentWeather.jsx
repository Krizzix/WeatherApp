import React from 'react';
import { useContext, useEffect, useState } from 'react';
import WeatherContext from './context/WeatherContext';
import classes from './css/GetCurrentWeather.module.css';

// import Thunderstorm from "./weather/Thunderstorm.svg";
export default function GetCurrentWeather() {
  const { weatherObj, getWeather, lon, isError } = useContext(WeatherContext);
  const [date, setDate] = useState();
  const [day, setDay] = useState();
  const { name, sys, timezone } = weatherObj;

  useEffect(() => {
    getWeather();
    // const d = new Date(new Date().getTime() - timezone * 1000);
    // const days = [
    //   "Chủ nhật",
    //   "Thứ hai",
    //   "Thứ 3",
    //   "Thứ 4",
    //   "Thứ 5",
    //   "Thứ 6",
    //   "Thứ 7",
    // ];
    // const dateConvert = `${
    //   days[d.getDay()]
    // },${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    // setDate(dateConvert);
    //
  }, [lon]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const d = new Date(new Date().getTime() - timezone * 1000);
    const days = [
      'Chủ nhật',
      'Thứ hai',
      'Thứ ba',
      'Thứ tư',
      'Thứ năm',
      'Thứ sáu',
      'Thứ bảy',
    ];
    setDay(days[d.getDay()]);
    const dateConvert = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    setDate(dateConvert);
  }, [timezone]);
  if (isError) {
    return <p>Không tìm thấy tên thành phố</p>;
  } else {
    return (
      <div className={classes['weather-container']}>
        {Object.keys(weatherObj).length !== 0 && (
          <>
            <div>
              <h3 className={classes.day}>{day}</h3>
              <h3 className={classes.date}>{date}</h3>
              <div className={classes['img-box']}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/${weatherObj.weather[0].main}.svg`}
                  className={classes['img-weather']}
                  alt='img-weather'
                />
              </div>
            </div>
            <div className={classes['weather-detail']}>
              <div className={classes.temperature}>
                {(weatherObj.main.temp - 273).toFixed(0)} &#8451;
              </div>
              <div className={classes['line-hor']}></div>
              <div className={classes['weather-des']}>
                <div className={classes['description']}>
                  {weatherObj.weather[0].description}
                </div>
                <div>{`${name},${sys.country}`}</div>
              </div>
            </div>

            {/* <li>{weatherObj.main.humidity}</li> */}
          </>
        )}
      </div>
    );
  }
}
