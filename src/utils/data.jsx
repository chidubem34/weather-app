export let defaultState = {
    cityWeather: {},
    searchHistory: [],
    savedLocations: [],
    isModalOpen: false,
    modalMessage: "",
};

defaultState = JSON.parse(localStorage.getItem("defaultState"));
if (defaultState === null) {
    defaultState = {
        cityWeather: {},
        searchHistory: [],
        savedLocations: [],
        isModalOpen: false,
        modalMessage: "",
    };

    localStorage.setItem("defaultState", JSON.stringify(defaultState));
}

export const reducer = (state, action) => {
    let storedItems = JSON.parse(localStorage.getItem("defaultState"));

    switch (action.type) {
        case "SEARCH_CITY_WEATHER": {
            if (
                storedItems.searchHistory.some(
                    (item) => item.name === action.payload.name
                )
            ) {
                return {
                    ...state,
                    cityWeather: { ...action.payload },
                };
            } else {
                storedItems.searchHistory = [
                    ...storedItems.searchHistory,
                    action.payload,
                ];
                localStorage.setItem("defaultState", JSON.stringify(storedItems));

                return {
                    ...state,
                    cityWeather: action.payload,
                    searchHistory: [...storedItems.searchHistory],
                };
            }
        }

        case "SAVE_LOCATION": {
            if (
                storedItems.savedLocations.some(
                    (item) => item.name === action.payload.name
                )
            ) {
                return { ...state, isModalOpen: true };
            }
            storedItems = {
                ...storedItems,
                savedLocations: [...storedItems.savedLocations, action.payload],
            };
            localStorage.setItem("defaultState", JSON.stringify(storedItems));

            return {
                ...state,
                savedLocations: [...storedItems.savedLocations],
                isModalOpen: true,
            };
        }

        case "DELETE_SEARCH": {
            let newSearchHistory = storedItems.searchHistory.filter(
                (item) => item.name !== action.payload.name
            );
            storedItems.searchHistory = [...newSearchHistory];
            localStorage.setItem("defaultState", JSON.stringify(storedItems));

            return {
                ...state,
                searchHistory: [...storedItems.searchHistory],
            };
        }

        case "TOGGLE_MODAL":
            return {
                ...state,
                isModalOpen: false,
            };

        default:
            break;
    }
};