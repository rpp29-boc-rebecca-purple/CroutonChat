
import React, {useState, useEffect} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View , Text} from "react-native";
// import SearchableDropdown from 'react-native-searchable-dropdown';
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








// <SearchableDropdown
// onChangeText={onChangeSearch}
// onItemSelect={(item) => {
//   props.searchFriend(searchEmail)
//   props.searchFriend(item.email)}}
// containerStyle={{padding: 5}}
// itemStyle={{
//   padding: 10,
//   marginTop: 2,
//   backgroundColor: 'white',
//   borderColor: 'white',
//   borderWidth: 1,
//   borderRadius: 5,
// }}
// itemTextStyle={{color: 'black'}}
// itemsContainerStyle={{height: 220}}
// items={data}
// resetValue={false}
// textInputProps={{
//   placeholder: 'Placeholder',
//   underlineColorAndroid: 'transparent',
//   style: {
//     padding: 12,
//     borderWidth: 1,
//     backgroundColor: 'white',
//     borderColor: 'red',
//     borderRadius: 10,
//   },
// }}
// listProps={{
//   nestedScrollEnabled: true,
// }}
// />


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
