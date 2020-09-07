import { api_url } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

export async function getVehicles() {
  const token = await AsyncStorage.getItem('@token');
  try {
    let response = await fetch(
      api_url + 'veiculo',
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

export async function getVehicleById(id) {
  const token = await AsyncStorage.getItem('@token');
  try {
    let response = await fetch(
      api_url + 'veiculo/' + id,
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