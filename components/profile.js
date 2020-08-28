import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import * as React from 'react';
import TableComponent from './table';

export const ProfileScreen = () => {
  let veiculoHead = ['Nome', 'Combustível'];
  let veiculoData = [
    ['Corsa', 'Gasolina'],
    ['Gol', 'Alcool',],
    ['Corola', 'Alcool'],
  ];

  let viagemHead = ['Data', 'Veículo', 'Posto'];
  let viagemData = [
    ['21/09/20', 'Corsa', 'Posto 1'],
    ['20/09/20', 'Corsa', 'Posto 1'],
  ];

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
                <TableComponent tableHead={viagemHead} tableData={viagemData}></TableComponent>
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Veículos</Text>
                <View style={styles.line}></View>
                <TableComponent tableHead={veiculoHead} tableData={veiculoData}></TableComponent>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Cadastrar Veículo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      </ImageBackground>
    </View>
  );
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