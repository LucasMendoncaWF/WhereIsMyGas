import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

const menuList = require('./Constants.js');

export default class Menu extends Component {
  render() {
    return (
      <View style={{ flex:1, backgroundColor: '#33cc33'}}>
        <ScrollView>
          {menuList.MENU_LIST.map(item => (
            <TouchableOpacity
              key={item.index}
              onPress={() => console.log('entered menu')}
            >
              <Text style={{color: 'white', fontSize: 16, paddingLeft: 20, paddingTop: 16}}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}