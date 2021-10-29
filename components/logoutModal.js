import React from 'react';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

const LogoutModal = (props) => {
  return (
    <SafeAreaView>
      <View style={styles.textWrap}>
        <Text style={styles.text}>Are you sure you want to log out?</Text>
      </View>
      <View style={styles.profileButtonsWrapper}>
            <View style={[styles.profileButton]}>

          <TouchableRipple>
            <Text onPress={()=> props.logoutModalToggle()}>Back</Text>
          </TouchableRipple>
            </View>
          <View style={styles.profileButton}>
          <TouchableRipple onPress={()=>{}}>
              <Text onPress={()=> alert('logged out')}>Log Out</Text>
          </TouchableRipple>
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
  profileButtonsWrapper: {
    flexDirection: 'row',
    height: 100,
    marginTop: 150
  },
  profileButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LogoutModal;