import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LogoutScreen = ({logoutModalToggle, isDarkTheme, setLoggedIn}) => {
  return (
    <SafeAreaView>
      <View style={styles.textWrap}>
        <Text style={isDarkTheme ? styles.textDark : styles.text}>Are you sure you want to log out?</Text>
      </View>
      <View style={styles.logoutModalButtonsWrapper}>
        <View style={isDarkTheme ? styles.logoutModalButtonsDark : styles.logoutModalButtons}>
          <TouchableOpacity onPress={()=> logoutModalToggle()}>
            <Text style={isDarkTheme ? styles.buttonTextDark : styles.buttonText }>Back</Text>
          </TouchableOpacity>
            </View>
          <View style={isDarkTheme ? styles.logoutModalButtonsDark : styles.logoutModalButtons}>
          <TouchableOpacity onPress={()=> setLoggedIn(false)}>
              <Text style={isDarkTheme ? styles.buttonTextDark : styles.buttonText }>Log Out</Text>
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
    height: 70,
    marginTop: 50
  },
  logoutModalButtons: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontSize: 20,
    borderRightWidth: 1,
    borderRadius: 50,
    borderWidth: 1,
    margin: 7,
  },
  logoutModalButtonsDark: {
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
  buttonTextDark: {
    color: 'white',
    fontSize: 20
  },
  buttonText: {
    fontSize: 20
  }
});

export default LogoutScreen;