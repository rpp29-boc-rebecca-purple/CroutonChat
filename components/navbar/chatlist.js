import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import SearchBarMessages from '../navbar/searchBarMessages'
import Conversation from '../conversation/conversation.js';
import axios from 'axios'
//delete after fake data
import data from '../../data/data'
function ChatList({ userID, friendsList, isDarkTheme }) {
  //hard coded delete after hookup
  const [userData, setUserData] = useState(data);
  const [userId, setUserId] = useState(userID);
  const [userFound, setUserFound] = useState(false)
  const [list, setList] = useState(friendsList)
  const [found, setFound] = useState('')
  const [chatId, setChatId] = useState(0);
  const [conversation, setConversation] = useState(false);
  const [timer, setTimer] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState({});
  useEffect( () => {
    (() => {
      setTimeout(function() {
        setTimer(true)
      }, 1500);
    })()
    findMessagesPhotos(userID)
    newList(found)
}, [userFound, timer, conversation]);
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
    findMessagesPhotos(userId)
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
          if (list[id].friend_id == data[key].uid2 || list[id].friend_id == data[key].uid1) {

            if (list[id].lastsenderid == userId) {
              list[id].unread = 'hi'
              list[id].unread = 0;
              list[id].photounread = data[key].unreadphoto;
              list[id].userId = list[id].friend_id == data[key].uid2 ? data[key].uid1 : data[key].uid2;
              list[id].chatId = data[key].chatid;
              list[id].lastsenderid = data[key].lastsenderid;
            } else {
              list[id].unread = data[key].unread;
              list[id].photounread = data[key].unreadphoto;
              list[id].userId = list[id].friend_id == data[key].uid2 ? data[key].uid1 : data[key].uid2;
              list[id].chatId = data[key].chatid;
              list[id].lastsenderid = data[key].lastsenderid;
            }
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
    <Conversation
      userId={userId}
      friendInfo={selectedFriend}
      chatId={chatId}
      handleBackButtonPress={backButtonHandler}
      style={styles.conversation}
    />
  )
  :
  (
    <ScrollView>
      <SearchBarMessages searchUsers={searchUsers}/>
          <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{list ? list.map((e) => {
            return <Text chatId={0} chatLsitEntryUserId={userData.uid} onPress={(event) => {
              let reTypedE = {
                chatId: Number(e.chatId),
                userId: Number(e.userId),
                friendId: Number(e.friend_id),
                friendFirstName: e.first_name,
                friendLastName: e.last_name,
                friendAvatar: e.thumbnail
              };
              setChatId(reTypedE.chatId);
              setUserId(Number(userID));
              setSelectedFriend(reTypedE);
              setConversation(true);
              setList(e.photounread = false)
            }}
            key={e.friend_id} style={styles.container}>
              <View>
              <Image
                style={styles.images}
                source={{
                  uri: e.thumbnail_url || 'https://i.pinimg.com/550x/91/5d/82/915d8216347ab93d1e47714b0ea989de.jpg'
                }} />
              </View>
              <View style={isDarkTheme ? styles.borderDark : styles.border}>
              <Text style={isDarkTheme ? styles.usernameDark : styles.username}> {e.first_name}</Text>
              <Text style={isDarkTheme ? styles.unreadDark : styles.unread}>
              {e.unread < 1 || e.lastsenderid == userId || e.unread === undefined ? '' :`Woofs (${e.unread}) 🐕`}
              {' '}{' '}
              {e.photounread && e.lastsenderid != userId ? '📷' : ''}
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
          height: 65,
          left: 15,
        },
      username: {
        color: 'black',
        fontWeight: '700',
        marginTop: 3,
        fontSize: 16,
        flex: 1,
        top: 20,
        left: 8,
        bottom: -18,
        width: 270,
      },
      usernameDark: {
        color: 'white',
        fontWeight: '700',
        marginTop: 3,
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
        color: 'grey'
      },
      border: {
        paddingBottom: 2,
        borderBottomColor: 'black',
        borderBottomWidth: .3,
      },
      borderDark: {
        paddingBottom: 2,
        borderBottomColor: 'white',
        borderBottomWidth: .3,
      },
      conversation: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
      }
    });

export default ChatList