import React from 'react';
import {View,Text,TouchableOpacity,Image,Dimensions,StyleSheet,ActivityIndicator,ImageBackground,ScrollView} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class ArtandCultureScreen extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <View style={Styles.mainview}>
                <ScrollView>
                    <View style={{marginTop:10,width:windowWidth,flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ArtofMusic',{imagename:'artofmusic.png',screename:'Art of Music'})}}style={{width:'45%',height:180,backgroundColor:'black',marginLeft:10,marginRight:10}}>
                                        <ImageBackground source={require('../assets/artofmusic.png')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Art of Music</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('FolkStories',{imagename:'folkstories.jpg',screename:'Folk Stories'})}} style={{width:'45%',height:180,backgroundColor:'black',marginRight:10}}>
                                        <ImageBackground source={require('../assets/folkstories.jpg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Folk Stories</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10,width:windowWidth,flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MoralValues',{imagename:'moralvalues.jpg',screename:'Moral Values'})}} style={{width:'45%',height:180,backgroundColor:'black',marginLeft:10,marginRight:10}}>
                                        <ImageBackground source={require('../assets/moralvalues.jpg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Moral Values</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ParentalCounselling',{imagename:'parentalcounselling.jpg',screename:'Parental Counselling'})}}  style={{width:'45%',height:180,backgroundColor:'black',marginRight:10}}>
                                        <ImageBackground source={require('../assets/parentalcounselling.jpg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Parental Counselling</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                    </View>
                    <View style={{marginTop:10,width:windowWidth,flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MentalHealthStability',{imagename:'mentalhealth.jpg',screename:'Mental Health and Stability'})}} style={{width:'45%',height:180,backgroundColor:'black',marginLeft:10,marginRight:10}}>
                                        <ImageBackground source={require('../assets/mentalhealth.jpg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Mental Health</Text>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>and Stability</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('CareerCounselling',{imagename:'careercounselling.jpeg',screename:'Career Counselling'})}} style={{width:'45%',height:180,backgroundColor:'black',marginRight:10}}>
                                        <ImageBackground source={require('../assets/careercounselling.jpeg')} style={{width:'100%',height:'100%',justifyContent:'center'}}>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Career Counselling</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                    </View>
                    <View style={{width:windowWidth,backgroundColor:'white',borderWidth:1,borderColor:'black',alignItems:'center',justifyContent:'center',marginTop:10}}>
                        <Text>Education</Text>

                    </View>

                    <View style={{marginTop:10,width:windowWidth,flexDirection: 'row',justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ClassScreen',{imagename:'noimage',screename:'Class 6 - 12 CBSE Subjects',color:'#A35BAE'})}}style={{width:'45%',height:180,backgroundColor:'#A35BAE',marginLeft:10,marginRight:10,justifyContent:'center'}}>
                                      
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>Class 6 - 12</Text>
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>CBSE Subjects</Text>
                                    
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('GeneralKnowledge',{imagename:'noimage',screename:'General Knowledge',color:'#289BDC'})}}style={{width:'45%',height:180,backgroundColor:'#289BDC',marginRight:10,justifyContent:'center'}}>
                                        
                                            <Text style={{textAlign:'center',color:'white',fontSize:28}}>General Knowledge</Text>
                                        
                                    </TouchableOpacity>
                        </View>
                </ScrollView>
                <View style={{width:windowWidth,height:150}}>

                </View>
            </View>
        )
    }

}
const Styles = StyleSheet.create({
    mainview:{
        backgroundColor:'white',
        width:windowWidth,
        height:windowHeight
    }
})