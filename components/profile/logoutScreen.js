import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LogoutScreen = ({setLogoutModalToggle, isDarkTheme, setLoggedIn, cleanProfileState}) => {
  return (
    <SafeAreaView>
      <View style={styles.textWrap}>
        <Text style={isDarkTheme ? styles.textDark : styles.text}>Are you sure you want to log out?</Text>
      </View>
      <View style={styles.logoutModalButtonsWrapper}>
        <View style={isDarkTheme ? styles.logoutModalButtonsDark : styles.logoutModalButtons}>
          <TouchableOpacity onPress={()=> setLogoutModalToggle(false)}>
            <Text style={isDarkTheme ? styles.buttonTextDark : null}>Back</Text>
          </TouchableOpacity>
            </View>
          <View style={isDarkTheme ? styles.logoutModalButtonsDark : styles.logoutModalButtons}>
          <TouchableOpacity onPress={()=> {setLoggedIn(false); cleanProfileState();}}>
              <Text style={isDarkTheme ? styles.buttonTextDark : null}>Log Out</Text>
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
    borderRightWidth: 1,
  },
  logoutModalButtonsDark: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontSize: 20,
    borderRightWidth: 1,
    backgroundColor: 'black',
  },
  buttonTextDark: {
    color: 'white'
  }
});

export default LogoutScreen;