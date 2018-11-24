import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Title
} from "native-base";
import PropTypes from "prop-types";
import { FloatingAction } from "react-native-floating-action";

import CustomButton from '../../components/CustomButton';
import TimerMixin from "react-timer-mixin";

mixins: [TimerMixin];

/**
 * Just a centered logout button.
 */



export default class HomeScreen extends Component {
  static propTypes = {
    logout: PropTypes.func
  }

  

  constructor(props){
    super(props)
    this.state = { pointerLanding: "listingRender", token: "", latitude: "8.162721716621", longitude: "-152.029210191", status:"complete" };
  }

  // getToken = async() => {
  //   return 
  // }
  
  componentDidMount(){
    // TimerMixin.setTimeout(
    //   () => { console.log('I do not leak!'); },
    //   5000
    // );
    // this.interval = setInterval(() => {
    //     // console.log("Hi");
    //     const token = AsyncStorage.getItem("fs-token");
        
    //     token.then(data => {this.setState({token: data})})
    //     console.log("token here => "+this.state.token);

    //     const url = "https://twin-web-app.appspot.com/api/company/trip/1/destination/1";
    //     fetch(url, {
    //       method: "PUT",
    //       headers: {
    //         Accept: "application/json",
            
    //         Authorization: "Bearer " + this.state.token
    //       },
    //       body: JSON.stringify({
    //         status: "incomplete",
    //         latitude: this.state.latitude,
    //         longitude: this.state.longitude
    //       })
    //     })
    //     .then(resp => resp.json())
    //     // .then(data => {console.log("sending data lat"+this.state.latitude+" , lng: "+this.state.longitude)})
    //     .then(data => console.log(data))
    //     .catch(err => {console.log(err)});
    //     console.log("PREPARE SEND YOUR => latitude :" +this.state.latitude +", longitude: "+this.state.longitude);

        
        
        
    // }, 6000); //6 seconds

    // setTimeout(() => {
    //   console.log('send your location now')
    // }, 1000);
    //  const token = AsyncStorage.getItem("fs-token");
    // token.then(data => {
    //   this.setState({ token: data });
    // });
    // console.log("token here => " + this.state.token);
    // console.log("here your status => "+this.state.status)

    // const url = "https://twin-web-app.appspot.com/api/company/trip/1/destination/1";
    // fetch(url, { method: "PUT", headers: { 
    //     Accept: "application/json",
    //     'Content-type': "application/x-www-form-urlencoded",
    //     Authorization: "Bearer " + this.state.token 
    //   }, 
    //     body: JSON.stringify(
    //     {
    //       status: "complete",
    //       latitude: this.state.latitude,
    //       longitude: "this.state.longitude"
    //     }
    //   ) })
    //   .then(resp => resp.json())
    //   // .then(data => {console.log("sending data lat"+this.state.latitude+" , lng: "+this.state.longitude)})
    //   .then(data => console.log(data))
    //   .catch(err => {
    //     console.log(err);
    //   });
    // console.log("PREPARE SEND YOUR => latitude :" + this.state.latitude + ", longitude: " + this.state.longitude);

  }

  componentWillUnmount() {
        // clearInterval(this.interval);
  }

