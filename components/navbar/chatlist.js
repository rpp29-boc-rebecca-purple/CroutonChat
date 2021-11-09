import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import SearchBarMessages from '../navbar/searchBarMessages'
import { useNavigation } from '@react-navigation/native';
import Conversation from '../conversation/conversation.js';

//delete after fake data
import data from '../../data/data'


function ChatList({ currentUser, friendsList, isDarkTheme }) {


  //hard coded delete after hookup
  const [userData, setUserData] = useState(data);
  const userId = currentUser;

  const [userFound, setUserFound] = useState(false)
  const [allFriends, setAllFriends] = useState('')
  const [list, setList] = useState('')
  const [found, setFound] = useState('')
  const [friendId, setFriendId] = useState(4);
  const [chatId, setChatId] = useState(0);
  const [conversation, setConversation] = useState(false);
  const navigation = useNavigation();

  useEffect( () => {
    newList(found)
}, [userFound]);


  const searchMessages = (name) => {
    let found = []
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
  };

  const newList = (array) => {
      if (userFound) {
        setList(array)
      } else {
        setList(friendsList)
      }
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
            <SearchBarMessages searchMessages={searchMessages} userData={userData}/>
                <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{list ? list.map((e) => {

                  return <Text chatId={0} chatLsitEntryUserId={userData.uid} onPress={(event) => {
                    // set friendId
                    // set chatId
                    setConversation(true);
                  }}

                  key={e.key} style={styles.container}>
                    <View>
                    <Image style={styles.images} source={e.thumbnail ? e.thumbnail : require('../../data/photos/thumbnaillogo.png')} />
                    </View>
                    <View style={isDarkTheme ? styles.borderDark : styles.border}>
                    <Text style={isDarkTheme ? styles.usernameDark : styles.username}> {e.first_name}</Text>
                    {/* <Text style={isDarkTheme ? styles.unreadDark : styles.unread}> {e.messages.length ? e.messages.length + ' new messages' : 'no new messages'} {e.photomessages.length > 0 ?  ' 📸' : ''}  </Text> */}
                    </View>

                  </Text>
                }) : null }
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
      unread: {
        fontSize: 14,
        left: 20,
        bottom: 16
      },
      unreadDark: {
        fontSize: 14,
        left: 20,
        bottom: 16,
        color: 'white'
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

export default ChatList









// <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>
// {/* <Text chatId={0} chatLsitEntryUserId={userData.uid} onPress={(event) => {
//     // set friendId
//     // set chatId
//     setConversation(true);
//   }}
//  style={styles.container}> */}

//     <View>
//     {/* <Image style={styles.images}  source={thumbnail[0] ? thumbnail[0] : require('../../data/photos/tester.png')} /> */}
//     </View>
//     <View style={isDarkTheme ? styles.borderDark : styles.border}>
//     <Text style={isDarkTheme ? styles.usernameDark : styles.username}>
//       {setSearchedChat.first_name}
//     </Text>
//     </View>
//   {/* </Text> */}
// })
// </View>
