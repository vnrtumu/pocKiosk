import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

import { CATEGORIES } from '../../dummy-data';
import Tile from '../components/Tile';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0,
    }
  }

  render() {
    const rederGridItem = itemData => {
      return (
        <Tile
          title={itemData.item.title}
          color={itemData.item.color}
          onSelect={() => {
            this.setState({
              items: [...this.state.items, {
                qty: 1,
                title: itemData.item.title,
                price: itemData.item.price,
              }],
              total: this.state.total + itemData.item.price
            });
          }}
        />
      );
    };

    const renderTable = itemData => {
      // console.log(itemData);
      return (
        <View style={styles.dataContainer}>
          <Text style={styles.qty}>{itemData.item.qty}</Text>
          <Text style={styles.title}>{itemData.item.title}</Text>
          <Text style={styles.price}>{itemData.item.price}</Text>
        </View>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.tableContainer}>
          <FlatList
            data={this.state.items}
            renderItem={renderTable}
            keyExtractor={(item, index) => index.toString()}
          />

          <Text style={styles.totalText}>total: {this.state.total}</Text>
        </View>
        <View style={styles.tileContainer}>
          <View style={styles.inputTiles}>
            <FlatList
              keyExtractor={(item, index) => item.id}
              numColumns={4}
              data={CATEGORIES}
              renderItem={rederGridItem}
            />
          </View>
          <View>
            <Button title="Place Order" onPress={() => {
                this.props.navigation.navigate('Checkout',{it : this.state.items, total: this.state.total})
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, flexDirection: 'row', },
  tableContainer: { flex: 4, backgroundColor: 'red', padding: 16, paddingTop: 30 },
  tileContainer: { flex: 8, backgroundColor: 'green', flexDirection: 'column' },
  inputTiles: { flex: 3, },
  submitTiles: { flex: 1, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  dataContainer: { flex: 9, flexDirection: 'row',},
  qty:   { width: '10%', color: '#fff', fontSize: 25, fontWeight: '600', marginHorizontal: 10},
  title: { width: '40%', color: '#fff', fontSize: 25, fontWeight: '600', marginHorizontal: 10},
  price: { width: '50%', color: '#fff', fontSize: 25, fontWeight: '600', marginHorizontal: 10},
  totalText: {color: '#fff', fontWeight: 'bold', fontSize: 33},
})