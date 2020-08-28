import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export default class TableComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 0}}>
          <Row data={this.props.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={this.props.tableData} textStyle={styles.text}/>
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#35CA76' },
  text: { margin: 6 }
});