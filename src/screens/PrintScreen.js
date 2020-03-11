import React, { Component } from 'react';
import {
    AppRegistry,
    Button,
    StyleSheet,
    NativeModules,
    Platform,
    Text,
    View,
    PermissionsAndroid,
} from 'react-native';


import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

export default class PrintScreen extends Component {
    state = {
        selectedPrinter: null,
    }
    constructor(props) {
        super(props);
    }

    selectPrinter = async () => {
        const selectedPrinter = await RNPrint.selectPrinter({ x: 100, y: 100 })
        this.setState({ selectedPrinter })
    }

    askPermission() {
        var that = this;
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'CameraExample App External Storage Write Permission',
                        message:
                            'CameraExample App needs access to Storage data in your SD Card ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    that.createPDF();
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        //Calling the External Write permission function
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            this.createPDF();
        }
    }

    async createPDF() {
        const { items } = this.props.route.params;
        const { final } = this.props.route.params;


        let content = '<h1 style="text-align: center;"><strong>Poc Item List</strong></h1><p style="text-align: center;">Here is an example of pdf Print in React Native</p><p style="text-align: center;"><strong>Team About React</strong></p></p><table style="width:100%"><tr><th>Qty</th><th>Item Name</th><th>Price</th></tr>';

        for (let i = 0; i < items.length; i++) {
            content += '<tr><td>' + items[i].qty + '</td><td>' + items[i].title + '</td><td>' + items[i].price + '</td></tr>';
        }
        content += '</table><p style="text-align: center;">Total Price for the order: <strong>$' + final + '</strong>';
        let options = {
            html: content,
            fileName: 'test',
            directory: 'docs',
        };
        let file = await RNHTMLtoPDF.convert(options);
        this.setState({ filePath: file.filePath });
        await RNPrint.print({ filePath: file.filePath })
    }

    // @NOTE iOS Only


    // @NOTE iOS Only
    silentPrint = async () => {
        if (!this.state.selectedPrinter) {
            alert('Must Select Printer First')
        }

        const jobName = await RNPrint.print({
            printerURL: this.state.selectedPrinter.url,
            html: '<h1>Silent Print</h1>'
        })

    }

    async printPDF() {
        const results = await RNHTMLtoPDF.convert({
            html: '<h1 style="text-align: center;"><strong>Poc Item List</strong></h1>',
            fileName: 'test',
            base64: true,
        })

        await RNPrint.print({ filePath: results.filePath })
    }

    async printRemotePDF() {
        await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
    }

    customOptions = () => {
        return (
            <View>
                {this.state.selectedPrinter &&
                    <View>
                        <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
                        <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
                    </View>
                }
                <Button onPress={this.selectPrinter} title="Select Printer" />
                <Button onPress={this.silentPrint} title="Silent Print" />
            </View>

        )
    }

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && this.customOptions()}
                {/* <Button onPress={this.printHTML} title="Print HTML" /> */}
                <Button onPress={this.askPermission.bind(this)} title="Print PDF" />
                {/* <Button onPress={this.printRemotePDF} title="Print Remote PDF" /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
