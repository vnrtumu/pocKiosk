import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

export default class CheckoutScreen extends Component {

    render() {
        // console.log(JSON.stringify(this.props))
        const { it } = this.props.route.params;
        const { total } = this.props.route.params;
        const renderTable = itemData => {
            return (
                <View style={styles.dataContainer}>
                    <Text style={styles.qty}>{itemData.item.qty}</Text>
                    <Text style={styles.title}>{itemData.item.title}</Text>
                    <Text style={styles.price}>{itemData.item.price}</Text>
                </View>
            );
        }
        return (
            <ScrollView>
            <View style={styles.mainContainer}>
                <Text style={styles.totalText}>Final Order Details</Text>
                <View style={styles.headContainer}>
                    <Text style={styles.qtyh}>Qty</Text>
                    <Text style={styles.titleh}>Item Name</Text>
                    <Text style={styles.priceh}>Item Price</Text>
                    <Text style={styles.statush}>Status</Text>
                </View>
                <View style={styles.data}>
                    <FlatList
                        data={it}
                        renderItem={renderTable}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={styles.final}>
                    <Text style={styles.totalText}>total: {total}</Text>
                </View>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#35FF7B', },
    headContainer: { flex: 1, flexDirection: 'row', height: 100, },
    qtyh: { width: '10%', color: '#000', fontSize: 35, fontWeight: 'bold', marginHorizontal: 10 },
    titleh: { width: '40%', color: '#000', fontSize: 35, fontWeight: 'bold', marginHorizontal: 10 },
    priceh: { width: '20%', color: '#000', fontSize: 35, fontWeight: 'bold', marginHorizontal: 10 },
    statush: { width: '30%', color: '#000', fontSize: 35, fontWeight: 'bold', marginHorizontal: 10 },

    dataContainer: { flex: 4, flexDirection: 'row', margin: 30 },
    qty: { width: '10%', color: '#FF35F3', fontSize: 25, fontWeight: '600', marginHorizontal: 10 },
    title: { width: '40%', color: '#FF35F3', fontSize: 25, fontWeight: '600', marginHorizontal: 10 },
    price: { width: '50%', color: '#FF35F3', fontSize: 25, fontWeight: '600', marginHorizontal: 10 },
    totalText: { color: '#FF4A35', fontWeight: 'bold', fontSize: 33, alignSelf: 'center' },

    final: { flex: 1 },
    // data: {height: 500},
})