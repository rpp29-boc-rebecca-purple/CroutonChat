
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

function HomePage() {

  return (
    <View style={styles.container}>

    <ImageBackground source={require('../assets/LandingPage.jpeg')} style={styles.image} >
      <Text style={styles.text}>Hello, Welcome to Landing Page</Text>
      </ImageBackground>
  </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    color: "white",
    fontSize: 25,
    lineHeight: 25,
    marginTop: 200,
    fontWeight: "bold",
    textAlign: "center",
  }
});


export default HomePage
