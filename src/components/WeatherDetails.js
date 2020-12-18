import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements'
import { vh, vw } from '../units';
import moment from 'moment'

WeatherDetails = ({ propsForChild, styleProp, navigation, screenName, x }) => {
    // console.log('WeatherDetails: ', propsForChild, styleProp)
    // console.log('state weatherDetails:', state)
    //console.log('navigation', navigation)
    // true ? styles.size = styles.size1 : null
    var count = 0
    //styles.size = true ? styles.size1 : styles.size2
    useEffect(() => {
        // setInterval(() => ++count, 1000)
        // console.log('count', count)
    }, [])


    var navigateTo = 'Explore'
    if (screenName == 'Detail') {
        navigateTo = screenName
    }
    // else {

    // }
    styles.size = styleProp ? styles.size1 : styles.size2
    styles.icon = styleProp ? styles.icon1 : styles.icon2
    //navigation.navigate('exploreScreen')
    return <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo, { propsForChild, x })} //id: route.params.id 
    >
        <View style={{ ...styles.size }}>
            <Text> </Text>
            <Text h4 style={{ color: 'gray' }}>{propsForChild.city}</Text>
            <Text style={{ ...styles.tempStyle, fontSize: styleProp ? 42 : 65, marginLeft: styleProp ? 0 : 10 }}>{propsForChild.temp}°</Text>
            <Image
                style={styles.icon} //, alignSelf: 'flex-end', top: vh * 0, right: vw * 5, right: '20%'
                source={{ uri: "http://openweathermap.org/img/wn/" + propsForChild.icon + "@2x.png" }} />
            <View style={{ alignItems: 'center' }}>
                {styleProp ? (<View style={styles.timeStyle}>
                    <Text style={{ fontSize: 25 }}>{moment().format('h :  mm :  ss a')}</Text>
                    <Text style={{ right: 28, fontSize: 12, color: 'gray' }}> Hour        Min           Sec</Text>
                </View>) : null}
            </View>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    size: {
        height: 100
    },
    size1: {
        height: 28 * vh,
        width: 70 * vw,
        //borderWidth: 5,
        //borderColor: 'blue',
        borderRadius: 40,
        marginTop: 10,
        backgroundColor: '#EDF7FD',
        paddingHorizontal: 7 * vw,
        marginRight: 20,
        //marginBottom:40
    },
    size2: {
        height: 180,
        width: 85 * vw,
        // borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 7 * vw,
        paddingRight: 30,
        // borderColor: 'purple',
        backgroundColor: '#EDF7FD'
    },
    icon: {

    },
    icon1:
    {
        height: 100,
        width: 55,
        position: 'absolute',
        right: vw * 9
    },
    icon2: {
        height: 180,
        width: 100,
        position: 'absolute',
        right: vw * 12
    },
    timeStyle: {
        backgroundColor: 'white',
        height: vh * 8,
        width: vw * 57,
        alignItems: 'center',
        marginTop: 1 * vh,
        borderRadius: 20
    },
    tempStyle: {
        color: '#000080',
        //fontSize: 42,
        fontWeight: 'bold',
    }
});

export default WeatherDetails;