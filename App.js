import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import SplashScreen from "./src/components/SplashScreen/SplashScreen";
// import Login from './src/components/Login/Login';
import Dashboard from './src/components/Dashboard/Dashboard';
import LoginAnimation from './src/components/LoginSrc/LoginAnimation';
import LoginForm from './src/components/LoginSrc/containers/AuthScreen/LoginForm';
import AuthScreen from './src/components/LoginSrc/containers/AuthScreen/';
import HomeScreen from "./src/components/LoginSrc/containers/HomeScreen";
// import Register from './src/components/Register/Register';


const App = createStackNavigator({
  Home: { screen: SplashScreen },
  //Login: { screen: Login },
  Dashboard: { screen: Dashboard },
  LoginAnimation: { screen: LoginAnimation },
  LoginForm: { screen: LoginForm },
  AuthScreen: { screen: AuthScreen },
  HomeScreen: { screen: HomeScreen }
  // Register: { screen: Register }
});

export default App;
