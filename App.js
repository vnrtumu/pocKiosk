import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import PdfScreen from './src/screens/PdfScreen';
import PrintScreen from './src/screens/PrintScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Pdf" component={PdfScreen} />
        <Stack.Screen name="Print" component={PrintScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
