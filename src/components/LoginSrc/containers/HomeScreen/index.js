import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
  PermissionsAndroid, Alert, BackHandler
} from "react-native";
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
  Title,
  CheckBox,
} from "native-base";
import PropTypes from "prop-types";
import { FloatingAction } from "react-native-floating-action";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";

import CustomButton from '../../components/CustomButton';
import TimerMixin from "react-timer-mixin";

mixins: [TimerMixin];

export default class HomeScreen extends Component {
  static propTypes = {
    logout: PropTypes.func
  }

  constructor(props){
    // console.disableYellowBox;
    super(props)
    this.handleButton = this.handleButton.bind(this);
    this.state = { isLoading: true, pointerLanding: "listingRender", token: "", latitude: "8.162721716621", longitude: "-152.029210191", status:"complete", user_id: "", user_name: "", dataSourceDestination : "", current_trip_id : "" };
  }

  
  async componentDidMount(){
    const user_name = await AsyncStorage.getItem('user_name')
    const user_id = await AsyncStorage.getItem('user_id')

    this.setState({
      user_name: user_name,
      user_id: user_id
    })
    //initial GPS permission acceptances 
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "ACCESS FINE LOCATION CONFIRM",
        message:"Twins apps need your permission to access your Location, so you can update your current location."
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("ACCESS YOUR LOCATION GRANTED");
    } else {
      console.log("ACCESS YOUR LOCATION permission denied");
    }
    //end initial GPS permission acceptances

