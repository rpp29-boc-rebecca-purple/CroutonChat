
import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View } from "react-native";
//import { globalStyles } from '../styles/global.js'

function SearchBarFriends(prop) {

  const [searchEmail, setSearchEmail] = useState('');

  const onChangeSearch = q => {
    setSearchEmail(q);
  }



   // **********************
  //       TASK TO DO    //
  // **********************

  // fetch (<server endpoint>) using email and if they are in database after hitting return it will send you to the user profile with a add button to friends

  /*
  fetch('send databse the searchTerm state and see if it matches endpont here)
  .then(data, err) => {
    if (err) {
      user does not exist
    }
    send user to the profile that corralates with the email found with a ADD friend btn
  }
  */
   // ********************


  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchbar}
      placeholder="Search for friends"
      onChangeText={onChangeSearch}
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
