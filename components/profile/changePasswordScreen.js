import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {editPass }from '../../HelperFuncs/profileApi.js';

const ChangePassword = ({setChangePassModalToggle, isDarkTheme}) => {
  const [newPass, setNewPass] = useState('');
  const [newPassConf, setNewPassConf] = useState('');
  const validatePword = (p1, p2) => {
    if (JSON.stringify(p1) === JSON.stringify(p2)) {
      editPass(p2);
      changePassModalToggle();
    } else {
      alert('password confirmation did not match')
    }
  }



  return (
    <SafeAreaView>

      {/* Prompt and new password inputs */}
      <View style={styles.textWrap}>
        <Text style={isDarkTheme ? styles.textDark : styles.text}>Please enter new password below:</Text>
      </View>
      <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.inputPromptDark : styles.inputPrompt}>Enter New Password: </Text>
            <TextInput
            placeholder='new password'
            onChangeText={(val)=> setNewPass(val)}
            autoCapitalize="none"
            autoCorrect={false}
            style={isDarkTheme ? styles.inputDark : styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.inputPromptDark : styles.inputPrompt}>Confirm New Password:</Text>
            <TextInput
            style={{marginRight:0}}
            placeholder='new password'
            onChangeText={(val)=> setNewPassConf(val)}
            autoCapitalize="none"
            autoCorrect={false}
            style={isDarkTheme ? styles.inputDark : styles.input}
            />
          </View>
        </View>

      {/* back button and confirm button */}
      <View style={styles.changePasswordButtonsWrapper}>
        <View style={isDarkTheme ? styles.changePasswordButtonsDark : styles.changePasswordButtons}>
          <TouchableOpacity onPress={()=> changePassModalToggle()}>
            <Text style={isDarkTheme ? styles.buttonTextDark : styles.buttonText }>Back</Text>
          </TouchableOpacity>
            </View>
          <View style={isDarkTheme ? styles.changePasswordButtonsDark : styles.changePasswordButtons}>
          <TouchableOpacity onPress={()=> {alert('new password submitted'); validatePword(newPass, newPassConf)}}>
              <Text style={isDarkTheme ? styles.buttonTextDark : styles.buttonText }>Confirm</Text>
          </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 20
  },
  textDark: {
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 20,
    color: 'white'
  },
  textWrap: {
    alignItems: 'center',
    marginBottom: 25,
  },
  changePasswordButtonsWrapper: {
    flexDirection: 'row',
    height: 60,
    marginTop: 30,
    margin: 'auto'
  },
  changePasswordButtons: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    borderRightWidth: 1,
    borderRadius: 50,
    borderWidth: 1,
    margin: 7
  },
  changePasswordButtonsDark: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontSize: 20,
    borderRightWidth: 1,
    borderRadius: 50,
    borderWidth: 1,
    margin: 7,
    borderColor: 'white'
  },
  row: {
    flexDirection: 'column',
    marginBottom: 15,
    textAlign: 'center',
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 0,
    width: 250,
    height: 30,
    marginTop: 5,
    textAlign: 'center',
  },
  inputDark: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 0,
    width: 250,
    height: 30,
    marginTop: 5,
    textAlign: 'center',
    color: 'white'
  },
  inputPrompt: {
    textAlign: 'center',
    marginTop: 10
  },
  inputPromptDark: {
    textAlign: 'center',
    marginTop: 10,
    color: 'white'
  },
  buttonTextDark: {
    color: 'white',
    fontSize: 20
  },
  buttonText: {
    fontSize: 18
  }
});

export default ChangePassword;