
import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";



function Friends(prop) {

  return (
    <View style={styles.container}>
      <Button onPress={() => {}}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Friends
