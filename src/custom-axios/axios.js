import axios from "axios";

const instance = axios.create({
  //baseURL: 'http://localhost:9090/api',
  baseURL: 'https://emt-library.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default instance;
