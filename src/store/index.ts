import reducer from './domains/city/reducer';
import {createStore, Store, applyMiddleware} from 'redux';
import {createOffline, offline} from '@redux-offline/redux-offline';
import thunk from 'redux-thunk';
import offlineChain from 'redux-offline-chain';
import offlineDefaultConfig from "@redux-offline/redux-offline/lib/defaults";
import signalRActions from "./middleware/signalr";
import {composeWithDevTools} from "redux-devtools-extension";


const configureStore = async () => {
    return new Promise<Store>(res => {
        let store: Store;

        const offlineConfig = {
            persistCallback: () => res(store),
            ...offlineDefaultConfig
        };

        const {middleware, enhanceReducer, enhanceStore} = createOffline(
            offlineConfig
        );

        // Middlewares

        const middlewares = [middleware, thunk, signalRActions(), offlineChain];

        store = createStore(enhanceReducer(reducer), composeWithDevTools(enhanceStore as any, applyMiddleware(...middlewares)));
    });
};

export default configureStore;
