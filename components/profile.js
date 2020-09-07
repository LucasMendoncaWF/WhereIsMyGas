import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import React, { Component } from 'react';
import TableComponent from './table';
import { getVehicles, getVehicleById } from '../services/cars';
import { getTravels } from '../services/travels';
import { getGasStationById, getGasStations } from '../services/gasStation';

export class ProfileScreen extends Component {

  constructor() {
    super();
    this.state = {
      veiculoData: [],
      viagemData: []
    }
    this.getVehicles();
    this.getTravels();
  }

  async getVehicles() {
    const vehicles = (await getVehicles()).content;
    this.setState({  
      veiculoData: vehicles.map(s => {
        return [`${s.marcaVeiculo} ${s.modeloVeiculo}`, s.tipoCombustivel]
      })
    });
  }

  async getTravels() {
    const travels = (await getTravels()).content;
    let travelsData = [];
    for(let t = 0; t < travels.length; t++) {
      travelsData.push([
        travels[t].duracaoViagem + ' min', 
        await this.getVehicleById(travels[t].veiculoTable), 
        await this.getGasStationById(travels[t].postoTable)
      ]);
    }
    this.setState({ viagemData: travelsData });
  }

  async getVehicleById(id) {
    const vehicle = await getVehicleById(id);
    return `${vehicle.marcaVeiculo} ${vehicle.modeloVeiculo}`;
  }

  async getGasStationById(id) {
    const gasStation = await getGasStationById(id);
    if(!gasStation.error) {
      return gasStation.nomePosto;
    } else {
      return 'Informação Faltando'
    }
  }

  veiculoHead = ['Nome', 'Combustível'];
  viagemHead = ['Duração', 'Veículo', 'Posto'];

  render (){
    return (
      <View style={styles.container}>
        <ImageBackground style={ styles.imgBackground } 
                    resizeMode='cover' 
                    source={require('./../assets/bg.png')}>
            <ScrollView style={styles.content}>
              <Text style={styles.name}>João Pedro</Text>
              <View style={styles.line}></View>
              <View style={styles.infoContainer}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Viagens</Text>
                  <View style={styles.line}></View>
                  <TableComponent tableHead={this.viagemHead} tableData={this.state.viagemData}></TableComponent>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Veículos</Text>
                  <View style={styles.line}></View>
                  <TableComponent tableHead={this.veiculoHead} tableData={this.state.veiculoData}></TableComponent>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cadastrar Veículo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    overflow: 'visible'
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold"
  },
  content: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 40,
    width: '90%',
    marginLeft: '5%',
    minHeight: 300,
    maxHeight: Dimensions.get('window').height - 160,
    padding: 20,
    overflow: 'scroll'
  },
  name: {
    fontSize: 25
  },
  line: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%'
  },
  infoContainer: {
    padding: 10,
    marginTop: 30
  },
  sectionTitle: {
    fontSize: 20,
    color: 'gray'
  },
  section: {
    marginBottom: 30
  },
  button: {
    backgroundColor: '#35CA76',
    marginTop: 10,
    padding: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});