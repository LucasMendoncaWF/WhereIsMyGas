import { api_url } from '../utils/constants';

export async function getAuth() {
  try {
    let response = await fetch(
      api_url + 'auth',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email: 'teste@gmail.com',
          senha: '123456',
        })
      }
    );
    let json = await response.json();
    await AsyncStorage.setItem('@token', `${json.tipo} ${json.token}`);
  } catch (error) {
    alert(error)
  }
}