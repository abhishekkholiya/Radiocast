import React from 'react';
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ScrollView,Image} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Feather } from '@expo/vector-icons'; 
export default class DeveloperContactScreen extends React.Component{
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
                        <Text style={styles.header}>About Developer</Text>
                        <TouchableOpacity></TouchableOpacity>
                    </View>
                        
                    <View style={styles.subview}>
                            <ScrollView>
                                <Image source={require('../assets/developer2.png')} style={{width:100,height:100,alignSelf:'center',marginTop:10,borderWidth:1,borderColor:'black',borderRadius:10}}/>
                                <Text style={{textAlign:'center',fontSize:32,fontWeight:'bold',marginTop:20}}>Abhishek Kholiya</Text>
                                <Text style={{textAlign:'center',marginLeft:10,marginRight:10,marginTop:15,fontSize:18}}>Full stack developer</Text>
                                <Text style={{textAlign:'center',marginLeft:10,marginRight:10,fontSize:18}}>Sole developer of “BOLE TOH PAHADI PODCAST APP”</Text>
                                <Text  style={{textAlign:'center',fontSize:24,fontWeight:'bold',marginTop:25}}>Field of interests:</Text>
                                <Text style={{textAlign:'center',marginLeft:10,marginRight:10,marginTop:20,fontSize:18}}>AI, cosmology, serving society through technology, quantum computing, cars, cricket.</Text>
                                <Text  style={{textAlign:'center',fontSize:24,fontWeight:'bold',marginTop:25}}>Contact Details:</Text>
                                <View style={{alignSelf:'center',width:'40%',height:2,backgroundColor:'black'}}></View>
                                <Text style={{textAlign:'center',marginLeft:10,marginRight:10,marginTop:20,fontSize:18}}>You can reach out to me through email.</Text>
                                <View style={styles.action}>
                                    <Image  source={require('../assets/email.png')} style={{width:24,height:24}}/>

                                   <Text style={styles.emailtext}>abhishekkholiya15@gmail.com</Text>
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