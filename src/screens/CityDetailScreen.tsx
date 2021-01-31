import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../types";
import City from "../model/city/City";

const orderData = (city : City)=> {
    city.data.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    return city;
};

export default function CityDetailScreen( { route, navigation }: StackScreenProps<RootStackParamList, 'CityDetails'>) {

    const { city } = route.params;
    const cityOrder = orderData(city);
    console.log(cityOrder);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{city.name}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});