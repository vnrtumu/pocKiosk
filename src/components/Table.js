import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Table extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.dataContainer}>
                    <Text style={styles.qty}>{this.props.qty}</Text>
                    <Text style={styles.title}>{this.props.title}</Text>
                    <Text style={styles.price}>{this.props.price}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, flexDirection: 'column'  },
    dataContainer: { flex: 9, flexDirection: 'row',},
    qty: {
        width: '10%',
        color: '#fff',
        fontSize: 25,
        fontWeight: '600',
        marginHorizontal: 10,
    },
    title: {
        width: '40%',
        color: '#fff',
        fontSize: 25,
        fontWeight: '600',
        marginHorizontal: 10,
    },
    price: {
        width: '50%',
        color: '#fff',
        fontSize: 25,
        fontWeight: '600',
        marginHorizontal: 10,
    }

});