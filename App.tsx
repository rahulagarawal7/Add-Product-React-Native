import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {SafeAreaView} from 'react-native-safe-area-context';
import Login from './src/screens/login';
import Home from './src/screens/home';
import AddProduct from './src/screens/addProduct';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{title: 'Add Product'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
