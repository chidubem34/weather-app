import { BsArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useWeatherContext } from "../context/WeatherContext";

import '../App.css'

const SavedLocations = () => {
    const { savedLocations } = useWeatherContext()
    return (
        <div className='saved'>
            <div className='mx-36 py-10'>
                <Link to={'/weather-app'}><BsArrowLeftCircleFill className='text-white' size={50} role='button' /></Link>
                <div className='w-[80%] mx-auto text-white flex justify-center items-center'>
                    <div className='flex flex-col gap-y-10 text-center'>
                        <p className='text-6xl'>Saved Locations</p>
                        <p>Find your saved locations here</p>

                        {savedLocations.length > 0 ? (
                            <ul className="text-left max-w-[500px] mx-auto">
                                {savedLocations.map((location) => (
                                    <li key={location.name}>
                                        <Link
                                            to={`/search-result`}
                                            className="font-semibold xl:text-xl "
                                        >
                                            {location.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-lg font-semibold">
                                You do not have a location saved yet. Your locations will show
                                up here when you have saved them.
                            </p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SavedLocations