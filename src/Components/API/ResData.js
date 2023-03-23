import axios from 'axios'
import configData from '../../config/Config.json'

const resApi = axios.create({
    baseURL: configData.api.resApi,
    timeout: 5000,
    headers: {
      'Accept-Version': 1,
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

export default resApi;