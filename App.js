import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomePage from './components/home.js'
import SearchBar from './components/searchBar.js'
import Friends from './components/friends.js'

const Tab = createBottomTabNavigator();

export default function App() {
  // Add State that will be shared globally here
  const [name, setName] = useState('Woofy GoldBerg');

  // Functions that will nagivate to each componenet // acts like a router
  function HomeScreen() {
      return (
      <View style={{ flex: 1}}>
        <HomePage name={name}/>
      </View>
    );
  }

  function DiscoverScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <SearchBar />
         <Text style={{ marginBottom: 250}}> Discover Component Goes Here</Text>
      </View>
    );
  }

  // This function is the circle in middle, Camera function
  function CameraScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Camera Capturing Component Goes here that will open user phone camera directly</Text>
      </View>
    );
  }

  const CameraButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={styles.CameraButton} onPress={onPress} >
      <View style={styles.CameraButton1}></View>
      <Image style={styles.cameraicon} source={require('./assets/cameraicon.jpeg')}/>
    </TouchableOpacity>
  );
  function ChatScreen() {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SearchBar />
      <Text style={{ marginBottom: 250}}> Put Chat Component Here</Text>
    </View>
  );
  }

  function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text> Put Profile Component Here</Text>
    </View>
  );
  }


  return (


    <NavigationContainer>


      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}/>

        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="paw-outline" color={color} size={size} />
            ),
          }}
          />

        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" color={color} size={size} />
            ),
            tabBarButton: (props) => <CameraButton {...props} />,

          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles-outline" color={color} size={size} />
            ),
          }}/>

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  CameraButton: {
    top: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraicon: {
      width: 60,
      height: 60,
      borderRadius: 45,
      borderWidth: 1,
      resizeMode: 'contain'
    }
});


