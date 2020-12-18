import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Context } from '../context/WeatherContext'
import WeatherDetails from '../components/WeatherDetails'
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import { vw, vh } from '../units';
import Icon from 'react-native-vector-icons/MaterialIcons';

var propsForChild = []
var styleProp = false
const SearchScreen = ({ navigation }) => {
  const [city, setCity] = useState('')
  const { addCity, state } = useContext(Context)
  // console.log('Search Screen, state:', state)
  // console.log('city', city)



  const fetch_weather = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d0dd608d3d2d69896fef8b6400266608`)
      .then(async (response) => {
        // console.log('response.json: ', await response); 
        return response.json()
      })
      .then(json => {
        // console.log('json.name', json.name)
        // console.log('json.temp', json.main.temp)
        propsForChild[0] = ({
          city: json.name,
          temp: parseFloat((json.main.temp - 273)).toFixed(2),
          timeOfCity: '',
          icon: json.weather[0].icon,
          windSpeed: json.wind.speed,
          humidity: json.main.humidity,
        })
        // propsForChild = propsForChild2
        //console.log('SearchScreen fetch value:', propsForChild)
        //console.log('SearchScreen fetch value: json:', json)
        styleProp = true

        addCity(json.name, () => navigation.navigate('Detail', { id: 5 }))
        setCity('')
      })
      .catch(err => {
        console.log('**error', err)
      })
  }
  // console.log('Search Screen')

  // useEffect(() => {
  //     state.map((detail) =>{
  //         fetch_weather(detail.city)
  //         console.log('useEffect:', detail.city)
  //     })
  //     // console.log('Home useEffect propsForChild: ', propsForChild)
  // }, [state])







  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <LinearTextGradient
        style={{ fontWeight: "bold", alignSelf: 'center', fontSize: vw * 10, marginVertical: vh * 2 }}
        locations={[0, 1]}
        colors={["white", "black"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
        <Text>Search City</Text>
      </LinearTextGradient>
      <Input
        // label="City"
        leftIcon={
          <Icon
            name="location-on"
            size={24}
            color="black"
          />
        }
        placeholder='Type City Name Here..'
        value={city}
        onChangeText={setCity} //setEmail is same as => (newEmail) => setEmail(newEmail) 
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={{ marginHorizontal: 0 * vw, width: 93 * vw, alignSelf: 'center' }}//borderWidth: 1,marginBottom: -2 * vh
        inputContainerStyle={{ borderWidth: 3, borderColor: 'gray', marginTop: 1 * vh, borderRadius: vw * 5, }}
      />
      {/* <LinearGradient colors={['#66ABEF', '#5374E8']} style={styles.linearGradient}> */}
      <Button
        title="Search"
        onPress={() => {
          fetch_weather(city)
          // setCity('')
        }
        }
        buttonStyle={{ width: 90 * vw, height: vh * 6.5, alignSelf: 'center', borderRadius: 20, backgroundColor: 'black', }}
      // containerStyle={{ width: 10 * vw }}

      //addBlogPost(title, content, () => navigation.navigate('Index Screen'))
      //if search value doesn't give error, only then navigate to explore screen
      />
      {/* </LinearGradient> */}


      {/* <Text>printing city searched:{city}</Text> */}
      <View style={{ alignItems: 'center', marginTop: 5 * vh, marginLeft: 20 }}>
        {styleProp ? <WeatherDetails
          propsForChild={propsForChild[0]}
          styleProp={styleProp}
          navigation={navigation}
          screenName='Detail'
          x='false'
        /> : null}
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1
  }
});

export default SearchScreen;