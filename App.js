

//See weatherAppss.txt file for Tasks to do in this application

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button } from 'react-native'
import fetch_func from './src/api/fetchApi';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search'
import ExploreScreen from './src/screens/Explore'
import { Context, Provider } from './src/context/WeatherContext'
import { vh, vw } from './src/units';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons2 from 'react-native-vector-icons/Ionicons';
import Icons3 from 'react-native-vector-icons/MaterialIcons';
// import { Context } from './src/context/WeatherContext'


const Stack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => {
  useEffect(() => {
    // console.log('out of blur func',) //props.route
    const unsubscribe = props.navigation.addListener('blur', () => {
      // console.log('useEffect worked****************************',)//props.navigation
      const routeName = getFocusedRouteNameFromRoute(props.route)
      // console.log('routeName', routeName)
      if (routeName == 'Explore') {
        props.navigation.popToTop()
      }

      /* this was working but with a warning
      if (props.route) {
        console.log('inside if props.route: ', props.route)
        // if (props.route.state?.index > 0) {
        //   console.log('inside if props.route: ', props.route)
        //   props.navigation.popToTop()
        // }
      }
      */
      // if (props.route.state) {
      //   if (props?.route?.state?.index > 0) {
      //     props.navigation.popToTop()
      //   }
      // }
    })
    return unsubscribe;
  }, [props.route])

  return (
    <HomeStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false, }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Explore" component={ExploreScreen} //options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  )
}
// handleTabPress = ({ navigation, defaultHandler }) => {
//   navigation.popToTop();
//   defaultHandler();
// };

const TabsScreen = () => (
  <Tabs.Navigator tabBarOptions={
    {
      showLabel: false,
      labelStyle: { height: 0 }, //this is also a way to hide label
      style: { position: 'absolute', bottom: 0, marginHorizontal: 5 * vw, borderRadius: 23, height: 10 * vh, flexDirection: 'row', elevation: 0, borderTopWidth: 0 }
    }} >
    <Tabs.Screen name="Home" component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        // tabPress
        // labelStyle: { height: 0 }, //doesn't work
        // showLabel: false, //Doesn't work too
        tabBarIcon: ({ color, size }) => (
          <Icons2 name="home-outline"
            color={color} size={size} />
        ),
      }}
    // listeners={(props) => ({
    //   tabPress: e => {
    //     console.log('faraz don', props);
    //     // if (props.route.state) {
    //     if (props?.route?.state?.index > 0) {
    //       console.log('condition chal rahi hai ya  nahi??')
    //       useEffect(() => {
    //         console.log('useEffect worked****************************')
    //         const unsubscribe = props.navigation.addListener('blur', () => {
    //           props.navigation.popToTop()
    //         })
    //         return unsubscribe;
    //       }, [props.navigation])
    //     }

    //     // }
    //     // e.defaultHandler()
    //   },
    // })}

    />
    <Tabs.Screen name="Search" component={SearchScreen}
      options={{
        tabBarLabel: 'Home',
        // labelStyle: { height: 0 }, //doesn't work
        // showLabel: false, //Doesn't work too
        tabBarIcon: ({ color, size }) => (
          <Icons2 name="search-outline"
            color={color} size={size} />
        ),
      }}
    />
    <Tabs.Screen name="Detail" component={ExploreScreen}
      options={{
        tabBarLabel: 'Home',
        // labelStyle: { height: 0 }, //doesn't work
        // showLabel: false, //Doesn't work too
        tabBarIcon: ({ color, size }) => (
          <Icons3 name="explore" color={color} size={size} />
        ),
      }}
    />
  </Tabs.Navigator>
)

const App = () => {
  stateObject = {
    city: "",
    data: [],
  }

  const { addCity } = useContext(Context)
  const [state, setState] = useState(stateObject)
  // console.log('App.js local state: ', state)

  const fetch_weather = () => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=d0dd608d3d2d69896fef8b6400266608")
      .then(async (response) => {
        // console.log('response.json: ', await response); 
        return response.json()
      })
      .then(json => {
        setState({
          city: json.name
        })
      })
      .catch(err => {
        console.log('error', err)
      })
  }

  useEffect(() => {
    // fetch_weather()
    // appStart()

  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Tabs" component={TabsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View>
    //   <Text>new app</Text>
    // </View>
  )
}
{/* <View>
      <Text>new app</Text>
    </View> */}
export default () => {
  return <Provider>
    <App />
  </Provider>
}
