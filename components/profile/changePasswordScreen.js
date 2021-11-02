import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import editPass from '../../HelperFuncs/profileApi.js';

const ChangePassword = ({changePassModalToggle}) => {
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
        <Text style={styles.text}>Please enter new password below:</Text>
      </View>
      <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text style={styles.inputPrompt}>Enter New Password: </Text>
            <TextInput
            placeholder='new password'
            onChangeText={(val)=> setNewPass(val)}
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.inputPrompt}>Confirm New Password:</Text>
            <TextInput
            style={{marginRight:0}}
            placeholder='new password'
            onChangeText={(val)=> setNewPassConf(val)}
            style={styles.input}
            />
          </View>
        </View>

      {/* back button and confirm button */}
      <View style={styles.changePasswordButtonsWrapper}>
        <View style={styles.changePasswordButtons}>
          <TouchableOpacity onPress={()=> changePassModalToggle()}>
            <Text>Back</Text>
          </TouchableOpacity>
            </View>
          <View style={styles.changePasswordButtons}>
          <TouchableOpacity onPress={()=> {validatePword(newPass, newPassConf); alert('password changed')}}>
              <Text>Confirm</Text>
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
  textWrap: {
    alignItems: 'center',
    marginBottom: 25,
  },
  changePasswordButtonsWrapper: {
    flexDirection: 'row',
    height: 100,
    marginTop: 150
  },
  changePasswordButtons: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 20,
    borderRightWidth: 1
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
   textAlign: 'center'
  },
  inputPrompt: {
    textAlign: 'center',
    marginTop: 10
  }
});

export default ChangePassword;