
import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from "react-native";
//import { globalStyles } from '../styles/global.js'c

function SearchBarMessages(prop) {

  const [searchMessages, setSearchMessages] = useState('');

  const onChangeSearch = q => {
    setSearchMessages(q);
  }

  // **********************
  //       TASK TO DO    //
  // **********************

  // search the friends by email and when its clicked I will make a send user to the chat componenet with the name/email passed down to identiy and pull up that users chat only.

  // search user ( search function will be in chatlist component and will do the lookup on the userData state, I will need to pass down search from chatList here so I can run the function on the search term here)

  // click user sends you to chat with the user name passed down as props

   // ********************

  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchbar}
      placeholder="Search for messages"
      onChangeText={onChangeSearch}
      value={searchMessages}/>
    </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  text: {
    fontSize: 15,
    marginTop: 25,
  },
  searchbar: {
    width: '100%',
    flex:1,
  }
});

export default SearchBarMessages
