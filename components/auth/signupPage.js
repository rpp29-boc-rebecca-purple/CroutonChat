import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import OAuth from './oauth';
import axios from 'axios';

function LoginPage(props) {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [username, setUsername] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [errorText, setErrorText] = useState('');

  return (
    <View style={props.isDarkTheme ? styles.containerDark : styles.container}>
      <View style={styles.logo}>
        <Text>LOGO</Text>
      </View>
      <TextInput style={props.isDarkTheme ? styles.textInputDark : styles.textInput} placeholderTextColor={props.isDarkTheme ? 'white' : null} placeholder="First Name" onChangeText={text => setFirstName(text)} autoCapitalize="none" autoCorrect={false} textContentType="givenName" />
      <TextInput style={props.isDarkTheme ? styles.textInputDark : styles.textInput} placeholderTextColor={props.isDarkTheme ? 'white' : null} placeholder="Last Name" onChangeText={text => setLastName(text)} autoCapitalize="none" autoCorrect={false} textContentType="familyName" />
      <TextInput style={props.isDarkTheme ? styles.textInputDark : styles.textInput} placeholderTextColor={props.isDarkTheme ? 'white' : null} placeholder="Username" onChangeText={text => setUsername(text)} autoCapitalize="none" autoCorrect={false} textContentType="username" />
      <TextInput style={props.isDarkTheme ? styles.textInputDark : styles.textInput} placeholderTextColor={props.isDarkTheme ? 'white' : null} placeholder="Email" onChangeText={text => setEmail(text)} autoCapitalize="none" autoCorrect={false} textContentType="emailAddress" />
      <TextInput
        style={props.isDarkTheme ? styles.textInputDark : styles.textInput}
        placeholderTextColor={props.isDarkTheme ? 'white' : null}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
        secureTextEntry={true}
      />
      <Text style={styles.error}>{errorText}</Text>

      <TouchableOpacity
        onPress={() => {
          axios
            .post('http://18.191.220.233/register', { email, password, username, first_name: firstName, last_name: lastName })
            .then(async response => {
              setErrorText('');
              props.setLoggedIn(true);
              props.setUserId(response.data.userId);
              AsyncStorage.setItem('user', JSON.stringify(response.data));
            })
            .catch(err => {
              if (err.toString().indexOf('409') > 0) {
                setErrorText('An account is already registered with this email.');
              } else {
                setErrorText(err.toString());
              }
            });
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.horizontal}>
        <Text style={props.isDarkTheme ? styles.horizontalRuleDark : styles.horizontalRule}>-------------------------------------</Text>
        <Text style={props.isDarkTheme ? styles.textStyleDark : null}> OR </Text>
        <Text style={props.isDarkTheme ? styles.horizontalRuleDark : styles.horizontalRule}>-------------------------------------</Text>
      </View>

      <OAuth setLoggedIn={props.setLoggedIn} />

      <TouchableOpacity
        onPress={() => {
          props.setAuthPage('login');
        }}
        style={styles.button}
      >
        <Text style={props.isDarkTheme ? styles.buttonTextDark : styles.buttonText}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
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
    backgroundColor: 'grey',
    padding: 10,
    width: 275,
    margin: 10,
    borderRadius: 8,
  },
  mainButtonText: {
    color: 'white',
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
    color: 'white'
  },
  container: {
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: 'lightgrey',
    padding: 10,
    margin: 8,
    borderRadius: 5,
  },
  textInputDark: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    margin: 8,
    borderRadius: 5,
    color: 'white'
  },
  logo: {
    borderRadius: 75,
    width: 75,
    maxHeight: 75,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey',
    margin: 50,
  },
  textStyleDark: {
    color: 'white'
  }
});

export default LoginPage;
