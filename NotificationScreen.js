import * as React from 'react';
import {View,Text,StyleSheet,Dimensions,TextInput,TouchableOpacity,FlatList,ActivityIndicator,Image} from 'react-native';
import db from '../tools/config';
import { collection, addDoc,setDoc ,doc,getDocs} from "firebase/firestore"; 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Notification extends React.Component{
    constructor(){
        super();
        this.state={
            title:'',
            message:'',
            loading:true,
            notifications:[]
        }
        this.getNotifications = async()=>{
      
            let notifications = [];
            const querySnapshot = await getDocs(collection(db, "notifications"));
            querySnapshot.forEach((doc) => {
              if(doc.data().title){
                 let newData = {
                     title:doc.data().title,
                     message:doc.data().message
                 }
                 notifications.push(newData);
                 this.setState({
                     notifications:notifications,
                     loading:false
                 });
              }
            });
    
        }
        this.items = ({item,index})=>{
            return(
                <View  key={index} style={Styles.notificationbox}>
                    <Text style={Styles.notificationtext}>{item.title}</Text>
                      <View style={Styles.line}></View>
                    <Text style={Styles.messagetext}>"{item.message}"</Text>
                </View>
            )
        }
        
    }
    componentDidMount(){
        this.getNotifications();
    }
    render(){
        return(
            <View style={Styles.mainview}>
           {this.state.loading?  <ActivityIndicator size="large" color="white" style={{marginTop:10}}/>:
                
                    <FlatList  
                    data={this.state.notifications}
                    keyExtractor={(item,index)=>index.toString()}
                    renderItem={(item)=>this.items(item)}
                >

                </FlatList>  
            }    
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    mainview:{
        height:windowHeight,
        width:windowWidth,
        backgroundColor:'black',
        flex:1, 
        position:'relative'

    },
    secondview:{
        width:windowWidth-23,
        height:windowHeight/2,
        backgroundColor:'#303134',
        alignSelf:'center',
        marginBottom:10,
        borderRadius:10,
        position:'absolute',
        bottom:0,
        alignItems:'center'
       
    },
    textinput:{
        backgroundColor:'white',
        borderRadius:10,
        width:'80%',
        height:45,
        alignSelf:'center',
        marginTop:15,
        borderColor:'black',
        borderWidth:2,
        paddingLeft:10,
        marginTop:10,
        marginBottom:10
    },
    messageinput:{
        backgroundColor:'white',
        borderRadius:10,
        width:'80%',
        height:'60%',
        alignSelf:'center',
        marginTop:15,
        borderColor:'black',
        borderWidth:2,
        paddingLeft:10,
        marginTop:10,
        marginBottom:10,
    },
    header:{
        textAlign:'center',
        fontWeight:'bold',
        color:'white',
        fontSize:18
    },
    button:{
        backgroundColor:'#82E48B',
        height:'10%',
        width:'60%',
        borderRadius:10,
        alignSelf:'center',
        justifyContent:'center'

    },
    sendtext:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:24
    },
    loadingtext:{
        textAlign:'center',
        fontSize:18,
        color:'white'
    },
    notificationbox:{
        backgroundColor:'#3B3E60',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:20,
        borderWidth:2,
        borderColor:'#131930',
        width:'90%',
        borderRadius:10
    },
    notificationtext:{
        color:'white',
        fontSize:24,
        alignSelf:'center'
    },
    messagetext:{
        color:'white',
        fontSize:24,
        color:'#096EE0'

    },
    line:{
        width:'100%',
        backgroundColor:'white',
        height:1
    }
})