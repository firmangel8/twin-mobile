import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import * as Progress from "react-native-progress";

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0, indeterminate: true };
  }

  componentDidMount() {
    this.animate();
  }

  animate() {

    let progress = 0;
    this.setState({ progress });
    setTimeout(() => {
      this.setState({ indeterminate: false });
      setInterval(() => {
        progress += Math.random() / 5;
        if (progress > 1) {
          progress = 1;
          this.props.navigation.navigate("LoginAnimation");
        }
        this.setState({ progress });
      }, 200);
    }, 100);
  }

  static navigationOptions = {
      header:null
  }
  render() {
    return <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require("../../assets/deliver-logo.png")} />
          <View style={styles.progress}>
            <Progress.Bar progress={this.state.progress} indeterminate={this.state.indeterminate} color="rgba(65, 131, 215, 1)" />
          </View>
        </View>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    // flexDirection: 'column',
    justifyContent: "center"
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100
  },
  progress: {
    position: "absolute",
    top: 300,
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center"
  }
});
