import { api_url } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

export async function getTravels() {
  const token = await AsyncStorage.getItem('@token');
  try {
    let response = await fetch(
      api_url + 'viagem',
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