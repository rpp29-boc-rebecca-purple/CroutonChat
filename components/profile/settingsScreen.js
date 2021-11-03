import React from 'react';
import {
  Title,
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const SettingsScreen = ({toggleSettings, logoutModalToggle, changePassModalToggle, darkThemeToggle, isDarkTheme}) => {

  return (
    <SafeAreaView>

      {/* Header Image  and Back Button*/}
      <ScrollView>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={isDarkTheme ? require('../../assets/BOC.nightskymoon.jpeg') : require('../../assets/BOC.profile.cloud.bg.webp')}
            style={{width: 400, height:250}}>
            <View style={styles.headerImage}></View>
            <View style={{position: 'absolute'}} >
              <TouchableOpacity onPress={()=> toggleSettings()}>
                <Text style={isDarkTheme ? styles.backButtonDark : styles.backButton}
                >&#x2190;</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* LightMode/DarkMode Toggle */}
        <View style={styles.modeToggleWrap}>
          <Text style={isDarkTheme ? styles.textStyleDark : styles.textStyle}>Change Theme?</Text>
          <View style={styles.modeToggleButtons}>
            <TouchableOpacity onPress={()=> darkThemeToggle()}>
              <Text style={{paddingRight: 25, fontWeight: 'bold', fontSize: 20, color: 'white'}}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> darkThemeToggle()}>
              <Text style={{fontSize: 20, fontWeight: 'bold', fontSize: 20}}>Dark</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Change Password and Logout Buttons */}
        <View style={styles.settingsButtonsWrap}>
          <TouchableOpacity onPress={()=> logoutModalToggle()}>
            <Text style={isDarkTheme ? styles.settingsButtonsDark : styles.settingsButtons}>Logout?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.settingsButtonsWrap}>
          <TouchableOpacity onPress={()=> changePassModalToggle()}>
            <Text style={isDarkTheme ? styles.settingsButtonsDark : styles.settingsButtons}>Change Password?</Text>
          </TouchableOpacity>
        </View>

        {/* About CroutonChat */}
        <View style={styles.aboutSection}>
          <Title style={{textDecorationLine: 'underline'}}>About CroutonChat</Title>
          <Text style={isDarkTheme ? styles.aboutTextDark : styles.aboutText}>Our team aims to create a native mobile application that allows
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
    alignItems: 'center',
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 20,
    minWidth: 200,
    textAlign: 'center'
  },
  settingsButtonsDark: {
    alignItems: 'center',
    backgroundColor: "black",
    padding: 10,
    fontSize: 20,
    minWidth: 200,
    textAlign: 'center',
    color: 'white'
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
  },
  aboutTextDark: {
    marginHorizontal: 10,
    marginTop: 10,
    color: 'white'
  },
  textStyle: {
    fontSize: 20
  },
  textStyleDark: {
    fontSize: 20,
    color: 'white'
  },
  backButton: {
    fontSize: 35,
    marginLeft: 5

  },
  backButtonDark: {
    fontSize: 35,
    color: 'white',
  }
});

export default SettingsScreen;