    token = await AsyncStorage.getItem("fs-token");
    await fetch("https://twin-web-app.appspot.com/api/company/trip/?user_id="+user_id,
      {
        headers: {
          method: "GET",
          // Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          dataSource: responseJson.data
        }
      );
      console.log(responseJson)
      // console.log("response data =>"+responseJson.data.destination);
    })
    .catch(error => {
      console.error(error);
    });

     BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentWillUnmount() {
        // clearInterval(this.interval);
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.handleUpdateState("listingRender");
    return true;
  }


  handleButton = async (id, statusParam) => {
    //current position
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("lat => "+position.coords.latitude)
        console.log("lng => " + position.coords.longitude);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    //end current position
    const user_id = await AsyncStorage.getItem("user_id");
    console.log(id)
    // console.log('handle here')
    token = await AsyncStorage.getItem('fs-token')
    console.log("token handle => "+token)
  
    const url = "https://twin-web-app.appspot.com/api/company/trip/"+this.state.current_trip_id+"/destination/"+id;
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
        status_destination: statusParam
      })
    })
    .then(resp => {
      console.log(resp);
      console.log(this.state.status.toString());
      // alert('Thanks to complete this destination')
      // console.log(resp)
      if(statusParam==='complete'){
        Alert.alert(
          "Updating destination",
          "Thanks to complete this destination",
          [
            {
              text: "OK",
              // onPress: () => {
              //   this.handleTakeTrip(this.state.current_trip_id);
              // }
            }
          ]
        );
      }else{
        Alert.alert(
          "Updating destination",
          "You canceled this trip",
          [
            {
              text: "OK",
              // onPress: () => {
              //   this.handleTakeTrip(this.state.current_trip_id);
              // }
            }
          ]
        );
      }
      
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  handleUpdateState = (pointer) => {
    this.setState({ pointerLanding: pointer });
  }

  handleTakeTrip = async (idTrip) => {
    
    this.handleUpdateState("dataTest");
    console.log(idTrip)
    this.setState({ isLoading: true });
    const user_name = await AsyncStorage.getItem('user_name')
    const user_id = await AsyncStorage.getItem('user_id')

    this.setState({
      user_name: user_name,
      user_id: user_id,
      'current_trip_id': idTrip,
    })
    
    token = await AsyncStorage.getItem("fs-token");
    await fetch("https://twin-web-app.appspot.com/api/company/trip/"+idTrip,
      {
        headers: {
          method: "GET",
          // Accept: "application/json",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          dataSourceDestination: responseJson.data.destination
        }
      );
      // console.log("response data =>"+responseJson.data.destination);
    })
    .catch(error => {
      console.error(error);
    });
  }

  initiateDate = () => {
    var currentdate = new Date(); 
    var dateNow = "Last Sync: " + currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
    return dateNow
  }

  logout = async () => {
    await AsyncStorage.removeItem('fs-token');
    // setTimeout(this.props.navigation.goBack, 0);
    // return true;
    console.log('logout')
  }

  static navigationOptions = {
    header: null,
  };
  render () {
   
                  
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
        <View style={{ flex: 1, backgroundColor: "#D2E9F7" }}>
          <Container>
            <Header>
              <Body>
                <Title>Hey {this.state.user_name}</Title>
              </Body>
            </Header>
            <Content>
              <List>
                <FlatList data={this.state.dataSource} renderItem={({ item }) => <ListItem thumbnail>
                      {/* <Left>
                        <Thumbnail square source={require("../../../../assets/avatar.png")} />
                      </Left> */}
                      <Body>
                        <Text>Trip #{item.id}</Text>
                        <Text note numberOfLines={1}>
                          {this.initiateDate()}
                        </Text>
                      </Body>
                      <Right>
                        <Button onPress={() => this.handleTakeTrip(item.id)}>
                          <Text>Detail</Text>
                        </Button>
                        
                      </Right>
                    </ListItem>} keyExtractor={({ id }, index) => id.toString()} />
              </List>
            </Content>
          </Container>
        </View>
      </View>;

    const listingRenderDestination = <Container>
        <Header>
          <Body>
            <Title>
              Hey {this.state.user_name}, here your destination list
            </Title>
          </Body>
        </Header>
        <Content>
          <List>
            <FlatList extraData={this.state} data={this.state.dataSourceDestination} renderItem={({ item }) => <ListItem thumbnail>
                  <Body>
                    <Text>{item.name} {item.status}</Text>
                    <Text note numberOfLines={1}>
                      {item.address}
                    </Text>
                  </Body>
                  <View style={{ paddingRight: 30 }}>
                    {console.log("rendered ID => " + item.id + "and status" + item.status)}
                    
                    {item.status === "incomplete" 
                      ? <CheckBox checked={false} onPress={() => this.handleButton(item.id, "complete")} /> 
                      : <CheckBox checked={true} onPress={() => this.handleButton(item.id, "incomplete")} />}
                  </View>
                </ListItem>} keyExtractor={({ id }, index) => id.toString()} />
          </List>
        </Content>
      </Container>;
        
      
      
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
              {/* <FloatingAction actions={actions} onPressItem={name => {
                  console.log('Your location : 8.162721716621 , -152.029210191')  ;
                }} color="rgb(246, 36, 89)" /> */}
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
      
    const listingRenderData = <View style={{ flex: 1, paddingTop: 20 }}>
        <FlatList data={this.state.dataSource} renderItem={({ item }) => <Text>
              {item.name}, {item.id}
            </Text>} keyExtractor={({ id }, index) => id.toString()} />
      </View>;
    const dataTest = <Text>tes</Text>

    const loader = (
      <View style={styles.containerActivity}>
        <ActivityIndicator size={100} style={styles.activityIndicator} color={'#fff'} animating={true}/>
      </View>
    );

    switch(this.state.pointerLanding){
      case 'listingRender':{
          if(this.state.isLoading){
            return(
              loader
            );
          }
        else{return listingRender}
        
      }
      case 'dataTest':{
        if(this.state.isLoading){
          return(
              loader
            );
        }else{
          return listingRenderDestination;
        }
        
      }
    }
  }
}

const styles = StyleSheet.create({
  containerActivity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 70,
    backgroundColor: "#3F51B5"
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    backgroundColor: "#3F51B5"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "#1976D2",
    margin: 20
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  containerLoader: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader: {
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
