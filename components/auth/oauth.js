import React, { useEffect } from 'react';
import { StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const changeScreen = () => {};

function OAuth(props) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '1058454216082-014k0icvvopm51k53kplsj2gv50iop4c.apps.googleusercontent.com',
    iosClientId: '1058454216082-014k0icvvopm51k53kplsj2gv50iop4c.apps.googleusercontent.com',
    androidClientId: '1058454216082-014k0icvvopm51k53kplsj2gv50iop4c.apps.googleusercontent.com',
    webClientId: '1058454216082-014k0icvvopm51k53kplsj2gv50iop4c.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
    }

    if (response?.authentication) {
      axios
        .post('http://18.191.220.233/oauth/connect', { accessToken: response.authentication.accessToken })
        .then(() => {
          console.log('OK')
          props.setLoggedIn(true);
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    }
  }, [response]);

  return (
    <TouchableOpacity
      disabled={!request}
      onPress={() => {
        promptAsync();
      }}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1a74e9',
    padding: 10,
    width: 275,
    margin: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default OAuth;
