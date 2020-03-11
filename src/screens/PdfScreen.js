import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';



export default class PdfScreen extends Component {
  state = {
    filePath: ''
  };
  constructor(props) {
    super(props);
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
      //Content to print
      html: content,


      //File Name
      fileName: 'test',
      //File directory
      directory: 'docs',
    };
    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    this.setState({ filePath: file.filePath });
  }
  render() {
    const { items } = this.props.route.params;
    const { final } = this.props.route.params;
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity onPress={this.askPermission.bind(this)}>
          <View>
            <Image
              //We are showing the Image from online
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/pdf.png',
              }}
              //You can also show the image from you project directory like below
              //source={require('./Images/facebook.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.text}>Download the invoice</Text>
          </View>
        </TouchableOpacity>
        <Button title="print" onPress={() => {
          this.props.navigation.navigate('Print', { items: items, final: final })
        }} />
        <Text style={styles.text}>{this.state.filePath}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F4F4F',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 16,
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch',
  },
});