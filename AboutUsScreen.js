import React from 'react';
import {View,Text,StyleSheet,Dimensions,TextInput,Image,TouchableOpacity,ScrollView} from 'react-native';
import { collection, addDoc,setDoc ,doc} from "firebase/firestore"; 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class AboutUsScreen extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <View style={styles.mainview}>
               <Image source={require('../assets/christmas.jpg')} style={{width:'100%',height:25*windowHeight/100}}/>
                        <View style={styles.subview}>
                            <ScrollView>

                            <Image source={require('../assets/icon.png')} style={{width:80,height:80,marginTop:10,alignSelf:'center',borderRadius:50}}/>
                            <Text style={{color:"black",textAlign:"center",fontSize:24,marginTop:10,fontWeight:'bold'}}>Bole Toh Pahadi</Text>
                                    <Text style={{textAlign:'center',marginTop:20,fontSize:18,fontWeight:'400'}}>“BOLE TOH PAHAD” is Pithoragarh’s first internet radio &
                                        Podcast station established in the view to share ideas
                                        and views on a broad range of topics.
                                        In view of rapid growth in indian digitalization, an idea of
                                        android/ios app is created to cover the topics which
                                        include Motivational speeches, Spoken English, Art of
                                        music, Parental counseling, Mental health & Mental
                                        stability, Class 6-12 CBSE subjects, GK - general
                                        knowledge, Literature and so on.</Text>
                                    
                            <Image source={require('../assets/small-logo.png')} style={{width:80,height:80,marginTop:20,alignSelf:'center',borderRadius:50}}/>
 
                                    <Text style={{textAlign:'center',marginTop:10,fontSize:22,fontWeight:'bold'}}>About Ghanshyam Oli Child Welfare Organisation</Text>
                                    <Text style={{textAlign:'center',marginTop:20,fontSize:18,fontWeight:'400'}}>Ghanshyam Oli Child Welfare Society is a non-governmental
                                        organization started by Mr. Ajay in 2015. The organization
                                        exclusively works for the welfare of children, women’s and old
                                        age people. Mr. Ajay was very driven by the idea of seeing a day
                                        when no Indian child would be deprived of their basic rights like
                                        survival, participation, protection, and development. Like many
                                        of us, he never encouraged or supported the differentiation
                                        society does between privileged and underprivileged children.
                                        He hates to see children begging and working as laborers. Unlike
                                        most of us though, he did something about it. From a very early
                                        age, he was actively involved in social welfare services.
                                    </Text>
                                    <Text style={{textAlign:'center',marginTop:10,fontSize:18,fontWeight:'400'}}>Self-generation of funds by using innovative and creative ideas is
                                        the key feature of the organization. At present, in a very short
                                        span of 5 years, the organization is serving in total no. of 10
                                        different states and two Union territories with more than 104
                                        cities in the field of education, health and awareness campaigns,
                                        development programs and adoptions. More than fourteen
                                        thousand km of the barefoot journey around the nation has
                                        been done in order to identify the problem of child begging and
                                        child labor from the grassroots level. An approx 17,000 sessions
                                        dealing with issues like basic rights of people, the importance of education, why say no to child labor and beggars, menstrual
                                        hygiene, etc., have been addressed until now.
                                    </Text>

                                    <Text style={{textAlign:'center',marginTop:10,fontSize:18,fontWeight:'400'}}>
                                    The organization has reached an approx 3.5 lakhs youth with the
                                    “BHEEKH NAHI DENGE” campaign, around 15,000
                                    underprivileged families, ensuring them their basic rights, good
                                    health, education, and shelter.
                                    </Text>
                                  
                                  <View style={{marginBottom:20}}>
                                    <Text style={{marginTop:20,textAlign:'center',fontSize:24,fontWeight:'bold'}}>Contact Us</Text>
                                    <Text style={{marginTop:20,textAlign:'center',fontSize:20,fontWeight:'800'}}>Head Office</Text>
                                    <Text style={{marginTop:10,textAlign:'center',fontSize:18,fontWeight:'100'}}>Oli Niwas, Dhanaura, Dharchula Road
                                    near Maa Kripa Barat Ghar,
                                    Pithoragarh, Uttarakhand.
                                    Pin: 262501</Text>
                                    <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}}>Education Department</Text>
                                    <Text style={{marginTop:10,marginLeft:10,fontSize:18,fontWeight:'400'}}>Phone:+91-9690609937, +91-7500065162</Text>
                                    <Text style={{marginTop:5,marginLeft:10,fontSize:18,fontWeight:'400'}}>Email Address: gosocietyedu@gmail.com</Text>

                                    <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}}>Administrative Department</Text>
                                    <Text style={{marginTop:10,marginLeft:10,fontSize:18,fontWeight:'400'}}>Phone: +91-7351545562, +91-7302204261</Text>
                                    <Text style={{marginTop:5,marginLeft:10,fontSize:18,fontWeight:'400'}}>Email Address: gosocietyadm@gmail.com</Text>

                                    <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}}>Counselling Department</Text>
                                    <Text style={{marginTop:10,marginLeft:10,fontSize:18,fontWeight:'400'}}>Phone: +91-7302204261, +91-7525838880, 05964-256015</Text>
                                    <Text style={{marginTop:5,marginLeft:10,fontSize:18,fontWeight:'400'}}>Email Address: wecouncilyou18@gmail.com</Text>

                                    <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}}>Human Resource Department</Text>
                                    <Text style={{marginTop:10,marginLeft:10,fontSize:18,fontWeight:'400'}}>Phone: 05964-256015, +91-7525838880, +91-9690609937</Text>
                                    <Text style={{marginTop:5,marginLeft:10,fontSize:18,fontWeight:'400'}}>Email Address: ghanshyamolisociety@gmail.com</Text>

                                    <Text style={{marginTop:10,marginLeft:10,fontSize:20,fontWeight:'600'}}>Operational Department</Text>
                                    <Text style={{marginTop:10,marginLeft:10,fontSize:18,fontWeight:'400'}}>Phone: +91-7351545562, +91-8755964798, 05964-256015</Text>
                                    <Text style={{marginTop:5,marginLeft:10,fontSize:18,fontWeight:'400'}}>Email Address: gocwsoperation@gmail.com</Text>
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
        height:windowHeight,
        alignItems:'center'
    },
    subview:{
        backgroundColor:'#ffff',
        borderRadius:10,
        width:windowWidth,
        height:'75%',
        marginTop:2
    },
});