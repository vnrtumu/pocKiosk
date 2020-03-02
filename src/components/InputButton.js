
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class InputButton extends Component {

    render() {
        return (
            <View style={styles.inputButton}>
                <Text style={styles.inputButtonText}>{this.props.value}</Text>
            </View>
        )
    }

}


const styles = StyleSheet.create({

    inputButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#91AA9D',
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'blue',
    },
    inputButtonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white'
    }
});