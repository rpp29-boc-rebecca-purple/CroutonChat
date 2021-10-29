import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useNavigation } from '@react-navigation/native';
import data from '../data/data.js'
import SearchBarFriends from './searchBarFriends.js'
//import { globalStyles } from '../styles/global.js'

function Friends( { props, route } ) {

  const [userData, setUserData] = useState(data);
  const [friendSearch, setFriendSearch] = useState('')
  // fetch to get all users that exist in database
  // const [allUsers, setAllUsers] = useState([{email: 'testuser1@gmail.com'}, {email: 'testuser2@gmail.com'}, {email: 'testuser3@gmail.com'}])

  const navigation = useNavigation(false);

  useEffect(() => {
    fetchUserData()
  })

  const fetchUserData = () => {
    setUserData(data)
      // fetch(/*http:<IP HERE>/searchFriends*/)
      // .then((data) => {
      //   setUserData(data)
      // })

    // setAllUsers() fnc to set all user that exist for friends search
 }

 const searchFriend = (searchedEmail) => {
  userData.map(e => {
    if (e.email.toLowerCase() === searchedEmail.toLowerCase()) {
    setFriendSearch(e.email)
    navigation.navigate('Profile', { email: e.email})
    console.log(`you clicked on user:  ${e.email}`)
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
                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    }}>
                <Text style={styles.username}> {e.name}</Text>
                <Text style={styles.friendsonline}> {e.friends} friends online</Text>
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
      show: {
        color: 'green'
      },
      hide: {
        color: 'red'
      }
    });

export default Friends