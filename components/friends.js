import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useNavigation } from '@react-navigation/native';
import SearchBarFriends from './searchBarFriends.js'
//import { globalStyles } from '../styles/global.js'

function Friends( { route, data } ) {

  const [listofusers, setListofusers] = useState('') // need to pass down all users
  const [friendSearch, setFriendSearch] = useState('')
  const navigation = useNavigation(false);

 const searchFriend = (searchedEmail) => {
  // calls on database to get every user that exist to map and match if they are found you can ad dthem
  fetch('http://18.219.200.72:8080/user')
  .then(response => setListofusers(response.json()))
  .then(data => console.log(data));

  // map thru the list of all users in database
  listofusers.map(e => {
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
      <SearchBarFriends searchFriend={searchFriend} listofusers={listofusers}/>
            <View  style={styles.main}>{friendlistdata.map((e) => {
              return <Text onPress={() => {
                navigation.navigate('Profile', { first_name: e.first_name})
                console.log(`you clicked on user:  ${e.first_name}`)
              }} key={e.key} style={styles.container}  key={e.key} style={styles.container}>
                <View >
                      {/* if no thumbnail photo selected will default logo pic */}
                <Image style={styles.images}  source={e.thumbnail ? e.thumbnail : require('../data/photos/tester.png')} />
                </View>
                <View style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    }}>
                <Text style={styles.username}> {e.first_name}</Text>
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