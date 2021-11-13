import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import SearchBarMessages from '../navbar/searchBarMessages'
import Conversation from '../conversation/conversation.js';
import axios from 'axios'

//delete after fake data
import data from '../../data/data'

function ChatList({ currentUser, userID, friendsList, isDarkTheme }) {

  //hard coded delete after hookup
  const [userData, setUserData] = useState(data);
  const userId = currentUser;

  const [userFound, setUserFound] = useState(false)
  const [list, setList] = useState(friendsList)
  const [found, setFound] = useState('')
  const [chatId, setChatId] = useState(0);
  const [conversation, setConversation] = useState(false);
  const [timer, setTimer] = useState(false)
  const [currentChat, setCurrentChat] = useState(userID)

  useEffect( () => {
    (() => {
      setTimeout(function() {
        setTimer(true)
      }, 1500);
    })()
    findMessagesPhotos(currentChat)
    newList(found)
}, [userFound, timer]);

  const searchUsers = (name) => {
    let found = []
    if (friendsList) {
    friendsList.map(e => {
      if (name.toLowerCase() === e.first_name.toLowerCase()) {
        found.push(e)
      }
      setFound(found)
      newList(found)
    })
    if (found.length === 1) {
      setUserFound(true)
    } else {
      setUserFound(false)
    }
  }
    findMessagesPhotos()
  };

  const newList = (array) => {
      if (userFound) {
        setList(array)
      } else {
        setList(friendsList)
      }
  }

  const findMessagesPhotos = (id) => {
    axios.get(`http://3.133.100.147:2550/chatlist?userId=${id}`)
      .then(function (response) {
      let data = response.data
      for (const key in data) {
        for (const id in list) {
          if (list[id].friend_id == data[key].uid2) {
            list[id].unread = data[key].unread
            list[id].photounread = data[key].unreadphoto
            list[id].userId = data[key].uid1
            list[id].chatId = data[key].chatid
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    })
    setList(list)
  }

  const backButtonHandler = () => {
    setConversation(false);
  };

   return conversation ?
        (
          <Conversation userId={0} friendId={1} chatId={1} handleBackButtonPress={backButtonHandler} style={{flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width}} />
        )
        :
        (
          <ScrollView>
            <SearchBarMessages searchUsers={searchUsers}/>
                <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{list ? list.map((e) => {
                  return <Text chatId={0} chatLsitEntryUserId={userData.uid} onPress={(event) => {
                    {setCurrentChat(e.friend_id)}
                    console.log('clicked', e)
                    // set friendId
                    // set chatId
                    setConversation(true);
                  }}
                  key={e.friend_id} style={styles.container}>
                    <View>
                    <Image style={styles.images} source={e.thumbnail ? e.thumbnail : require('../../data/photos/thumbnaillogo.png')} />
                    </View>
                    <View style={isDarkTheme ? styles.borderDark : styles.border}>
                    <Text style={isDarkTheme ? styles.usernameDark : styles.username}> {e.first_name}</Text>

                    <Text style={isDarkTheme ? styles.unreadDark : styles.unread}>
                    {e.unread > 0 ? e.unread + ' woofs 🐕   ✦✧ ' : ''}
                    {' '}{' '}
                    {e.photounread ? 'meows 📷 ' : ''}
                    </Text>
                    </View>
                  </Text>
                }) : <Text> Add some furry friends </Text> }
              </View>
          </ScrollView>
        )
      }

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          width: Dimensions.get('window').width,
          flexDirection: 'column',
          height: 100,
          marginTop: 5,
          marginBottom: -35,
          left: 15,
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
        marginBottom: 11,
      },
      unread: {
        fontSize: 14,
        left: 15,
        bottom: 2
      },
      unreadDark: {
        fontSize: 14,
        left: 15,
        bottom: 2,
        color: 'white'
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

export default ChatList