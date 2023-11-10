import React,{ useReducer, useContext } from "react";
import { defaultState, reducer } from "../pages/utils/data";
const weatherContext = React.createContext();

export const WeatherContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultState);

    return <weatherContext.Provider
            value={{
                dispatch,
                searchHistory: state.searchHistory,
                cityWeather: state.cityWeather,
                isModalOpen: state.isModalOpen,
                savedLocations: state.savedLocations,
            }}
        >
            {children}
        </weatherContext.Provider>
    
};

export const useWeatherContext = () => {
    return useContext(weatherContext)
}