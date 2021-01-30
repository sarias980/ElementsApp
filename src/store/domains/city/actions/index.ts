import {Dispatch} from 'redux';
import {CITY_ACTIONS, CitiesAction, InvalidateCitiesStateAction} from "./type";
import {AppState} from "../../../state";
import {createOfflineAction} from "../../../helper/offline";

const getCites = () => {
    return (dispatch: Dispatch<CitiesAction>, getState: () => AppState) => {
        dispatch(
            createOfflineAction(getState, CITY_ACTIONS.GET_CITIES, null, {
                effect: {
                    url: `https://us-central1-mobile-assignment-server.cloudfunctions.net/weather`,
                    method: 'GET'
                },
                commit: {
                    type: CITY_ACTIONS.GET_CITIES_COMMIT,
                },
                rollback: {
                    type: CITY_ACTIONS.GET_CITIES_ROLLBACK
                }
            })
        )
    }
};

const invalidateCitiesState = (): InvalidateCitiesStateAction => {
    return {type: CITY_ACTIONS.INVALIDATE_CITIES_STATE};
};