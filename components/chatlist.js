import React, {useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from "react-native";
import SearchBarMessages from './searchBarMessages'
import { useNavigation } from '@react-navigation/native';
import conversationMockData from '../data/conversationMockData'
import GiftChat from "./conversation/conversation.js"
//import { globalStyles } from '../styles/global.js'


function ChatList( { data }) {

  const navigation = useNavigation();
  const [userData, setUserData] = useState(data);
  const [conversations] = useState(conversationMockData)

  const [userClicked, setUserClicked] = useState('')
  const [messenger, setMessender] = useState(false)

 const searchMessages = (name) => {
  data.map(e => {
      if (e.email.toLowerCase() === name.toLowerCase()) {
      navigation.navigate('Profile', { email: e.email})
      console.log(`you clicked on user:  ${e.email}`)
      }
    })
  }

  return messenger ?
        (
          <ScrollView>
            <GiftChat email={userClicked} convodata={conversations}/>
          </ScrollView>
        )
        :
        (
          <ScrollView>
          <SearchBarMessages searchMessages={searchMessages} conversations= {conversations} userData={userData}/>
              <View  style={{ flexDirection: 'column', flex: 1,  alignItems: 'left' }}>{userData.map((e) => {
                return <Text onPress={() => {
                  setUserClicked(e.email)
                  setMessender(true)
                  console.log(`you clicked on user:  ${userClicked}, chat data ${conversations}`)
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

