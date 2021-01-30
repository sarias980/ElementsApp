import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View} from '../components/Themed';
import {AppState} from '../store/state';
import City from '../model/city/City';
import {getCites} from '../store/domains/city/actions/index'
import {List, ListItem, Spinner} from "native-base";
import CityListCard from "../components/CityListCard/CityListCard";

export default function HomeScreen() {
    const dispatch = useDispatch();

    const cities = useSelector<AppState, City[]>(
        state => state.cities.city
    ) || [];

    console.log(cities.length);

    useEffect(() => {
        dispatch(getCites());
    }, [dispatch]);

    const renderItem = city => {
        return (
            <TouchableHighlight
                key={city.id}
                onPress={() => {
                }}>
                <CityListCard city={city}/>
            </TouchableHighlight>
        );
    }

    return (
        <View style={styles.container}>
            {cities.length !== 0 ? (
                <FlatList
                    data={cities}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.separator}
                />
            ) : (
                <Spinner style={{marginTop: '25%'}}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        height: '95%',
        width: '95%'
    },
});
