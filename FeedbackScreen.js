import React from 'react';
import {View,Text,StyleSheet,Dimensions,TextInput,Image,TouchableOpacity,ScrollView} from 'react-native';
import { collection,setDoc ,doc,getDoc} from "firebase/firestore"; 
import { getAuth} from "firebase/auth";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import db from '../tools/config';
export default class FeedbackScreen extends React.Component{
    constructor(){
        super();
        this.state={
            subject:'',
            feedback:'',
            sent:false
        },
        this.submitfeedback = async()=>{
            if(this.state.subject !== null && this.state.subject !== '' && this.state.feedback !== null && this.state.feedback !== ''){
                if(this.state.subject.length<=50){
                    if(this.state.feedback.length<= 2000){
                            this.setState({sent:true});
                            const {currentUser} = getAuth();
                            const docRef = doc(db, "users", currentUser.email);
                            const docSnap = await getDoc(docRef);   
                            if(docSnap.data()){   
                                console.log('here')  
                                const feedbackRef = collection(db, "feedbacks");
                                await setDoc(doc(feedbackRef, docSnap.data().email), {
                                    subject:this.state.subject,
                                    feedback:this.state.feedback,
                                    email:docSnap.data().email
                        
                                });
                            }
                    }else{
                        alert('feedback can not be of more than 2000 characters');
                    }
                }else{
                    alert('subject can not be of more than 50 characters');
                }
               
            }else{
                alert('Kindly fill all the fields');
            }
        }
    }
    render(){
        return(
            <View style={styles.mainview}>
               <Image source={require('../assets/feedbacktalks.png')} style={{width:317,height:200,marginTop:10}}/>
               {this.state.sent === false? 
                        <ScrollView>
                            <View style={styles.subview}>
                            
                                <View style={styles.subjectview}>
                                        <Text style={styles.subjecttext}>Subject</Text>
                                        <TextInput placeholder='Subject' style={styles.subjecttextinput} onChangeText={(text)=>{this.setState({subject:text})}}></TextInput>
                                    </View>
                                    <View style={styles.feedbackview}>
                                        <Text style={styles.feedbacktext}>Feedback</Text>
                                        <TextInput placeholder='Write your feedback' style={styles.feedbacktextinput} onChangeText={(text)=>{this.setState({feedback:text})}}></TextInput>
                                    </View>
                                    <View style={styles.feedbackbuttonview}>
                                    
                                            <TouchableOpacity style={styles.feedbackbutton} onPress={()=>{this.submitfeedback()}}>
                                                <Text style={styles.submittext}>Submit</Text>
                                            </TouchableOpacity>
                                        <View/>
                                    </View>
                                    
                                
                            </View>
                            </ScrollView>: 
                        <View style={styles.subview}>
                            <View style={{alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
                                <Image source={require('../assets/successful.png')} style={{width:80,height:80,alignSelf:'center',justifyContent:'center',marginTop:20}}/>
                                <Text style={{color:'black',fontWeight:'bold',fontSize:24,textAlign:'center'}}>Thank you for your feedback!</Text>
                            </View>
                        </View>
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    mainview:{
        flex:1,
        backgroundColor:'black',
        width:windowWidth,
        height:windowHeight,
        alignItems:'center'
    },
    subview:{
        backgroundColor:'#ffff',
        borderRadius:10,
        width:90*windowWidth/100,
        height:55*windowHeight/100,
        marginBottom:10,
        marginTop:10,
    },
    subjecttext:{
        color:'black',
        marginTop:10,
        marginLeft:10,
        fontSize:24,
    },
    feedbacktext:{
        marginTop:10,
        color:'black',
        marginTop:15,
        marginLeft:10,
        fontSize:24,
    },
    subjecttextinput:{
        backgroundColor:'#E7E7E7',
        width:'90%',
        height:40,
        borderRadius:10,
        alignSelf:'center',
        paddingLeft:10
    },
    feedbacktextinput:{
        backgroundColor:'#E7E7E7',
        width:'90%',
        height:25*windowHeight/100,
        borderRadius:10,
        alignSelf:'center',
        paddingLeft:10
    },
    feedbackbutton:{
        backgroundColor:'#0555B2',
        width:'60%',
        height:42,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        marginTop:15,
        marginBottom:10
    },
    submittext:{
        fontWeight:'300',
        fontSize:18,
        color:'white'
    }
});