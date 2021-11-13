import React, { useState } from 'react';
import { StyleSheet, Image, TextInput, View, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import OAuth from './oauth';
import axios from 'axios';

function LoginPage(props) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errorText, setErrorText] = useState('');

  return (

    <View style={props.isDarkTheme ? styles.containerDark : styles.container}>
      <Image source={props.isDarkTheme ? require('../../assets/croutonchat4.png') : require('../../assets/CCchat3.png')} style={styles.logo} />
      {/* <View style={styles.logo}>
      </View> */}
      <TextInput style={props.isDarkTheme? styles.textInputDark : styles.textInput} placeholderTextColor={props.isDarkTheme ? 'white' : null} placeholder="Email" onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} textContentType="emailAddress" />
      <TextInput style={props.isDarkTheme? styles.textInputDark : styles.textInput} placeholderTextColor={props.isDarkTheme ? 'white' : null} placeholder="Password" onChangeText={text => setPassword(text)} autoCapitalize="none" autoCorrect={false} textContentType="password" secureTextEntry={true} />
      <Text style={styles.error}>{errorText}</Text>

      <TouchableOpacity
        onPress={() => {
          axios
            .post('http://18.191.220.233/login', { email, password })
            .then(async response => {
              setErrorText('');
              await AsyncStorage.setItem('user', JSON.stringify(response.data));
              props.setLoggedIn(true);
              props.setUserId(response.data.userId);
              props.setUserEmail(response.data.email);
            })
            .catch(err => {
              if (err.toString().indexOf('401') > 0 || err.toString().indexOf('400') > 0) {
                setErrorText('Invalid email or password.');
              } else {
                setErrorText(err.toString());
              }
            });
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.horizontal}>
        <Text style={props.isDarkTheme ? styles.horizontalRuleDark : styles.horizontalRule}>-------------------------------------</Text>
        <Text style={props.isDarkTheme ? styles.textStyleDark : null}> OR </Text>
        <Text style={props.isDarkTheme ? styles.horizontalRuleDark : styles.horizontalRule}>-------------------------------------</Text>
      </View>

      <OAuth setLoggedIn={props.setLoggedIn} />

      <TouchableOpacity
        onPress={() => {
          props.setAuthPage('signup');
        }}
        style={styles.button}
      >
        <Text style={props.isDarkTheme ? styles.buttonTextDark : styles.buttonText}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'black',
    fontWeight: 'bold',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    maxHeight: 30,
  },
  horizontalRule: {
    letterSpacing: -2,
    margin: 0,
    padding: 0,
  },
  horizontalRuleDark: {
    letterSpacing: -2,
    margin: 0,
    padding: 0,
    color: 'white'
  },
  mainButton: {
    backgroundColor: '#EBD687',
    padding: 10,
    width: 275,
    margin: 10,
    borderRadius: 8,
  },
  mainButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  button: {
    margin: 10,
  },
  buttonText: {
    fontSize: 12,
  },
  buttonTextDark: {
    fontSize: 12,
    color: 'black'
  },
  container: {
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7bc8e9'
  },
  containerDark: {
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#EBD687',
    padding: 10,
    margin: 8,
    borderRadius: 5,
    color: 'black'
  },
  textInputDark: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#EBD687',
    padding: 10,
    margin: 8,
    borderRadius: 5,
    color: 'white',
  },
  logo: {
    borderRadius: 75,
    width: 250,
    maxHeight: 250,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    resizeMode: 'contain'
  },
  textStyleDark: {
    color: 'white'
  }
});

export default LoginPage;
