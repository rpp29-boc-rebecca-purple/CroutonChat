import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LogoutModal = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.textWrap}>
        <Text style={styles.text}>Are you sure you want to log out?</Text>
      </View>
      <View style={styles.logoutModalButtonsWrapper}>
        <View style={[styles.logoutModalButtons]}>
          <TouchableOpacity onPress={()=> props.logoutModalToggle()}>
            <Text>Back</Text>
          </TouchableOpacity>
            </View>
          <View style={styles.logoutModalButtons}>
          <TouchableOpacity onPress={()=> alert('logged out')}>
              <Text>Log Out</Text>
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
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15
  },
  logoutModalButtonsWrapper: {
    flexDirection: 'row',
    height: 100,
    marginTop: 150
  },
  logoutModalButtons: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 20,
    borderRightWidth: 1
  }
});

export default LogoutModal;