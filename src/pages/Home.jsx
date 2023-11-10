import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useWeatherContext } from "../context/WeatherContext";
import bgCloudy from '../assets/images/cloudy.jpg'
import clearSky from '../assets/images/clear-sky.jpg'
import rainy from '../assets/images/rainy.jpg'
import snowy from '../assets/images/snowy.jpg'
import {
  BsFillCloudRainFill,
  BsFillCloudsFill,
  BsSnow,
  BsSunFill,
} from "react-icons/bs";
import { MdClose } from 'react-icons/md'

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchWeather, setSearchWeather] = useState("");
  const [weatherBG, setWeatherBG] = useState(bgCloudy);
  const [weatherIcon, setWeatherIcon] = useState(
    <BsFillCloudsFill className="inline-flex text-lg mb-1 lg:text-3xl" />
  );
  const { searchHistory, dispatch } = useWeatherContext();
  const navigate = useNavigate();
  const todaysDate = new Date();

  //Gets the weather overcast for the current location
  const getWeather = async (latitude, longitude) => {
    try {
      const url = `/weather?lat=${latitude}&lon=${longitude}&APPID=${import.meta.env.VITE_APP_API_KEY
        }&units=metric`;
      const response = await axios.get(url);

      if (response.status === 200) {
        setData(response.data);
        setBackground(response.data.weather[0].main);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setBackground = (data) => {
    switch (data) {
      case "Clouds":
        setWeatherBG(bgCloudy);
        setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
        break;
      case "Clear":
        setWeatherBG(clearSky);
        setWeatherIcon(<BsSunFill className="weather-icon" />);
        break;
      case "Rain":
        setWeatherBG(rainy);
        setWeatherIcon(<BsFillCloudRainFill className="weather-icon" />);
        break;
      case "Snow":
        setWeatherBG(snowy);
        setWeatherIcon(<BsSnow className="weather-icon" />);
        break;
      default:
        setWeatherBG(bgCloudy);
        setWeatherIcon(<BsFillCloudsFill className="weather-icon" />);
        break;
    }
  };

  const fetchWeatherData = async (location) => {
    try {
      const url = `/weather?q=${location}&APPID=${import.meta.env.VITE_APP_API_KEY
        }&units=metric`;
      const response = await axios.get(url);

      if (response.status === 200) {
        navigateToCity(response.data);
        dispatch({
          type: "SEARCH_CITY_WEATHER",
          payload: response.data,
        });
        navigate("/search-result");
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        alert("Please check your internet connection");
      } else if (error.code === "ERR_BAD_REQUEST") {
        alert("Invalid City name, please enter a valid city name");
      }
    }
  };

  const searchCityWeather = () => {
    if (searchWeather.trim()) {
      fetchWeatherData(searchWeather);
      setSearchWeather("");
    } else {
      alert("Enter the name of a valid city");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    searchCityWeather()
  }

  const navigateToCity = (city) => {
    dispatch({
      type: "SEARCH_CITY_WEATHER",
      payload: city,
    });
    navigate("/search-result");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeather(latitude, longitude)
    });
  }, []);

  return (
    <div className='lg:flex min-h-screen'
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.61)), url(${weatherBG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <div className='lg:w-[65vw] text-white'>
        <div className='lg:flex flex-col justify-between font-bold lg:h-screen md:py-[60px] md:px-[100px] p-[20px]'>
          <div>
            <h1>Weather-wiz</h1>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className='flex sm:flex-row flex-col text-center sm:text-left items-center gap-4 font-bold'>
              <div
                className='text-[70px] font-bold'>
                {data.main.temp}°C
              </div>
              <div>
                <p
                  className='text-2xl'>
                  {data.name}
                </p>
                <p className="font-semibold text-lg">
                  {`${todaysDate.toLocaleTimeString()} - ${todaysDate.toDateString()}`}
                </p>
              </div>
              <div>
                <div className="text-3xl">{weatherIcon}</div>
                <p
                  className='text-2xl'>
                  {data.weather[0].main}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px #1f26875e',
      }}
        className='lg:w-[35vw] py-[60px] px-5'>
        <div>
          <div className='bg-white py-2 px-2 rounded-md'>
            <div className="search-box">
              <form onSubmit={handleSubmit}>
                <div className="input-stretch flex justify-between">
                  <input
                    type="text"
                    placeholder="Search for a city"
                    value={searchWeather}
                    className='w-full outline-none'
                    onChange={(e) => setSearchWeather(e.target.value)}
                  />
                  <button type="submit" onClick={searchCityWeather} className='bg-blue-500 text-white px-2 py-2 rounded-md'>Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {!isLoading &&
          <div>
            <div className='py-3 text-white text-base font-semibold'>
              <div className='h-[100px] overflow-y-auto'>
                {searchHistory < 1 ? <p>No Searches Yet !!!</p> :
                  searchHistory.map((history) => (
                    <div className='flex justify-between items-center mb-2' key={history.name}>
                      <button onClick={() => navigateToCity(history)}>{history.name}</button>
                      <div className='bg-gray-200 p-2 rounded text-center items-center'>
                        <MdClose
                          onClick={() =>
                            dispatch({
                              type: "DELETE_SEARCH",
                              payload: history,
                            })}
                          className='text-red-500 font-bold'
                          role='button' />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            <hr className='h-[2px] bg-white' />

            <div className='text-white text-xl font-bold py-4'>
              <h1>Current Location Weather Detail</h1>


              {isLoading && <p>Loading...</p>}
              {data ? (
                <div>
                  <div className='py-5'>
                    <div className='flex justify-between py-2'>
                      <span>Humidity </span>
                      <span>{data.main.humidity}%</span>
                    </div>

                    <div className='flex justify-between py-2'>
                      <span>Temperature </span>
                      <span>{data.main.temp}°C</span>
                    </div>

                    <div className='flex justify-between py-2'>
                      <span>Wind Speed </span>
                      <span>{data.wind.speed} m/s</span>
                    </div>
                  </div>

                  <div className='py-4'>
                    <Link to={'/saved-locations/'} className='bg-white font-[490] text-[15px] text-blue-400 border-2 border-blue-400 p-2 rounded-md'>View Saved Locations</Link>
                  </div>
                </div>
              ) : (
                <h2>Failed to fetch weather of current location. Check your internet connectivity or enable your location</h2>
              )}

            </div>
          </div>
        }
      </div>

    </div >

  )
}
export default Home