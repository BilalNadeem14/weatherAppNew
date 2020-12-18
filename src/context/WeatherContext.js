import { findNodeHandle } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

save = async (s) => {
    await AsyncStorage.setItem('token', s);
}

retrieve = async (s) => {
    return await AsyncStorage.getItem('token', s);
}

deleteStorage = async () => {
    await AsyncStorage.removeItem('token');
}

const weatherReducer = (state, action) => {
    console.log('weatherReducer***************************************************')
    switch (action.type) {
        case 'append_state':
            // return [...state, { city: action.payload}]
            //console.log()
            var x = state.find((details) => details.city === action.payload)
            //console.log('Reducer: result(city found in state): ', x) //city = action.payload
            if (x) {
                console.log('searched again')
                const filteredState = state.filter((details) => details.city !== action.payload) //if the function returns true then it will be (added in the state) OR returned otherwise if the return of this func is false then it will not be (added to the state) OR returned(which will later on add to the state)
                console.log('city added to index zero, state: ', filteredState)

                //-----------------
                return [{ city: action.payload }, ...filteredState]
            }
            else {
                console.log('search is unique')
                console.log('length of state, state, payload:', state.length, state, action.payload)
                if (state.length < 5) {
                    //return [...state, { city: action.payload}]
                    // var temp = [{ city: action.payload }]
                    // temp = [...temp, ...state]

                    //--------------------------------
                    // await save(state)
                    // var token = retrieve('token')
                    // console.log('asyncStorage: ', token)
                    return [{ city: action.payload }, ...state]
                }
                else {
                    state[0].city = action.payload
                    return [...state]
                }
            }
            return state
        case 'initialize_state':
            console.log('reducer******** state initialized')
            console.log(action.payload.map((city) => { return { city } }))
            return action.payload.map((city) => { return { city } })
        default:
            return state
    }
}


// const fetchResult = () => {

// }

const fetch_weather = () => {
    return fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=d0dd608d3d2d69896fef8b6400266608")
        .then(async (response) => {
            // console.log('response.json: ', await response); 
            return response.json()
        })
        .then(json => {
            dispatch({ type: 'append_state', payload: json.name })
            // setState({
            //   city: json.name
            // })
        })
        .catch(err => {
            console.log('error', err)
        })
}
console.log('array declared inside weatherContext')
var arr = []
arr[0] = 'city'
const addCity = (dispatch) => {
    return async (city) => {
        //console.log('inside context: state:', state)
        console.log('addCity in Context: ', city)
        // await AsyncStorage.removeItem('token')
        var storage = await AsyncStorage.getItem('token')
        console.log('***************old storage', storage)
        //arr = [city, ...storage]
        arr = []
        arr.push(city)
        if (storage !== null) {
            console.log('inside if stmt weatherContext')
            // obj = {city: city, ...obj}
            // storage = JSON.parse(storage)
            storage = JSON.parse(storage)
            // arr.push(storage)
            arr = [...arr, ...storage]
            console.log('arr after pushing', arr)
        }
        if (arr.length > 5) {
            arr = arr.filter((item, index) => index <= 4)
            // for(let i=0; i<5; i++) {

            // }
            console.log('arr after filter:', arr)
        }

        await AsyncStorage.setItem('token', JSON.stringify(arr))
        console.log('****************updated storage', AsyncStorage.getItem('token'))
        // console.log('asyncStorage: ', await AsyncStorage.getItem('token'))
        dispatch({ type: 'append_state', payload: city })
    }
}
console.log('arr2 declared')
var arr2 = []
const appStart = (dispatch) => {
    return async () => {
        // await AsyncStorage.removeItem('token')
        var token = await AsyncStorage.getItem('token')
        token = JSON.parse(token)
        console.log('appStart inside weatherContext ran, token:', token)
        if (token !== null) {
            dispatch({ type: 'initialize_state', payload: token })
        }
    }
}

// await AsyncStorage.setItem('token', response.data.token);
export const { Context, Provider } = createDataContext(
    weatherReducer,
    { addCity, appStart },
    [{ city: 'Multan' }, { city: 'Hyderabad' }]
)