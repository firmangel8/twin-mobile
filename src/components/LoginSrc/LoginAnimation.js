import React, { Component } from "react";

import AuthScreen from "./containers/AuthScreen/index";
import HomeScreen from "./containers/HomeScreen/index";
import { Body } from "native-base";
import { AsyncStorage } from "react-native"

export class LoginAnimation extends Component {
  state = {
    isLoggedIn: false, // Is the user authenticated?
    isLoading: false, // Is the user loggingIn/signinUp?
    isAppReady: false // Has the app completed the login animation?
  };

  constructor(props){
    super(props)
    this.state = {bypass: false}
  }
  
   _simulateLogin = (username, password) => {
     this.setState({ isLoading: true });
    // console.log(username)
    const url = "https://twin-web-app.appspot.com/api/login"
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
        phone: username,
        password: password

      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.user.id)
      
      if (data.error === "Unauthorized") {
        alert("You're not registered yet");
        this.setState({ isLoading: false });
      }else{
        //adding to ensure replacement data initial apps after sign-in
        //contains fs-token, user_name, user_id (asynstorage wrapper)
        AsyncStorage.setItem('fs-token', data.token)
        AsyncStorage.setItem("user_name", data.user.name);
        AsyncStorage.setItem("user_id", data.user.id.toString())
        
        this.setState({ isLoading: true });
        setTimeout(() => this.setState({
              isLoggedIn: true,
              isLoading: false
            }), 1000);
      }            
    })
    .catch(err=>{console.log(err)})

  };

  _simulateSignup = (username, password, fullName) => {
    this.setState({ isLoading: true });
    setTimeout(
      () => this.setState({ isLoggedIn: true, isLoading: false }),
      1000
    );
  };

  reboot = async () => {
     const token = await AsyncStorage.getItem('fs-token')
     const user_name = await AsyncStorage.getItem("user_name");
     const user_id = await AsyncStorage.getItem("user_id");
     AsyncStorage.setItem("fs-token", token);
     AsyncStorage.setItem("user_name", user_name);
     AsyncStorage.setItem("user_id", user_id);

     this.setState({ isLoading: true });
     setTimeout(() => this.setState({
           isLoggedIn: true,
           isLoading: false
         }), 300);

  }

  tokenExist = async () => {
    const tokenPayload = await AsyncStorage.getItem('fs-token')
    tokenPayload.then(data => {
      this.setState({
        bypass: data
      })
    })
    const tokenExist = this.state.bypass
    // return await AsyncStorage.getItem('fs-token')
    return tokenExist
    // console.log('logout here')
  }

  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  static navigationOptions = { header: null };
  render() {
    
    console.log(this.tokenExist)

    if (this.state.isAppReady) {
      return (
        <HomeScreen
          logout={() => this.setState({ isLoggedIn: false, isAppReady: false })}
        />
      );
    } else {
      return (
        <AuthScreen
          prepareRouter = {this.props.navigation}
          login={this._simulateLogin}
          signup={this._simulateSignup}
          isLoggedIn={this.state.isLoggedIn}
          isLoading={this.state.isLoading}
          onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
        />
      );
    }
  }

  
}

export default LoginAnimation;
