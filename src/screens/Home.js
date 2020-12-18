import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-elements'
import WeatherDetails from '../components/WeatherDetails'
import { vh } from '../units';
import Spacer from '../components/Spacer'
import { Context } from '../context/WeatherContext'

var propsForChild1 = [
    // {
    //     city: 'New York',
    //     temp: 23,
    //     timeOfCity: ''
    // },
    // {
    //     city: 'Karachi',
    //     temp: 30,
    //     timeOfCity: ''
    // },
    // {
    //     city: 'Lahore',
    //     temp: 30,
    //     timeOfCity: ''
    // }

]

const HomeScreen = ({ navigation }) => {
    const { state, appStart } = useContext(Context)
    const [propsForChild, setPropsForChild] = useState(propsForChild1)

    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[d.getMonth()]
    //console.log('HomeScreen: ', month, )
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[d.getDay()];
    // console.log('HomeScreen: ', d.getDate())

    var x = 0

    async function xyz() {
        if (x > (state.length - 1)) {
            return
        }
        // console.log('printing', x)

        let city = state[x].city
        // console.log('state.city', city)
        x++
        await fetch_weather(city)
        xyz()
    }


    // propsForChild = state
    var styleProp = true //2 fr second component

    var propsForChild2 = [

    ]
    // {
    //     city: 'default',
    //     temp: 1,
    //     timeOfCity: ''
    // },
    const fetch_weather = async (city) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0dd608d3d2d69896fef8b6400266608`)
            .then(async (response) => {
                // console.log('response.json: ', await response); 
                return response.json()
            })
            .then(json => {

                propsForChild2.push({
                    city: json.name,
                    temp: parseFloat((json.main.temp - 273)).toFixed(0),
                    timeOfCity: '',
                    icon: json.weather[0].icon,
                    windSpeed: json.wind.speed,
                    humidity: json.main.humidity,
                })
                setPropsForChild(propsForChild2)
                /*
                let obj = {
                    city: json.name,
                    temp: parseFloat((json.main.temp - 273)).toFixed(2),
                    timeOfCity: '',
                    icon: json.weather[0].icon,
                    windSpeed: json.wind.speed,
                    humidity: json.main.humidity,
                }
                setPropsForChild([obj,...propsForChild])
                */
                // console.log('fetch value: Home:', propsForChild)
            })
            .catch(err => {
                console.log('*****************error', err)
            })
    }

    useEffect(() => {
        appStart()
    }, [])

    useEffect(() => {
        xyz()
        // state.reverse().map((detail) =>{
        //     x = () => {

        //     }
        //     fetch_weather(detail.city)
        //     console.log('useEffect:', detail.city)
        // })
        // console.log('Home useEffect propsForChild: ', propsForChild)
    }, [state])

    //console.log('state on home*******************', state)
    // propsForChild = [
    //     {
    //         city: 'New York',
    //         temp: 23,
    //         timeOfCity: ''
    //     },
    //     {
    //         city: 'Karachi',
    //         temp: 30,
    //         timeOfCity: ''
    //     },
    //     {
    //         city: 'Lahore',
    //         temp: 30,
    //         timeOfCity: ''
    //     }

    // ]

    const displayComponent = (record) => {
        return <WeatherDetails
            propsForChild={record.item}
            styleProp={styleProp}
            navigation={navigation}
            x='true'
        />
    }
    return (
        <View style={
            {
                flex: 1,
                // marginLeft: 10, 
                backgroundColor: 'white'
            }}>
            <View style={
                {
                    flex: 1,
                    marginLeft: 20,
                    backgroundColor: 'white'
                }}>
                <Text h3 style={{ marginTop: 3 * vh }}>Good{'\n'}Morning</Text>
                <Text style={{ color: 'gray', lineHeight: 2 * vh, fontWeight: 'normal', marginTop: 1 * vh, marginBottom: 2 * vh }}>{d.getDate()} {month}, {day}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {propsForChild.length > 0 && <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{ height: 30 * vh, flexDirection: 'row' }}
                        data={propsForChild}
                        renderItem={displayComponent}
                        keyExtractor={(record) => record.city}
                    />}
                </View>

                {/* <WeatherDetails
                  propsForChild={propsForChild[0]}
                  styleProp={styleProp}
                /> */}
                <Spacer />
                <Text h4>Your Favorite</Text>
                <Spacer />
                <View style={styles.favoriteStyle} >
                    {propsForChild.length > 0 && <WeatherDetails
                        propsForChild={propsForChild[0]}   //send favoriteState as props
                        styleProp={false}
                        navigation={navigation}
                        x='false'
                    />}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    favoriteStyle: {
        // borderColor: 'black',
        // borderWidth: 10, 
        alignItems: 'flex-start'
    }
});

export default HomeScreen;