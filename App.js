import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button, SafeAreaView} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Friends from './components/friends.js'
import ChatList from './components/chatlist.js'
import CameraComponent from './components/camera.js'

const Bottom = createBottomTabNavigator();

export default function App() {
  // Add State that will be shared globally here

  //hardcoded test will replace with user whos logged in later
  const [email, setEmail] = useState('Woofy@gmail.com')
  // Functions that will nagivate to each componenet // acts like a router

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
    // const { dogname } = route.params || 'testname';
    const { email } = route.params || 'null'
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SafeAreaView style={styles.backbutton}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
      <Text> Put Profile Component Here  {JSON.stringify(email)}</Text>
    </View>
  );
  }

  return (
    <NavigationContainer>
      <Bottom.Navigator>
        <Bottom.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarLabel: 'Friends',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="paw-outline" color={color} size={size} />
            ),
          }}
          />

        <Bottom.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: 'Camera',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="camera-outline" color={color} size={size} />
            ),
          }}
        />

        <Bottom.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubbles-outline" color={color} size={size} />
            ),
          }}/>

        <Bottom.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            ),
          }}/>
      </Bottom.Navigator>
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
