enum CITY_ACTIONS {
    GET_CITIES = 'CITY/GET_CITIES',
    GET_CITIES_COMMIT = 'CITY/GET_CITIES_COMMIT',
    GET_CITIES_ROLLBACK = 'CITY/GET_CITIES_ROLLBACK',
    INVALIDATE_CITIES_STATE = 'REGION/INVALIDATE_REGION_STATE'
}

// Component Action Types

type InvalidateCitiesStateAction = {
    type: string;
};


// Union Action Type

type CitiesAction =
    | InvalidateCitiesStateAction;

// Exports

export {CITY_ACTIONS, CitiesAction, InvalidateCitiesStateAction};