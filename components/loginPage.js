import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import OAuth from './oauth';

function LoginPage(props) {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text>LOGO</Text>
      </View>
      <TextInput style={styles.textInput} placeholder="Email" onChangeText={text => setEmail(text)} />
      <TextInput style={styles.textInput} placeholder="Password" onChangeText={text => setEmail(text)} />

      <TouchableOpacity
        onPress={() => {
          // go to sign up page
        }}
        style={styles.mainButton}
      >
        <Text style={styles.mainButtonText}>Log in</Text>
      </TouchableOpacity>

      <View style={styles.horizontal}>
        <Text style={styles.horizontalRule}>-------------------------------------</Text><Text>   OR   </Text><Text style={styles.horizontalRule}>-------------------------------------</Text>
      </View>

      <OAuth />

      <TouchableOpacity
        onPress={() => {
          // go to sign up page
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    maxHeight: 30
  },
  horizontalRule: {
    letterSpacing: -2,
    margin: 0,
    padding: 0
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
  container: {
    paddingHorizontal: 25,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    margin: 8,
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
});

export default LoginPage;
