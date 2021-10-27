
import React, {useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import data from '../data/data.js'
import { useNavigation } from '@react-navigation/native';
//import { globalStyles } from '../styles/global.js'

function ChatList() {


  const [userData, setUserData] = useState(data);
  const navigation = useNavigation();


  // **********************
  //       TASK TO DO    //
  // **********************

  // fetch((endpoint of our API))
  //  -> expect to get name, unread count, email, profile pic
  // .then( set setUserData)
  // line 27-28 .then() change up the map function below to run
  //  through the updated data structure

  // Line 30-31 send nagivator to chat component (passing down user by email after   ....fetching api data and setting state first)
   // ********************


  return (
    <ScrollView>
          <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{userData.map((e) => {
            return <Text onPress={() => {
              navigation.navigate('Profile', { dogname: e.name})
              console.log(`you clicked on user:  ${e.name}`)
            }} key={e.key} style={styles.container}>
              <View>
              <Image style={styles.images} source={e.photo}/>
              </View>
              <View style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  }}>
              <Text style={styles.username}> {e.name}</Text>
              <Text style={styles.unread}> {e.messages.length ? e.messages.length + ' new messages' : 'no new messages'}   </Text>
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
          top: 15
        },
      username: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 38,
        fontSize: 20,
        flex: 1,
        left: 15,
        width: 270,
      },
      images: {
        width: 75,
        height: 75,
        borderWidth: .5,
        borderRadius: 55,
        marginBottom: 11,
      },
      unread: {
        fontSize: 14,
        left: 20,
        bottom: 16
      }
    });

export default ChatList