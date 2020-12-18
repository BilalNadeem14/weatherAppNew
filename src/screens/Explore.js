import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Context } from '../context/WeatherContext'
import { vh, vw } from '../units';
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Loader from '../components/modal/index';
// import { TouchableOpacity } from 'react-native-gesture-handler';

//1 way to solve the problem:
//fetch() ko return sey pehle khud call kerwa dein aur async await laga dein taake code aagay naah jaye jab tak values fetch naah hojayein
//2nd solution: Do it through useEffect


//****** after pressing the compnent in search screen, empty it:
//      So that every time props passed from search screen are unique
const ExploreScreen = ({ navigation, route }) => {
    var d = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[d.getMonth()]
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var day = days[d.getDay()];

    const [propsForChild, setPropsForChild] = useState('')
    const [lastParamsCity, setLastParamsCity] = useState('')

    const { state } = useContext(Context)

    var modalRef = useRef();


    const fetch_weather = (city) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0dd608d3d2d69896fef8b6400266608`)
            .then(async (response) => {
                // console.log('response.json: ', await response); 
                return response.json()
            })
            .then(json => {
                // console.log('json.name', json.name)
                // console.log('json.temp', json.main.temp)
                // console.log('json.name.humidity', json.main.humidity)
                // console.log('json.wind.speed', json.wind.speed)

                setPropsForChild({
                    city: json.name,
                    temp: parseFloat((json.main.temp - 273)).toFixed(0),
                    timeOfCity: '',
                    icon: json.weather[0].icon,
                    windSpeed: json.wind.speed,
                    humidity: json.main.humidity,
                })

            })
            .catch(err => {
                console.log('*****************error', err)
            })
    }

    useEffect(() => {
        console.log('state Changed inside Explore screen', state)

        if (route.params) {
            console.log('print route.params.x:', route.params.x)
            if (route.params.x === 'true') {
                console.log('true********************')
                setPropsForChild(route.params.propsForChild)
            }
            else {  //route.params.x === 'false'
                setPropsForChild(state[0])
                fetch_weather(state[0].city)
            }
        }
        else {  //route.params ===undefined
            setPropsForChild(state[0])
            fetch_weather(state[0].city)
        }
        // console.log('route.params.city:', route.params)
        // if (route.params.city !== lastParamsCity) {
        //     setLastParamsCity(route.params.city)
        // }
    }, [state])

    return (
        <LinearGradient colors={['#66ABEF', '#5374E8']} style={styles.linearGradient}>
            <View style={styles.parentStyle}>
                <Loader
                    city={propsForChild.city}
                    ref={r => modalRef = r}
                />
                {/* <Text>ExploreScreen</Text> */}
                {propsForChild ? (
                    <View style={styles.contentStyle}>
                        {/* <Text>true</Text> */}
                        <Text style={{ fontSize: 40, color: 'white', marginTop: vh * 5, }}>{propsForChild.city}</Text>
                        {/* <LinearGradient colors={['#DCDEDD', 'red']} style={styles.tempLinearGradient}>
                            <Text style={styles.tempStyle}>{propsForChild.temp}°</Text>
                        </LinearGradient> */}
                        {/* <View>
                            <Text>Text to be obscured by gradient.....</Text>
                            <LinearGradient
                                colors={['transparent', 'blue']}
                                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                            />
                        </View> */}
                        <LinearTextGradient
                            style={{ fontWeight: "bold", fontSize: 92, marginTop: vh * 23, position: "absolute" }}
                            locations={[0, 1]}
                            colors={["white", "#8AB5EE"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}>
                            <Text>{propsForChild.temp}°</Text>
                        </LinearTextGradient>
                        <Image
                            style={styles.imageStyle} //right: vw * 9, position: 'absolute', alignSelf: 'flex-end', top: vh * 0, right: vw * 5, right: '20%'
                            source={{ uri: "http://openweathermap.org/img/wn/" + propsForChild.icon + "@2x.png" }} />
                        <View style={{
                            flexDirection: 'row', width: 78 * vw, justifyContent: 'space-between', marginTop: -vh * 7, //borderWidth: 1,
                            // borderColor: 'black'
                        }}// justifyContent: 'space-between',
                        >
                            <Text style={{ color: "white" }}>   wind{"\n"}{propsForChild.windSpeed}km/h</Text>
                            <Text style={{ color: "white" }}>Humidity{"\n"}     {propsForChild.humidity}%</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: vh * 5, alignItems: 'center', marginTop: 15 * vh }}>
                            <Icon name="weather-windy" size={30} color="white" style={{ marginRight: 20 }} />
                            <Icon name="weather-windy-variant" size={30} color="white" style={{ marginRight: 20 }} />

                            <TouchableOpacity
                                onPress={() => modalRef.show()}
                            >
                                <Text style={{ color: 'white' }}>{day} {d.getDate()}, {month}</Text>
                            </TouchableOpacity>
                            <Icon2 name="day-rain" size={30} color="white" style={{ marginLeft: 20 }} />
                            <Icon2 name="rains" size={27} color="white" style={{ marginLeft: 20 }} />
                        </View>
                        {/* <Text>hello ...............{state[0].city}</Text> */}

                    </View>
                )
                    : <Text>False</Text>}



            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    parentStyle: {
        // backgroundColor: '#5274DC',
        flex: 1
    },
    contentStyle: {
        alignItems: 'center'
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: 15,
        // paddingRight: 15,
        // borderRadius: 5
    },
    tempLinearGradient: {
        height: vh * 10,
        // borderWidth: 1,
        width: 30 * vw
    },
    tempStyle: {
        fontSize: 10 * vw,
        color: 'white',
        //borderColor: 'black',
        //position: 'absolute',
        //flexDirection: 'column',
        //top: 25 * vh,
        //alignSelf: 'center',
    },
    imageStyle: {
        height: vh * 35,
        width: vw * 45,
        marginTop: vh * 15,
        resizeMode: 'cover',
        //borderWidth: 1,
        // borderColor: 'black'
    }
});


export default ExploreScreen;