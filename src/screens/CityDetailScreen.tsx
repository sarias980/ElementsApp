import * as React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../../types";
import City from "../model/city/City";
import {View, Body, Card, CardItem, Text, Left, Thumbnail} from "native-base";
import moment from 'moment-timezone';

const orderData = (city: City) => {
    city.data.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
    return city;
};

const displayDate = (timestamp: string, isDate: boolean) => {
    if (isDate) {
        const zonedDate = moment.tz(timestamp, 'Europe/Brussels').format('DD/MM/YYYY');
        return `${zonedDate}`;
    }

    const zonedDate = moment.tz(timestamp, 'Europe/Brussels').format('HH');
    return `${zonedDate}:00`;
};

const getColorTemperature = (number: number) => {
    if (number >= 3 && number <= 25) {
        return {backgroundColor: '#76bbb3'};
    }
    if (number > 30 || number < 2) {
        return {backgroundColor: '#ff1c4a'};
    }
    return {backgroundColor: '#EF7D00'};
};

const dataCard = (data: CityData) => {
    const colorTemperature = getColorTemperature(data.temp);

    return (
        <View style={styles.hxmWindForecast}>
            <View style={styles.hxmWindForecastWindspeed}>
                <Text style={styles.hxmWindForecastTimeTextHeader}>
                    {displayDate(data.date, true)}
                </Text>
                <Text style={styles.hxmWindForecastTimeText}>
                    {displayDate(data.date, false)}
                </Text>
            </View>
            <View style={[styles.hxmWindForecastWindspeed, colorTemperature]}>
                <Text
                    style={styles.hxmWindForecastWindspeedText}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {data.temp.toFixed(2)} °C
                </Text>
            </View>
        </View>
    );

}

export default function CityDetailScreen({route, navigation}: StackScreenProps<RootStackParamList, 'CityDetails'>) {

    const {city} = route.params;
    const cityOrder = orderData(city);
    //const cityOrder = city;

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: city.photoURL}}/>
                        <Body style={{alignItems: 'center'}}>
                            <Text style={styles.title}>{cityOrder.name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{uri: city.photoURL}} style={{height: 250, width: 310}}/>
                    </Body>
                </CardItem>
                <CardItem>
                    {cityOrder.data.length !== 0 ? (
                        <FlatList
                            horizontal
                            data={cityOrder.data}
                            renderItem={({item}) =>
                                dataCard(item)
                            }
                            keyExtractor={(forecast, index) => index.toString()}
                            style={{marginBottom: 10}}
                        />
                    ) : (
                        <Text>
                            //No data available
                        </Text>
                    )}
                </CardItem>
            </Card>
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
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    card: {
        flex: 1,
        marginTop: '10%',
        paddingLeft: 5,
        paddingRight: 5,
        height: '90%',
        width: '90%'
    },
    hxmWindForecast: {
        color: '#ffffff',
        width: 100,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginRight: 2,
        marginLeft: 5
    },
    hxmWindForecastWindspeedText: {
        color: '#ffffff',
        justifyContent: 'center',
        padding: 15,
        alignSelf: 'center',
        height: 50
    },
    hxmWindForecastTimeText: {
        justifyContent: 'center',
        padding: 15,
        alignSelf: 'center',
        color: '#ffffff'
    },
    hxmWindForecastTimeTextHeader: {
        fontSize: 12,
        justifyContent: 'center',
        paddingTop: 5,
        alignSelf: 'center',
        color: '#ffffff'
    },
    hxmWindForecastWindspeed: {
        width: '100%',
        backgroundColor: '#1D4477'
    }
});