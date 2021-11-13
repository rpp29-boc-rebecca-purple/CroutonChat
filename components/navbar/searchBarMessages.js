import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from "react-native";
//import { globalStyles } from '../styles/global.js'c

function SearchBarMessages(props) {
  const [searchMessages, setSearchMessages] = useState('');

  const onChangeSearch = (q) => {
    setSearchMessages(q);
    props.searchUsers(q)
  }

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