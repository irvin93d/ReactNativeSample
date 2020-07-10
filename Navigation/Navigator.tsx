import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../Home/View'
import { ConnectedWeather } from '../Weather/Weather'

export const Stack = createStackNavigator<RootStackParamList>()

export type RootStackParamList = {
  Weather: undefined
  Home: undefined
}

const Navigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Weather" component={ConnectedWeather} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default Navigator
