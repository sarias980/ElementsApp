import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    View
} from 'native-base';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

const CityListCard = prop => {
    const city = prop.city;

    return (
        <View style={styles.container}>
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: city.photoURL}}/>
                        <Body>
                            <Text style={styles.title}>{city.name}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        </View>
    );
}

export default CityListCard;
