import {combineReducers} from 'redux';
import cityReducer from './uploads';

const uploadApp = combineReducers({
    cities: cityReducer,
});

export default uploadApp;