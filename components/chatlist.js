import React, {useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import SearchBarMessages from './searchBarMessages'
import { useNavigation } from '@react-navigation/native';
import Conversation from './conversation/conversation.js';

function ChatList({ currentUser, data }) {
  const userId = currentUser;
  const [friendId, setFriendId] = useState(4);
  const [chatId, setChatId] = useState(0);
  const [userData, setUserData] = useState(data);
  const [conversation, setConversation] = useState(false);
  const navigation = useNavigation();

  const searchMessages = (name) => {
    data.map(e => {
      if (e.email.toLowerCase() === name.toLowerCase()) {
      navigation.navigate('Profile', { email: e.email})
      console.log(`you clicked on user:  ${e.email}`)
      }
    })
  };

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
                <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{userData.map((e) => {

                  return <Text chatId={0} chatLsitEntryUserId={userData.uid} onPress={(event) => {
                    // set friendId
                    // set chatId
                    setConversation(true);
                  }}

                  key={e.key} style={styles.container}>
                    <View>
                    <Image style={styles.images} source={e.photo}/>
                    </View>
                    <View style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: 1,
                        }}>
                    <Text style={styles.username}> {e.name}</Text>
                    <Text style={styles.unread}> {e.messages.length ? e.messages.length + ' new messages' : 'no new messages'} {e.photomessages.length > 0 ?  ' 📸' : ''}  </Text>
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