  handleButton = async () => {
    // console.log('handle here')
    token = await AsyncStorage.getItem('fs-token')
    console.log("token handle => "+token)
    

    const url = "https://twin-web-app.appspot.com/api/company/trip/1/destination/2";
    await fetch(url, {
      method: "PUT",
      // credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        status_destination: this.state.status.toString()
      })
    })
      .then(resp => {
        console.log(resp);
        console.log(this.state.status.toString());
      })
      // .then(data => {console.log("status =>" + this.state.status + "lat =>"+this.state.latitude+" lng =>"+this.state.longitude + "resp" + data)})
      .catch(err => {
        console.log(err);
      });
    console.log("PREPARE SEND YOUR => latitude :" + this.state.latitude + ", longitude: " + this.state.longitude);
  }

  handleUpdateState = () => {
    this.setState({ pointerLanding: "tripTimer" });
  }


  render () {
    const actions = [{
                        text: 'Accessibility',
                        icon: require('../../../../assets/ic_accessibility_white.png'),
                        name: 'bt_accessibility',
                        position: 2
                      }, {
                        text: 'Language',
                        icon: require('../../../../assets/ic_language_white.png'),
                        name: 'bt_language',
                        position: 1
                      }, {
                        text: 'Location',
                        icon: require('../../../../assets/ic_room_white.png'),
                        name: 'bt_room',
                        position: 3
                      }, {
                        text: 'Video',
                        icon: require('../../../../assets/ic_videocam_white.png'),
                        name: 'bt_videocam',
                        position: 4
                  }];
    const dashboardRender = <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image source={require("../../../../assets/dashboard.jpg")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
        </View>
        <View style={{ flex: 1, backgroundColor: "#D2E9F7" }}>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flex: 0.5 }}>
              <Image source={require("../../../../assets/docs.png")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
            </View>
            <View style={{ flex: 0.5 }}>
              <Image source={require("../../../../assets/chat.jpg")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.5 }}>
              <Image source={require("../../../../assets/computer.jpg")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
            </View>
            <View style={{ backgroundColor: "#fff", flex: 0.5 }}>
              <Image source={require("../../../../assets/gadgets.jpg")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
            </View>
          </View>
        </View>
      </View>;

      
    
    const listingRender = <View style={{ flex: 1 }}>
        <View style={{ flex: 0.4 }}>
          <Image source={require("../../../../assets/dashboard.jpg")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
        </View>
        <View style={{ flex: 0.6, backgroundColor: "#D2E9F7" }}>
          <Container>
            <Header>
              <Body>
                <Title>
                  Hey Willy Nugraha, here some task for your location trip
                </Title>
              </Body>
            </Header>
            <Content>
              <List>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={require("../../../../assets/avatar.png")} />
                  </Left>
                  <Body>
                    <Text>Kantor Pusat</Text>
                    <Text note numberOfLines={1}>
                      Perjalanan menuju kantor Pusat - ID 2
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={this.handleButton}>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={require("../../../../assets/avatar.png")} />
                  </Left>
                  <Body>
                    <Text>Kantor Pusat</Text>
                    <Text note numberOfLines={1}>
                      Perjalanan menuju kantor Pusat - ID 2
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={this.handleUpdateState}>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={require("../../../../assets/avatar.png")} />
                  </Left>
                  <Body>
                    <Text>Kantor Pusat</Text>
                    <Text note numberOfLines={1}>
                      Perjalanan menuju kantor Pusat - ID 2
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail square source={require("../../../../assets/avatar.png")} />
                  </Left>
                  <Body>
                    <Text>Kantor Pusat</Text>
                    <Text note numberOfLines={1}>
                      Perjalanan menuju kantor Pusat - ID 2
                    </Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        </View>
      </View>;
      
    const tripTimer = <View style={{ flex: 1 }}>
        <View style={{ flex: 0.7 }}>
          <Image source={require("../../../../assets/timer.jpg")} resizeMode="cover" style={{ flex: 1, width: null, height: null }} />
        </View>
        <View style={{ flex: 0.3, backgroundColor: "#D2E9F7" }}>
          <Container>
            <Header>
              <Body>
                <Title>On the way location Manajemen..</Title>
              </Body>
              <FloatingAction actions={actions} onPressItem={name => {
                  console.log('Your location : 8.162721716621 , -152.029210191')  ;
                }} color="rgb(246, 36, 89)" />
            </Header>
            <Content>
              <List>
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require("../../../../assets/avatar.png")} />
                  </Left>
                  <Body>
                    <Text>Last update location</Text>
                    <Text note>
                      You on the trip, still watch your position....
                    </Text>
                  </Body>
                  <Right>
                    <Text note>6:43 pm</Text>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        </View>
      </View>;
      
      // return tripTimer
      // if (this.state.pointerLanding === "listingRender") {
      //   return listingRender;
      // }else if(this.state.pointerLanding==="tripTimer"){
      //   return tripTimer;
      // }

      switch(this.state.pointerLanding){
        case 'listingRender':{
          return listingRender
        }
        case 'tripTimer':{
          return tripTimer
        }
      }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1976D2',
    margin: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
})
