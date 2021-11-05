import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useNavigation } from '@react-navigation/native';
import SearchBarFriends from './searchBarFriends.js'
//import { globalStyles } from '../styles/global.js'

function Friends( { route, data, isDarkTheme } ) {

  const [userData, setUserData] = useState(data);
  const [friendSearch, setFriendSearch] = useState('')
  const navigation = useNavigation(false);

 const searchFriend = (searchedEmail) => {
  userData.map(e => {
    if (e.email.toLowerCase() === searchedEmail.toLowerCase()) {
    setFriendSearch(e.email)
    navigation.navigate('Profile', { email: e.email})
    console.log(`you searched user:  ${e.email}`)
    }
  })
}

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <ScrollView>
      <SearchBarFriends searchFriend={searchFriend} userData={userData}/>
            <View  style={styles.main}>{userData.map((e) => {
              return <Text onPress={() => {
                navigation.navigate('Profile', { email: e.email})
                console.log(`you clicked on user:  ${e.email}`)
              }} key={e.key} style={styles.container}  key={e.key} style={styles.container}>
                <View >
                <Image style={styles.images} source={e.photo}/>
                </View>
                <View style={isDarkTheme ? styles.borderDark : styles.border}>
                <Text style={isDarkTheme ? styles.usernameDark : styles.username}> {e.name}</Text>
                <Text style={isDarkTheme ? styles.friendsonlineDark : styles.friendsonline}> {e.friends} friends online</Text>
                </View>
              </Text>
            })}
          </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
        main: {
          flexDirection: 'column',
          flex: 1,
          alignItems: 'flex-start'
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
      usernameDark: {
        color: 'white',
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
      friendsonline: {
        fontSize: 14,
        left: 20,
        bottom: 16
      },
      friendsonlineDark: {
        fontSize: 14,
        left: 20,
        bottom: 16,
        color: 'white'
      },
      show: {
        color: 'green'
      },
      hide: {
        color: 'red'
      },
      border: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      },
      borderDark: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
      }
    });

export default Friends