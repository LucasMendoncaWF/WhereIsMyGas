import { StyleSheet, View, Picker, TouchableOpacity, Text, Image } from 'react-native';
import * as React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getVehicles } from '../services/cars';
import { getGasStations } from '../services/gasStation';

export class Map extends React.Component  {

  origin = {latitude: 37.3318456, longitude: -122.0296002};
  destination = {latitude: 37.771707, longitude: -122.4053769};
  GOOGLE_MAPS_APIKEY = 'AIzaSyBIeGBcja68PZcp7BHseh6NYoCVrt-o7wI';

  constructor() {
    super();
    const latlng = {
      latitude: -23.6412806 + 0.000010, 
      longitude:-46.7635683 + 0.000010
    }
    this.state = {
      lat: -23.6412806,
      lon: -46.7635683,
      distance: '',
      vehicle: '',
      fuel: '',
      vehiclesOptions: [],
      gasStations: [
        <Marker coordinate={latlng} key={0}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>Posto 1</Text>
              <Text style={styles.popupValue}>Valor: R$XX,XX</Text>
            </View>
            <Image
              source={require('../assets/marker.png')}
              style={{width: 46, height: 48}}
              resizeMode="contain"
            />
          </Marker>,
      ],
      marker: {
        latlng: {
          latitude: -23.6412806 + 0.000010, 
          longitude:-46.7635683 + 0.000010
        }
      }
    }
    this.getLocation();
    this.getVehicles();
    this.getGasStations();
  };

  async getVehicles() {
    const vehicles = (await getVehicles()).content;
    this.setState({  
      vehiclesOptions: vehicles.map( (s) => {
        const name = `${s.marcaVeiculo} ${s.modeloVeiculo}`;
        return <Picker.Item key={s.idVeiculo} value={name} label={name} />
      })
    });
  }

  async getGasStations() {
    const stations = (await getGasStations()).content;
    const currentGasStations = this.state.gasStations;
    currentGasStations.push(
      ...stations.map( (s) => {
        console.log(s)
        const latlng = {
          latitude: parseFloat(s.latitudePosto), 
          longitude: parseFloat(s.longitudePosto)
        }
        return (
          <Marker coordinate={latlng} key={s.idPosto}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>{s.nomePosto}</Text>
              <Text style={styles.popupValue}>Valor: R${s.precoGas}</Text>
            </View>
            <Image
              source={require('../assets/marker.png')}
              style={{width: 46, height: 48}}
              resizeMode="contain"
            />
          </Marker>
        )}
    ));
    this.setState({  
        gasStations: currentGasStations
    });
  }

  distancesValues = [
    '0 a 5km',
    '5 a 10km',
    '10 a 20km',
    '20 a 30km',
  ]

  distances = this.distancesValues.map( (s, i) => {
    return <Picker.Item key={i} value={s} label={s} />
  });

  fuelValues = [
    'Gasolina',
    'Etanol',
  ]

  fuels = this.fuelValues.map( (s, i) => {
    return <Picker.Item key={i} value={s} label={s} />
  });

  getLocation = () =>{
    Geolocation.getCurrentPosition((result) => {
      this.setState({
        lat: result.coords.latitude,
        lon: result.coords.longitude,
        marker: {
          latlng: {
            latitude: result.coords.latitude + 0.001800, 
            longitude: result.coords.longitude + 0.001600
          }
        }
      });
    });
    console.log(this.state.gasStations)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.pickerArea}>
            <Picker style={styles.picker}
            selectedValue={this.state.distance}
            onValueChange={(value) => {
              this.setState({distance: value});
            }}>
              <Picker.Item label="Distância" value="0" />
              {this.distances}
            </Picker>
          </View>
          <View style={styles.pickerArea}>
            <Picker style={styles.picker}
            selectedValue={this.state.vehicle}
            onValueChange={(value) => {
              this.setState({vehicle: value});
            }}>
              <Picker.Item label="Veículos" value="0" />
              {this.state.vehiclesOptions}
            </Picker>
          </View>
          <View style={styles.pickerArea}>
            <Picker style={styles.picker}
            selectedValue={this.state.fuel}
            onValueChange={(value) => {
              this.setState({fuel: value});
            }}>
              <Picker.Item label="Combustível" value="0" />
              {this.fuels}
            </Picker>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <MapView 
          provider={PROVIDER_GOOGLE}      
          style={{flex: 1}}
          region={{latitude: this.state.lat ,longitude: this.state.lon,latitudeDelta: 0.0922 * 0.1,longitudeDelta: 0.021 * 0.1}}  
          showsUserLocation={true}    
        >
        {this.state.gasStations}
        </MapView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: '100%',
    backgroundColor: '#35CA76'
  },
  popup: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#35CA76',
    borderWidth: 2,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700'
  },
  popupValue: {
    fontSize: 15
  },
  form: {
    width: '100%',
    padding: 10,
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  pickerArea: {
    width: '48%',
    margin: '1%',
    display: 'flex',
    flexDirection: 'row',
  },
  picker: {
    width: '98%',
    margin: '1%',
  },
  button: {
    backgroundColor: '#35CA76',
    width: '48%',
    margin: '1%',
    height: 40,
    marginTop: 10
  },
  buttonText: {
    paddingTop: 10,
    textAlign: 'center',
    color: 'white',
  }
});