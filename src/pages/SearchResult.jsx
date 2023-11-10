import {
  BsFillCloudRainFill,
  BsFillCloudsFill,
  BsSnow,
  BsSunFill,
  BsArrowLeftCircleFill,
} from "react-icons/bs";
import bgCloudy from '../assets/images/cloudy.jpg'
import clearSky from '../assets/images/clear-sky.jpg'
import rainy from '../assets/images/rainy.jpg'
import snowy from '../assets/images/snowy.jpg'
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import { useWeatherContext } from "../context/WeatherContext";

const SearchResult = () => {
  const { cityWeather, dispatch, isModalOpen } = useWeatherContext();
  let todaysDate = new Date();
  let weatherIcon;
  let weatherBG;

  //Sets the weather background image and icon
  switch (cityWeather.weather[0].main) {
    case "Clouds":
      weatherBG = bgCloudy;
      weatherIcon = <BsFillCloudsFill size={90} />;
      break;
    case "Clear":
      weatherBG = clearSky;
      weatherIcon = <BsSunFill />;
      break;
    case "Rain":
      weatherBG = rainy;
      weatherIcon = <BsFillCloudRainFill size={90} />;
      break;
    case "Snow":
      weatherBG = snowy;
      weatherIcon = <BsSnow size={90} />;
      break;
    default:
      weatherBG = bgCloudy;
      weatherIcon = <BsFillCloudsFill size={90} />;
      break;
  }

  const saveLocation = () => {
    dispatch({ type: "SAVE_LOCATION", payload: { ...cityWeather } });
  };

  return (
    <div className="min-h-screen text-white font-bold py-[10px] flex justify-center items-center"
      style={{
        backgroundImage: `linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.61)), url(${weatherBG})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
      {isModalOpen && <Modal />}
      <div
        className='sm:w-[80%] lg:w-[60%] w-[90%] rounded-xl py-[60px] px-[20px] search min-h-[400px]:'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px #1f26875e',
        }}>
        <div className="mb-6">
          <Link to={'/weather-app'}><BsArrowLeftCircleFill className='' size={50} role='button' /></Link>
        </div>

        <div>
          <p className='text-[40px]'>
            {`${cityWeather.name}, ${cityWeather.sys.country}`}
          </p>
          <p className='font-semibold tracking-wide'>
            {`${todaysDate.toLocaleTimeString()} - ${todaysDate.toDateString()}`}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={saveLocation}
            className="border-none bg-blue-600 px-4 text-white rounded-md font-semibold text-lg py-3"
          >
            Save Location
          </button>
        </div>

        <div className='sm:flex gap-5 py-6 justify-center'>
          <div className='sm:border-r px-2  flex justify-between gap-4 items-center'>
            {weatherIcon}
            <div>
              <p className='text-[36px] lg:text-[70px]'>
                {cityWeather.main.temp}
              </p>
              <p className='text-center font-semibold text-lg'>
                {cityWeather.weather[0].main}
              </p>
            </div>
          </div>

          <div className='py-2'>
            <div className='flex justify-between mb-14 font-semibold'>
              <div>
                <p className='text-xl font-bold'>{cityWeather.main.temp_max}</p>
                <p>High</p>
              </div>

              <div>
                <p className='text-xl font-bold'>{cityWeather.wind.speed}</p>
                <p>Wind</p>
              </div>

              <div>
                <p className='text-xl font-bold'>{cityWeather.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className='flex justify-between gap-5'>
              <div>
                <p>{cityWeather.main.temp_min}</p>
                <p>Low</p>
              </div>

              <div>
                <p>{cityWeather.main.pressure}in</p>
                <p>Pressure</p>
              </div>

              <div>
                <p>1%</p>
                <p>Precipitation</p>
              </div>
            </div>

          </div>
        </div>

        <div className='flex justify-center'>
          <Link to={'/saved-locations'} className='bg-white font-[490] text-[15px] text-blue-400 border-2 border-blue-400 p-2 rounded-md'>View Saved Locations</Link>
        </div>
      </div>
    </div>
  )
}

export default SearchResult