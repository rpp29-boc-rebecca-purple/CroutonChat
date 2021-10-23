
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import data from '../data/data.js'


function Friends(prop) {
  return (

<ScrollView>
      <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{data.slice(0, 6).map((e, index) => {
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
      flexDirection: 'row',
      width: Dimensions.get('window').width,
      height: 130,
      marginTop: 20,
      left: 15,
      top: 14,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    },
  box: {
    flex: 1,
    width: 300,
    height:444,
    padding: 5,
  },
  username: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 55,
    fontSize: 20,
    flex: 1,
    left: 5
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 55,
    marginBottom: 11,
  }
});

export default Friends
