import deepClone from 'lodash/cloneDeep';
import {CityState} from "../state/types";
import initialCityState from "../state";
import {CITY_ACTIONS, CitiesAction} from "../actions/type";
import { PERSIST_REHYDRATE } from '@redux-offline/redux-offline/lib/constants';


const cityReducer = (state: CityState = initialCityState,
                     action: CitiesAction) => {
    const newState: CityState = deepClone(state);

    switch (action.type) {
        case CITY_ACTIONS.GET_CITIES_COMMIT:
            newState.city = (action as any).payload;
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