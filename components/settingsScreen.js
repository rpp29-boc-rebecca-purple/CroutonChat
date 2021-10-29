import React, {useState} from 'react';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const SettingsScreen = (props) => {

  return (
    <SafeAreaView>
      {/* Header Image  and Back Button*/}
      <ScrollView>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../assets/BOC.profile.cloud.bg.webp')}
            style={{width: 400, minHeight:226}}>
            <View style={styles.headerImage}></View>
            <View style={styles.backButton}>
              <TouchableOpacity onPress={()=> props.toggleSettings()}>
                <Text style={{fontSize: 35}}
                >&#x2190;</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* LightMode/DarkMode Toggle */}
        <View style={styles.modeToggleWrap}>
          <Text style={{fontSize: 20}}>Theme:</Text>
          <View style={styles.modeToggleButtons}>
            <TouchableOpacity onPress={()=> alert('Light mode selected')}>
              <Text style={{paddingRight: 25, fontWeight: 'bold', fontSize: 20}}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{alert('Dark mode selected')}}>
              <Text style={{fontSize: 20}}>Dark</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password and Logout Buttons */}
        <View style={styles.settingsButtonsWrap}>
          <TouchableOpacity onPress={()=> props.logoutModalToggle()}>
            <Text style={styles.settingsButtons}>Logout?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsButtonsWrap}>
          <TouchableOpacity onPress={()=>{alert('Change password?')}}>
            <Text style={styles.settingsButtons}>Change Password?</Text>
          </TouchableOpacity>
        </View>

        {/* About CroutonChat */}
        <View style={styles.aboutSection}>
          <Title style={{textDecorationLine: 'underline'}}>About CroutonChat</Title>
          <Text style={styles.aboutText}>Our team aims to create a native mobile application that allows
            users to share pictures of their pets with their friends. Users will create a profile, add
            friends via email, and then message those friends via text or photo. We will provide secure
            login for users so that their personal data will be safe. The user can create and edit their
            profile, send text messages or disappearing photo messages to their friends, and view their
            friend’s profiles. This project will adhere to the highest accessibility standards, including
            color-blind friendly schemes and semantic html.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 0,
    left: 5,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerContainer: {
    flex: 4,
  },
  headerImage: {
    marginTop: 200,
    justifyContent: 'flex-start'
  },
  modeToggleWrap: {
    flex: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  modeToggleButtons: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 20,
  },
  settingsButtonsWrap: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginTop: 20
  },
  settingsButtons: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 20
  },
  aboutSection: {
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15
  },
  aboutText: {
    marginHorizontal: 10,
    marginTop: 10
  }


});

export default SettingsScreen;