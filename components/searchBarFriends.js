import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View} from "react-native";
//import { globalStyles } from '../styles/global.js'

function SearchBarFriends( props ) {

  const [searchEmail, setSearchEmail] = useState('');

  const onChangeSearch = (q) => {
    setSearchEmail(q);
  }

  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchbar}
      placeholder="Search for friends"
      onChangeText={onChangeSearch}
      onSubmitEditing = {() => props.searchFriend(searchEmail)}
      multiline={false}
      value={searchEmail}/>
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

export default SearchBarFriends