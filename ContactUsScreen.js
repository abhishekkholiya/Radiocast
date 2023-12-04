import React from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ContactUsScreen extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <View style={styles.mainview}>
              
            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainview:{
        backgroundColor:'black',
        width:windowWidth,
        height:windowHeight
    }
});