import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Appearance } from 'react-native';
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
import axios from 'axios';

import { Ionicons } from '@expo/vector-icons';
import Friends from './components/friends.js';
import ChatList from './components/chatlist.js';
import CameraComponent from './components/camera.js';
import Profile from './components/profile/profileScreen.js';
import Settings from './components/profile/settingsScreen.js';
import useToggle from './HelperFuncs/profileHelpers.js';
import EditProfile from './components/profile/editProfileScreen.js';
import LogoutScreen from './components/profile/logoutScreen.js';
import ChangePasswordScreen from './components/profile/changePasswordScreen.js';
import LoginPage from './components/auth/loginPage';
import SignupPage from './components/auth/signupPage';

import fakeUser from './data/profileData.js';
import data from './data/data';
const Tab = createBottomTabNavigator();

export default function App() {
  // Determine user has light/dark theme on phone
  let phoneTheme = true;
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === 'dark') {
    phoneTheme = false;
}

  // Add State that will be shared globally here
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [fetchdata, setFetchData] = useState('')
  const [friendsList, setFriendsList] = useState('')
  const [token, setToken] = useState('');

  const [profileSettingsOpen, setProfileSettingsOpen] = useToggle(false);
  const [editProfile, setEditProfile] = useToggle(false);
  const [logoutModalOpen, setLogoutModalOpen] = useToggle(false);
  const [changePassModalOpen, setChangePassModalOpen] = useToggle(false);
  const [isDarkTheme, setIsDarkTheme] = useToggle(phoneTheme);
  const [isLoggedIn, setLoggedIn] = useToggle(false);

  const [email] = useState(fakeUser.email);
  const [currentUser, setCurrentUser] = useState(5);
  const [userData, setUserData] = useState(data);
  const [realUserData, setRealUserData] = useState({});

  const [authPage, setAuthPage] = useState('login');

  const [checkout,setCheckout] = useState({});

  // Setting default and dark custom themes
  const customDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const customDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
  };

  const theme = isDarkTheme ? customDarkTheme : customDefaultTheme;

  useEffect(() => {
      fetchUserData();
      fetchFriendsData();
  }, []);

  const fetchUserData = () => {
    console.log('fetchUserData invoked')
    axios.get(`http://18.219.200.72:8080/user/?user_id=${userId}`)
    .then(function (response) {
      setFetchData(response.data)
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  const fetchFriendsData = () => {
    console.log('fetchFriendsData invoked')
      axios.get(`http://18.219.200.72:8080/user/friendsList?user_id=${userId}`)
      .then(function (response) {
        setFriendsList( response.data.sort((a, b) => (a.first_name > b.first_name ? 1 : -1)) )
      })
      .catch(function (error) {
        console.log(error);
      })
    };

  const FriendsScreen = () => {
    return (
      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left' }}>
          <Friends friendsList={friendsList} isDarkTheme={isDarkTheme} />
        </View>
      </ScrollView>
    );
  };
  const ChatScreen = ({ route }) => {
    return <ChatList data={userData} currentUser={currentUser} isDarkTheme={isDarkTheme} />;
  };
  const CameraScreen = () => {
    return (
      <View style={{ flex: 1 }}>
        <CameraComponent email={userEmail} />
      </View>
    );
  };

  function ProfileScreen() {
    let displaypage = null;
    if (profileSettingsOpen) {
      if (!logoutModalOpen && !changePassModalOpen) {
        displaypage = <Settings
        toggleSettings={setProfileSettingsOpen}
        state={profileSettingsOpen}
        logoutModalToggle={setLogoutModalOpen}
        changePassModalToggle={setChangePassModalOpen}
        darkThemeToggle={setIsDarkTheme}
        isDarkTheme={isDarkTheme}/>
      } else if (logoutModalOpen){
        displaypage = <LogoutScreen
        logoutModalToggle={setLogoutModalOpen}
        toggleSettings={setProfileSettingsOpen}
        isDarkTheme={isDarkTheme} />
      } else if (changePassModalOpen) {
        displaypage = <ChangePasswordScreen
        changePassModalToggle={setChangePassModalOpen}
        toggleSettings={setProfileSettingsOpen}
        isDarkTheme={isDarkTheme} />
      }
    } else {
      if (editProfile) {
        displaypage = <EditProfile
        editProfile={setEditProfile}
        fakeUser={fakeUser}
        isDarkTheme={isDarkTheme}
         />
      }
      else {
        if (!profileSettingsOpen) {
          displaypage = <Profile
          toggleSettings={setProfileSettingsOpen}
          editProfile={setEditProfile}
          fakeUser={fakeUser}
          isDarkTheme={isDarkTheme}
           />;
        }
      }
    }

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>{displaypage}</View>;
  }
  if (!isLoggedIn && authPage === 'signup') {
    return <SignupPage setLoggedIn={setLoggedIn} setAuthPage={setAuthPage} isDarkTheme={isDarkTheme} />;
  } else if (!isLoggedIn) {
    return <LoginPage setLoggedIn={setLoggedIn}
    setAuthPage={setAuthPage}
    theme ={theme}
    isDarkTheme={isDarkTheme}
    setUserId={setUserId}
    setToken={setToken}
    setUserEmail={setUserEmail}
    />;
  } else {
    return (
      <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator>
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" color={color} size={size} />,
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
            name="Friends"
            component={FriendsScreen}
            options={{
              tabBarLabel: 'Friends',
              tabBarIcon: ({ color, size }) => <Ionicons name="paw-outline" color={color} size={size} />,
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