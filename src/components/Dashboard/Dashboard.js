import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";

export default class Dashboard extends Component {
                static navigationOptions = { header: null };
                 render() {
                   return <View style={{flex: 1,backgroundColor:"#000,flexDirection: 'column'"}}>
                            <View style={{flex: 1, backgroundColor: '#4daf7c'}}>
                                <Image
                                    resizeMode="contain"
                                    style={{ width: 400, height:350, position: "absolute", justifyContent: 'center',
                                             alignItems: 'center'}}
                                    source={require("../../assets/deliver-logo.png")}
                                />
                            </View>
                            <View style={{flex: 1, backgroundColor: '#fff'}} />
                            
                          </View>
                          
                 }
               }
const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    width: 400,
    height: 200
  }
});
