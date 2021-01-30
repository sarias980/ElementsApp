import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import Logger from 'js-logger';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './src/navigation';
import {RESET_STATE} from "@redux-offline/redux-offline/lib/constants";
import {Root, StyleProvider} from 'native-base';
import configureStore from './src/store';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


const logger = Logger.get('APP');

export default function App() {
    const colorScheme = useColorScheme();
    const [store, setStore] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                await Font.loadAsync({
                    Roboto: require('native-base/Fonts/Roboto.ttf'),
                    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                    ...Ionicons.font,
                });

                // initialize store
                const configuredStore = await configureStore();
                // @ts-ignore
                setStore(configuredStore);
                logger.debug('Initialized store');

                configuredStore.dispatch({type: RESET_STATE});
            } catch (error) {
                logger.error('Initialize app error', error);
            }
        })();
    }, []);


    return !store ? (
        <Root>
            <StatusBar/>
            <SafeAreaProvider>

            </SafeAreaProvider>
        </Root>
    ) : (
        <Root>
            <StatusBar/>
            <SafeAreaProvider>
                <Provider store={store}>
                    <Navigation colorScheme={colorScheme}/>
                </Provider>
            </SafeAreaProvider>
        </Root>
    );
}
