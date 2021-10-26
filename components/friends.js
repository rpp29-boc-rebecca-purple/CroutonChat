
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import data from '../data/data.js'


function Friends(prop) {
  return (

<ScrollView>
      <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{data.map((e, index) => {
        return <Text style={styles.container}>
                <View>
                <Image style={styles.images} source={e.photo} key={index}/>
                </View>
                <View>
                <Text style={styles.username}> {e.name} </Text>
                </View>
              </Text>
      })}
    </View>
</ScrollView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      height: 100,
      marginTop: 11,
      marginBottom: 1,
      left: 15,
      top: 15,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    },
  username: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 38,
    fontSize: 20,
    flex: 1,
    left: 15
  },
  images: {
    width: 75,
    height: 75,
    borderWidth: .5,
    borderRadius: 55,
    marginBottom: 11,
  }
});

export default Friends
