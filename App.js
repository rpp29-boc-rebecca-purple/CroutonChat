import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './components/homePage.js';
import SearchBar from './components/searchBar.js';
import Friends from './components/friends.js';
import ChatList from './components/chatlist.js';
import CameraComponent from './components/camera.js';
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';

const Tab = createBottomTabNavigator();

export default function App() {
  // Add State that will be shared globally here
  const [name, setName] = useState('Woofy GoldBerg');

  // Functions that will nagivate to each componenet // acts like a router
  function HomeScreen() {
    return (
      <View style={{ flex: 1 }}>
        <HomePage name={name} />
      </View>
    );
  }

  function FriendsScreen() {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
          <SearchBar />
          <Friends />
        </View>
      </ScrollView>
    );
  }

  function ChatScreen() {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
          <SearchBar />
          <ChatList />
        </View>
      </ScrollView>
    );
  }

  //  Camera function
  function CameraScreen() {
    return (
      <View style={{ flex: 1 }}>
        <CameraComponent />
      </View>
    );
  }

  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text> Put Profile Component Here</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
      <Tab.Screen
          name="Login"
          component={LoginPage}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color, size }) => <Ionicons name="login" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Signup"
          component={SignupPage}
          options={{
            tabBarLabel: 'Sign Up',
            tabBarIcon: ({ color, size }) => <Ionicons name="sign up" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Friends"
          component={FriendsScreen}
          options={{
            tabBarLabel: 'Friends',
            tabBarIcon: ({ color, size }) => <Ionicons name="paw-outline" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: 'Camera',
            tabBarIcon: ({ color, size }) => <Ionicons name="camera-outline" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" color={color} size={size} />,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />,
          }}
        />
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
    resizeMode: 'contain',
  },
});
