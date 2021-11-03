import React, { useState, useEffect } from "react";
import { StyleSheet,  View,  ScrollView } from 'react-native';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
   } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme
 } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import Friends from './components/friends.js'
import ChatList from './components/chatlist.js'
import CameraComponent from './components/camera.js'
import Profile from './components/profile/profileScreen.js'
import Settings from './components/profile/settingsScreen.js'
import useToggle from "./HelperFuncs/profileHelpers.js";
import EditProfile from "./components/profile/editProfileScreen.js";
import LogoutScreen from "./components/profile/logoutScreen.js";
import ChangePasswordScreen from "./components/profile/changePasswordScreen.js";
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';

import fakeUser from "./data/profileData.js";
import data from './data/data';
const Tab = createBottomTabNavigator();

export default function App() {
  // Add State that will be shared globally here
  const [name, setName] = useState(fakeUser.first_name);
  const [profileSettingsOpen, setProfileSettingsOpen] = useToggle(false);
  const [editProfile, setEditProfile] = useToggle(false);
  const [logoutModalOpen, setLogoutModalOpen] = useToggle(false);
  const [changePassModalOpen, setChangePassModalOpen] = useToggle(false);
  const [isDarkTheme, setIsDarkTheme] = useToggle(false);
  const [isLoggedIn, setLoggedIn] = useToggle(true);
  const [email] = useState(fakeUser.email);
  const [userData, setUserData] = useState(data);


  // Setting default and dark custom themes
  const customDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors
    }
  };

  const customDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors
    }
  };

  const theme = isDarkTheme ? customDarkTheme : customDefaultTheme;



  // Functions that will nagivate to each componenet // acts like a router


  useEffect(() => {
    fetchUserData();
  });

  const fetchUserData = () => {
    setUserData(data.sort((a, b) => (a.name > b.name ? 1 : -1)));
    // fetch(/*http:<IP HERE>/searchFriends*/)
    // .then((data) => {
    //   setUserData(data)
    // })
    // setAllUsers() fnc to set all user that exist for friends search
  };

  const FriendsScreen = () => {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
          <Friends data={userData} />
        </View>
      </ScrollView>
    );
  };

  const ChatScreen = ({ route }) => {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
          <ChatList data={userData} />
        </View>
      </ScrollView>
    );
  };

  const CameraScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <CameraComponent email={email} />
      </View>
    );
  }

  function ProfileScreen() {
    let displaypage = null;
    if (profileSettingsOpen) {
      if (!logoutModalOpen && !changePassModalOpen) {
        displaypage = <Settings
        toggleSettings={setProfileSettingsOpen}
        state={profileSettingsOpen}
        logoutModalToggle={setLogoutModalOpen}
        changePassModalToggle={setChangePassModalOpen}
        darkThemeToggle={setIsDarkTheme} />
      } else if (logoutModalOpen){
        displaypage = <LogoutScreen
        logoutModalToggle={setLogoutModalOpen}
        toggleSettings={setProfileSettingsOpen} />
      } else if (changePassModalOpen) {
        displaypage = <ChangePasswordScreen
        changePassModalToggle={setChangePassModalOpen}
        toggleSettings={setProfileSettingsOpen} />
      }
    } else {
      if (editProfile) {
        displaypage = <EditProfile
        editProfile={setEditProfile}
        fakeUser={fakeUser}
         />
      }
      else {
        if (!profileSettingsOpen) {
          displaypage = <Profile
          toggleSettings={setProfileSettingsOpen}
          editProfile={setEditProfile}
          fakeUser={fakeUser}
           />;
        }
      }
    }

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{displaypage}</View>;
  }

  if (!isLoggedIn) {
    return <LoginPage setLoggedIn={setLoggedIn}/>;
  } else {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Tab.Navigator>
            <Tab.Screen
              name="Friends"
              component={FriendsScreen}
              options={{
                tabBarLabel: 'Friends',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="paw-outline" color={color} size={size} />
                ),
              }}/>

            <Tab.Screen
              name="Camera"
              component={CameraScreen}
              options={{
                tabBarLabel: 'Camera',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="camera-outline" color={color} size={size} />
                ),
              }}/>

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
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  cameraicon: {
    width: 60,
    height: 60,
    borderRadius: 45,
    borderWidth: 1,
    resizeMode: 'contain',
  },
  backbutton: {
    top: -300,
    left: -150,
  },
});
