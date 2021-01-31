import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../store/state';
import City from '../model/city/City';
import {getCites} from '../store/domains/city/actions/index'
import {View, Spinner} from "native-base";
import CityListCard from "../components/CityListCard/CityListCard";
import {
    useNavigation
} from '@react-navigation/native';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../types";

const orderName = (cities : City[])=> {
    return cities.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
};

export default function HomeScreen( {navigation}: StackScreenProps<RootStackParamList, 'Root'>) {
    const dispatch = useDispatch();
    //const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);

    const cities = useSelector<AppState, City[]>(
        state => orderName(state.cities.city)
    ) || [];

    useEffect(() => {
        dispatch(getCites());
    }, [dispatch]);

    const renderItem = (city: City) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('CityDetails', {city: city})}>
                <CityListCard city={city}/>
            </TouchableOpacity>
        );
    }

    const reload = () =>  {
        dispatch(getCites());
    }

    return (
        <View style={styles.container}>
            {cities.length !== 0 ? (
                <FlatList
                    data={cities}
                    renderItem={({item}) => renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.separator}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={reload} />
                    }
                />
            ) : (
                <Spinner style={{marginTop: '15%'}}/>
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
