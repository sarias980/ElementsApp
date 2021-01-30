import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { AppState } from '../store/state';
import City  from '../model/city/City';
import isEqual from 'lodash/isEqual';
import { getCites } from '../store/domains/city/actions/index'

export default function HomeScreen() {
  const dispatch = useDispatch();

  const cities = useSelector<AppState, City[]>(
      state => state.cities.city
  ) || [];

  console.log(cities);

  useEffect(() => {
    dispatch(getCites());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
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
});
