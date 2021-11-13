import React, {useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableWithoutFeedback, Keyboard} from "react-native";
import { useNavigation } from '@react-navigation/native';
import SearchBarFriends from './searchBarFriends.js'

function Friends( { friendsList, email, isDarkTheme, setFriendProfileView, setClickedFriendId } ) {

  const [userEmail] = useState(email)
  const navigation = useNavigation(false);
  const [list, setList] = useState(friendsList)

  return list.length !== 0 ? (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <ScrollView>
        <SearchBarFriends
         loggedinEmail={userEmail}
         setFriendProfileView={setFriendProfileView}
         setClickedFriendId={setClickedFriendId} />
            <View style={styles.main}>{friendsList.map((e) => {
              return <Text onPress={() => {
                navigation.navigate('Profile', { info: e});
                setClickedFriendId(e.friend_id);
                setFriendProfileView(true);
              }} key={e.key} style={styles.container}>
                <View >
                <Image style={styles.images}  source={e.thumbnail ? e.thumbnail : require('../../data/photos/thumbnaillogo.png')} />
                </View>
                <View style={isDarkTheme ? styles.borderDark : styles.border}>
                <Text style={isDarkTheme ? styles.usernameDark : styles.username}> {e.first_name}</Text>
                <Text style={isDarkTheme ? styles.friendsonlineDark : styles.friendsonline}> {e.following_count} following  ✦✧ {e.follower_count} followers  </Text>
                </View>
              </Text>
            })}
          </View>
      </ScrollView>
    </TouchableWithoutFeedback>
        )
        :
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <ScrollView>
          <SearchBarFriends loggedinEmail={userEmail} />
              <View style={styles.container}>
            <Text style={styles.addfriends}> Add some Furry Friends 🐕 </Text>
            </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          width: Dimensions.get('window').width,
          flexDirection: 'column',
          height: 100,
          marginTop: -20,
          left: 15,
        },
        main: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'flex-start'
        },
        addfriends: {
          fontSize: 30,
          bottom: -40
        },
        username: {
          color: 'black',
          fontWeight: '500',
          marginTop: 38,
          fontSize: 16,
          flex: 1,
          top: 20,
          left: 8,
          bottom: -18,
          width: 270,
        },
      images: {
        width: 50,
        height: 50,
        top: 5,
        borderWidth: .5,
        borderRadius: 55,
        marginBottom: 11
      },
      friendsonline: {
        fontSize: 14,
        left: 8,
        bottom: 2
      },
      friendsonlineDark: {
        fontSize: 14,
        left: 8,
        bottom: 2,
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
        borderBottomWidth: .3,
      },
      borderDark: {
        borderBottomColor: 'white',
        borderBottomWidth: .3,
      }
    });

export default Friends