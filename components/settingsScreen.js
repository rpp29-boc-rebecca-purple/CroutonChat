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
import { TouchableOpacity } from 'react-native-gesture-handler';

const SettingsScreen = (props) => {
  return (
    <SafeAreaView>
      {/* Header Image */}
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400}}>
          <View style={styles.headerImage}></View>
        </ImageBackground>
      </View>
      {/* LightMode/DarkMode Toggle */}
      <View style={styles.modeToggleWrap}>
        <Text>Theme:</Text>
        <View style={styles.modeToggleButtons}>
          <TouchableOpacity onPress={()=> alert('Light mode selected')}>
            <Text style={{paddingRight: 25, fontWeight: 'bold'}}>Light</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{alert('Dark mode selected')}}>
            <Text>Dark</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Change Password and Logout Buttons */}
      <View style={styles.settingsButtonsWrap}>
        <TouchableOpacity onPress={()=>{alert('Logging out')}}>
          <Text>Logout?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingsButtonsWrap}>
        <TouchableOpacity onPress={()=>{alert('Change password?')}}>
          <Text>Change Password?</Text>
        </TouchableOpacity>
      </View>
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
    marginLeft: 20,
    flexDirection: 'row'
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


  }

});

export default SettingsScreen;