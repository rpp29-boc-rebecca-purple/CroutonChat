import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Friends from './components/friends.js'
import ChatList from './components/chatlist.js'
import CameraComponent from './components/camera.js'
import Profile from './components/profileScreen.js'
import Settings from './components/settingsScreen.js'


const Tab = createBottomTabNavigator();


export default function App() {
  // Add State that will be shared globally here
  const [name, setName] = useState('Woofy GoldBerg');
   const [email] = useState('Woofy@gmail.com')


  function FriendsScreen() {
    return (
      <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "left" }}>
        <Friends />
      </View>
      </ScrollView>
    );
  }

  function ChatScreen() {
    return (
    <ScrollView>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "left" }}>
      <ChatList />
    </View>
    </ScrollView>
  );
  }

  //  Camera function
  function CameraScreen() {
    return (
      <View style={{ flex: 1}}>
      <CameraComponent email={email}/>
      </View>
    );
  }

  function ProfileScreen( {navigation, route} ) {
    setName(route.params || 'null');
    const settingsOpen = false ? <Profile name={name} /> : <Settings />
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {settingsOpen}
    </View>

  );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarLabel: 'Friends',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="paw-outline" color={color} size={size} />
            ),
          }}
          />

        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: 'Camera',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" color={color} size={size} />
            ),
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
  cameraicon: {
      width: 60,
      height: 60,
      borderRadius: 45,
      borderWidth: 1,
      resizeMode: 'contain'
    },
    backbutton: {
      top: -300,
      left: -150
    }
  })
