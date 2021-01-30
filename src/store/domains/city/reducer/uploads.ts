import deepClone from 'lodash/cloneDeep';
import {CityState} from "../state/types";
import initialCityState from "../state";
import {CITY_ACTIONS, CitiesAction} from "../actions/type";
import {PERSIST_REHYDRATE} from '@redux-offline/redux-offline/lib/constants';


function convertTemp(temp: number, tempType: string) {
    switch (tempType) {
        case 'C':
            return temp;
        case 'K':
            return (temp - 273.15);
        case 'F':
            return ((temp - 32) * 5 / 9);
        default:
            break;

    }
}

function dataFormat(obj: any) {
    const tempValue = convertTemp(obj.temp, obj.tempType);
    return {
        date: obj.date,
        temp: tempValue
    }
}

function addNewCity(id: number, obj: any) {

    const dataValue = dataFormat(obj);

    return {
        id: id,
        name: obj.city.name,
        photoURL: obj.city.picture,
        data: [dataValue]
    }
}

function manageData(payload: any) {

    const cities: any[] = [];

    payload.filter(obj => {
        if (cities.length === 0) {
            cities.push(addNewCity(cities.length, obj));
        } else {
            let exist = false;

            cities.filter(city => {
                if (city.name === obj.city.name) {
                    city.data.push(dataFormat(obj));
                    exist = true;
                }
            });

            if (!exist) {
                cities.push(addNewCity(cities.length, obj));
            }
        }
    });
    return cities;
}

const cityReducer = (state: CityState = initialCityState,
                     action: CitiesAction) => {
    const newState: CityState = deepClone(state);

    switch (action.type) {
        case CITY_ACTIONS.GET_CITIES_COMMIT:
            //newState.city = (action as any).payload;
            newState.city = manageData((action as any).payload);
            return newState;
        case CITY_ACTIONS.GET_CITIES_ROLLBACK:
            return deepClone(initialCityState);
        case PERSIST_REHYDRATE: {
            const {payload} = action as any;
            if (payload) {
                return {
                    ...newState,
                    cities: payload
                };
            }
            return newState;
        }
        case CITY_ACTIONS.INVALIDATE_CITIES_STATE:
            return deepClone(initialCityState);
        default:
            break;
    }

    return newState;
};

export default cityReducer;