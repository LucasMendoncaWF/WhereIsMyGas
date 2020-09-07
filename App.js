import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from './components/profile';
import { Map } from './components/map';
import Pin from './assets/pin.svg'; 
import WhitePin from './assets/pin-white.svg'; 
import ProfileIcon from './assets/user.svg'; 
import WhiteProfileIcon from './assets/user-white.svg';
import { View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getAuth } from './services/auth';

const Tab = createBottomTabNavigator();

export class App extends React.Component {

  constructor(){
    super();
    this.checkAuth();
  };

  async checkAuth() {
    const token = await AsyncStorage.getItem('@token');
    if(!token) {
      getAuth();
    }
  }

  render() {
    return (
      <NavigationContainer>
        <View style={styles.container}>
          <Text style={styles.title}>Where Is My Gas?</Text>
        </View>
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let icon;
              let pageName = '';

              if (route.name === 'Mapa') {
                icon = focused
                  ? <WhitePin height={30} width={30}></WhitePin>
                  : <Pin height={30} width={30}></Pin>;
                pageName = 'Mapa';
              } else if (route.name === 'Perfil') {
                icon = focused 
                  ? <WhiteProfileIcon height={30} width={30}></WhiteProfileIcon> 
                  : <ProfileIcon height={30} width={30}></ProfileIcon>;
                pageName = "Perfil";
              }

              // You can return any component that you like here!
              return icon;
            },
          })}
          tabBarOptions={{
            inactiveBackgroundColor: '#35CA76',
            activeBackgroundColor: '#35CA76',
            showLabel: false
          }}
        >
          <Tab.Screen name="Mapa" component={Map} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      );
    };
  }

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#35CA76'
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  }
});

export default App;
