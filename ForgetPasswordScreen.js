import * as React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput,Platform} from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default class ForgetPassword extends React.Component{
    constructor(){
        super();
        this.state={
            email:''
        }
    }
    render(){
        return(
            <View style={styles.container} behavior={"padding"} >
            <View style={styles.header}>
                  <Text style={styles.text_header}>Forgot Password?</Text>
            </View>
 
            <View style={styles.footer}>
              <Text style={styles.text_footer}>Email</Text>
 
              <View style={styles.action}>
 
              <Image  source={require('../assets/email.png')} style={{width:24,height:24}}/>
 
                <TextInput placeholder="Your Email" style={styles.textInput} 
                 autoCapitalize="none" 
                 onChangeText={(email)=>this.setState({
                   email:email
                 })} 
                ></TextInput>
 
               {this.state.email?
                <Feather name="check-circle" size={20} color="green" />
               :
               <Feather name="check-circle" size={20} color="black" />
 
             }
 
              </View>
              <View style={styles.button}>
                 
                       <TouchableOpacity onPress={()=>{
                                 
                                 if(this.state.email!= null && this.state.email != ''){
                                    const auth = getAuth();
                                    sendPasswordResetEmail(auth, this.state.email)
                                      .then(() => {
                                        alert('An email has been sent to you with instructions on how to reset password');
                                      })
                                      .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        // ..
                                      });
                                   }else{
                                     alert('kindly fill all the fields')
                                   }
                            
                         }} style={{width:200,height:40,borderRadius:10,backgroundColor:'black',alignItems:'center'}}>
                           <Text style={{fontWeight:'bold',marginTop:10,color:'white'}}>Change Password</Text>
                       </TouchableOpacity>    

                         <TouchableOpacity onPress={()=>{
                        this.props.navigation.navigate('Login');
                        }} style={{marginTop:20,marginBottom:10}}>
                          <Text style={{color:'blue',fontWeight:'bold'}}>Already have an account?</Text>
                      </TouchableOpacity>          
              </View>
               
              
             </View>
       </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    header:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:20,
        paddingBottom:50
    },
    footer:{
        flex:3,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30
    },
    text_footer:{
        color:'#05375a',
        fontSize:18
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5
    },
    textInput:{
        flex:1,
        marginTop:Platform.OS === 'ios' ? 0 : -12,
        paddingLeft:10,
        color:'#05375a'
    },
    button:{
        alignItems:'center',
        marginTop:50
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    }
});