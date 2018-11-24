import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput, Button, TouchableOpacity, Alert
} from "react-native";

import CheckBox from "react-native-checkbox";

export default class Login extends Component {
  constructor(props){
    super(props);
    
  }
  pressMe = () =>{
    console.log("press me!");
  }
  ButtonClickCheckFunction = () =>{
    Alert.alert("Button Clicked")
  }
                 static navigationOptions = { header: null };
                 render() {
                   return <View style={styles.container}>
                       <ImageBackground style={styles.backgroundImage} source={require("../../assets/main-background.png")}>
                         <View style={styles.InputRounder}>
                           <View style={{ paddingTop: 20, paddingBottom: 20 }} />
                           <Text>Login</Text>
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <TextInput placeholder="Email" underlineColorAndroid="transparent" style={styles.TextInputStyleClass} />
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <TextInput placeholder="Email" underlineColorAndroid="transparent" style={styles.TextInputStyleClass} />
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <CheckBox style={{ flex: 1, padding: 10 }} leftText={"Remember Me"} />
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <Text style={{ textDecorationLine: 'underline'}}>FORGET PASSWORD</Text>
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <Text style={{ textDecorationLine: 'underline'}}>
                             DON'T HAVE AN ACCOUNT?
                           </Text>
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                            <TouchableOpacity
                                style={styles.SubmitButtonStyleActivate}
                                activeOpacity = { .5 }
                                onPress={ this.ButtonClickCheckFunction }
                            >                    
                              <Text style={styles.TextStyle}> ACTIVATE ISLEY </Text>
                            </TouchableOpacity>
                           <Image source={require("../../assets/separator_or.png")}/>
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <TouchableOpacity
                                style={styles.SubmitButtonStyleFacebook}
                                activeOpacity = { .5 }
                                onPress={ this.ButtonClickCheckFunction }
                            >                    
                              <Text style={styles.TextStyle}> SIGN IN WITH FACEBOOK </Text>
                            </TouchableOpacity>
                           <View style={{ paddingTop: 5, paddingBottom: 5 }} />
                           <TouchableOpacity
                                style={styles.SubmitButtonStyleGoogle}
                                activeOpacity = { .5 }
                                onPress={ this.ButtonClickCheckFunction }
                            >                    
                            <Text style={styles.TextStyle}> SIGN IN WITH GOOGLE </Text>
                            </TouchableOpacity>
                           
                         </View>

                         <View style={styles.logo}>
                           <Image source={require("../../assets/deliver-logo.png")} />
                         </View>
                       </ImageBackground>
                     </View>;
                 }
               }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loginContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: -500,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    flex: 1,
    width: 400,
    height: 700,
    resizeMode: "cover"
  },
  InputRounder: {
    // Setting up View inside content in Vertically center.
    // justifyContent: "center",
    flex: 1,
    // margin: 10,
    // justifyContent: "center",
    alignItems: "center"
  },
  TextInputStyleClass: {
    textAlign: "left",
    
    height: 40,
    width: 300,
    borderRadius: 20,
    backgroundColor: "#D9EBEB"
  },
  SubmitButtonStyleActivate: {
    marginTop:5,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#165990',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff',
    width: 300,
    height: 40,
  },
  SubmitButtonStyleFacebook: {
    marginTop:5,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#3E5A98',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff',
    width: 300,
    height: 40,
  },
  SubmitButtonStyleGoogle: {
    marginTop:5,
    paddingTop:10,
    paddingBottom:10,
    marginLeft:30,
    marginRight:30,
    backgroundColor:'#DA3639',
    borderRadius:30,
    borderWidth: 1,
    borderColor: '#fff',
    width: 300,
    height: 40,
  },
 
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      alignItems: 'center',
      justifyContent: 'center',
      
  }
});