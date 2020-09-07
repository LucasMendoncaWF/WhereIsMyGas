import { api_url } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

export async function getGasStations() {
  const token = await AsyncStorage.getItem('@token');
  try {
    let response = await fetch(
      api_url + 'posto',
      {
        method: 'GET',
        headers: {
          Authorization: token
        }
      }
    );
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getGasStationById(id) {
  const token = await AsyncStorage.getItem('@token');
  try {
    let response = await fetch(
      api_url + 'posto/' + id,
      {
        method: 'GET',
        headers: {
          Authorization: token
        }
      }
    );
    return response.json();
  } catch (error) {
    return error;
  }
}