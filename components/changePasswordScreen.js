import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChangePassword = (props) => {
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
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.inputPrompt}>Confirm New Password:</Text>
            <TextInput
            style={{marginRight:0}}
            placeholder='new password'
            style={styles.input}
            />
          </View>
        </View>
      {/* back button and confirm button */}
      <View style={styles.changePasswordButtonsWrapper}>
        <View style={styles.changePasswordButtons}>
          <TouchableOpacity onPress={()=> props.changePassModalToggle()}>
            <Text>Back</Text>
          </TouchableOpacity>
            </View>
          <View style={styles.changePasswordButtons}>
          <TouchableOpacity onPress={()=> alert('password changed')}>
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
   height: 20,
   marginTop: 5,
   textAlign: 'center'
  },
  inputPrompt: {
    textAlign: 'center',
    marginTop: 10
  }
});

export default ChangePassword;