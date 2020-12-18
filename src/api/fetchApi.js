var obj = {}
const fetch_func = async () => {
    return fetch("http://api.openweathermap.org/data/2.5/weather?q=London&appid=d0dd608d3d2d69896fef8b6400266608")
    //   .then((response) => {
    //     // console.log('response.json: ', await response); 
    //     return response.json()
    //   })
    //   .then(json => {
    //     // setState({
    //     //     city: json.name
    //     //   })
    //     obj = json
    //     return obj
    //   })
    //   .catch(err => {
    //     console.log('error', err)
    //   })
  }

export default fetch_func