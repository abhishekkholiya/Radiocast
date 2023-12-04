import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Image} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Feather } from '@expo/vector-icons'; 
export default class SponsorsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            answer:'',
            boxopened:'',
            opened:false
        }
    }
    render(){
        return( 
                <View style={styles.mainview}>
                    <View style={styles.headerview}>               
                        <Text style={styles.header}>Sponsors</Text>
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                        
                    <View style={styles.subview}>
                            <ScrollView>
                                <Image source={require('../assets/sponsors2.png')} style={{width:100,height:100,alignSelf:'center',marginTop:10,borderWidth:1,borderColor:'black',borderRadius:10}}/>
                                <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold',marginTop:20}}>Sponsors</Text>
                                <Text style={{textAlign:'center',marginLeft:10,marginRight:10,marginTop:15,fontSize:18}}>Few people have really understood the importance and necessity of “BOLE TOH PAHADI” android/ios application and came forward to support it financially.</Text>
                                <Text  style={{textAlign:'center',fontSize:32,fontWeight:'bold',marginTop:25}}>List of Sponsors</Text>
                                <View style={{alignSelf:'center',width:'40%',height:2,backgroundColor:'black'}}></View>
                                <View style={{flexDirection:'column',marginTop:20}}>
                                    <Text style={{color:'black',marginTop:10,marginLeft:10,fontSize:20}}>Miss. Tripti Kumar, Assistant Professor</Text>
                                    <Text style={{color:'black',marginTop:10,marginLeft:10,fontSize:20}}>Mr. Himanshu Thapliyal, M.Tech NIT SURATHKAL</Text>
                                    <Text style={{color:'black',marginTop:10,marginLeft:10,fontSize:20}}>Mr. Naman Kapoor, Software Engineer</Text>
                                    <Text style={{color:'black',marginTop:10,marginLeft:10,fontSize:20}}>Mr. Deepika Kabdal, BIM business development executive</Text>
                                </View>
                               

                            </ScrollView>
                    </View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    mainview:{
        flex:1,
        backgroundColor:'black',
        width:windowWidth,
        height:windowHeight
    },
    subview:{
        flex:3,
        marginTop:80,
        width:windowWidth,
        backgroundColor:'white',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:'100%'
    },
    headerview:{
        marginTop:10
    },
    header:{
        flex:1,
        color:'white',
        fontSize:36,
        fontWeight:'bold',
        textAlign:'center',
        marginTop:10
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
        alignSelf:'center',

        
    },
    emailtext:{
        flex:1,
        paddingLeft:10,
        color:'#05375a'
    }
});