import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';

// import Modal from 'react-native-modal'
import styles from './styles';
// import StarRating from 'react-native-star-rating';
// import {Fonts} from '../../../assets/Fonts';
// import GradientButton from '../../Buttons/GradientButton';
// import WhiteButton from '../../Buttons/WhiteButton';

import { FlatList, TextInput } from 'react-native-gesture-handler';
import { vh, vw } from '../../units';
import moment from 'moment'

var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var month = months[d.getMonth()]
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var day = days[d.getDay()];

export default class Loader extends React.PureComponent {
  constructor(props) {
    //console.log('props :', props)
    super(props);
    this.state = {
      visible: false,
      content: {}
    };
  }

  fetch_weather = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d0dd608d3d2d69896fef8b6400266608`)
      .then(async (response) => {
        // console.log('response.json: ', await response); 
        return response.json()
      })
      .then(json => {
        // console.log('json.name', json.name)
        // console.log('json.temp', json.main.temp)
        // console.log('json.name.humidity', json.main.humidity)
        // console.log('json.wind.speed', json.wind.speed)
        console.log('json: ', json.city.name, '\ndate: ', json.list[0].dt_txt, '\ntemp: ', json.list[0].main.temp, '\nicon: ', json.list[0].weather[0].icon)
        this.setState({
          content: json
        })
        //setPropsForChild(json)

        // setPropsForChild({
        //   city: json.name,
        //   temp: parseFloat((json.main.temp - 273)).toFixed(0),
        //   timeOfCity: '',
        //   icon: json.weather[0].icon,
        //   windSpeed: json.wind.speed,
        //   humidity: json.main.humidity,
        // })

      })
      .catch(err => {
        console.log('*****************error', err)
      })
  }

  componentDidMount() {
    //console.log('loading started')
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.fetch_weather(this.props.city)
    }

    // this.props.city
  }

  displayJSX = (listItem) => {
    // console.log('listItem', listItem)
    //moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss").format('dddd')
    // console.log('moment library: ', moment(listItem.item.dt_txt).format('dddd'))
    // console.log('icon', listItem.item.weather[0].icon)
    // console.log('json: ', json.city.name, '\ndate: ', json.list[0].dt_txt, '\ntemp: ', json.list[0].main.temp, '\nicon: ', json.list[0].weather[0].icon)
    // d.getDay() + index / 8 > 6 { dayIndex = 0 } //index/8 bec: after 8 indexes date changes and > 6 index starts from 0
    if (listItem.index % 7 === 0) {
      // console.log('listItem.index', listItem)
    }
    // var month = months[d.getMonth()]
    // console.log('month: ', moment(listItem.item.dt_txt).format('MMM'))
    const date = moment(listItem.item.dt_txt).format('Do')
    // console.log('date: ', date[0] + date[1])
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: vh * 5, alignItems: 'center', }}>
        {/* <View style={{ borderWidth: 1 }}> */}
        <Image
          // style={styles.imageStyle} //right: vw * 9, position: 'absolute', alignSelf: 'flex-end', top: vh * 0, right: vw * 5, right: '20%'
          style={{
            height: vh * 10,
            width: vw * 20,
            // marginTop: vh * 15,
            resizeMode: 'cover',
            //borderWidth: 1,
            // borderColor: 'black',
            // borderWidth: 0.1 * vw,
            borderColor: 'gray',
            borderRadius: 50,
            backgroundColor: '#EDF7FD'
          }}
          source={{ uri: "http://openweathermap.org/img/wn/" + listItem.item.weather[0].icon + "@2x.png" }} />
        {/* </View> */}
        {/* <Text>hello</Text> */}
        <View style={
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 0.5 * vw,
            borderColor: '#EFF2F7',
            borderRadius: 30,
            height: 10 * vh,
            width: 40 * vw,
            paddingHorizontal: 5 * vw
          }}>
          {/* <Text>temp: {listItem.item.main.temp}, date: {listItem.item.dt_txt}, day: {moment(listItem.item.dt_txt).format('dddd')}</Text> */}
          <Text style={{
            marginRight: vw * 2,
            color: '#000080',
            fontSize: 24,
            fontWeight: 'bold',
          }}
          >{parseFloat(listItem.item.main.temp).toFixed(0) - 273}°</Text>
          <View>
            <Text //{listItem.item.dt_txt}  //Day, Date AND Month
              style={{
                fontWeight: 'bold',
              }}
            >
              {moment(listItem.item.dt_txt).format('dddd')}
            </Text>
            <Text
              style={{
                color: 'gray'
              }}
            >{date[0] + date[1]} {moment(listItem.item.dt_txt).format('MMM')}</Text>
          </View>
        </View>
      </View>
    )
  }

  show = () => {
    this.setState((prev) => {
      return {
        ...prev,
        visible: true,
      };
    });
  };
  hide = () => {
    this.setState((prev) => {
      return {
        ...prev,
        visible: false,
      };
    });
    // this.props.navigation.popToTop();
    // this.props.navigation.navigate('Home')
  };
  handler = () => {
    this.hide();
    // this.props.buttonHandler()
  };
  reject = () => {
    this.hide();
    this.props.reject();
  };
  accept = () => {
    this.hide();
    this.props.done();
  };
  render() {
    return (
      <Modal
        key={'accepted'}
        onBackdropPress={this.hide}
        transparent={true}
        visible={this.state.visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent', //rgba(0,0,0,.5)
            justifyContent: 'flex-end',
            // marginHorizontal: 5 * vw,
            marginRight: 20 * vw,
          }}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={this.hide}
              style={{
                position: 'absolute', top: '8%',
                // right: '50%',
                alignSelf: 'center',
              }}>
              <View //closing blue line 
                style={{
                  backgroundColor: '#5374E8',
                  width: 10 * vw,
                  height: .6 * vh,
                  borderRadius: 20
                  // fontFamily: Fonts.poppinsMedium,
                }} />
            </TouchableOpacity>

            <View style={styles.contentMainrow}>
              <Text style={styles.nametext}>Future Weather{this.props.title}</Text>
              {/* <View
                                style={{
                                  backgroundColor: 'white',
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 3,
                                  },
                                  shadowOpacity: 0.27,
                                  shadowRadius: 4.65,

                                  elevation: 6,
                                  width: '100%',
                                  paddingHorizontal: vw * 5,
                                  paddingVertical: vh * 1.5,
                                  borderRadius: vw * 6,
                                  marginBottom: vh * 3,
                                }}>
                                <TextInput
                                  placeholder="Enter Group Name Here"
                                  placeholderTextColor="#999999"
                                  style={{
                                    fontSize: vw * 3.6,
                                    // fontFamily: Fonts.poppinsMedium,
                                    padding: 0,
                                  }}
                                />
                              </View> */}
              <View>
                {/* <Text>city: {this.props.city}</Text> */}
                <FlatList
                  data={this.state.content.list}
                  renderItem={this.displayJSX}
                  keyExtractor={(listItem) => listItem.dt_txt}
                  showsVerticalScrollIndicator={false}
                />
              </View>
              {/* <GradientButton
                height={vh * 7}
                text="Done"
                width={'100%'}
                onPress={this.accept}
              /> */}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
