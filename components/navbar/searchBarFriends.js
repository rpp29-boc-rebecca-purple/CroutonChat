import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View} from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

function SearchBarFriends( {setFriendProfileView, setClickedFriendId}) {

  const [searchEmail, setSearchEmail] = useState('');
  const navigation = useNavigation(false);

 const searchFriend = async () => {
  await axios.get(`http://18.219.200.72:8080/searchFriend?email=${searchEmail.toLowerCase()}`)
  .then((res) => {
    if (res.status === 400) {
      alert('user does not exist')
    } else if ( res.status === 200) {
      let data = res.data[0];
      setClickedFriendId(data.user_id);
      setFriendProfileView(true);
      navigation.navigate('Profile', {});
      console.log(`User ${searchEmail} has been found`)
      setSearchEmail('');
    }
  })
  .catch(err => console.log(err))
 }

  const onChangeSearch = (q) => {
    setSearchEmail(q);
  }

  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchbar}
      placeholder="Search for friends"
      onChangeText={onChangeSearch}
      onSubmitEditing = {() => searchFriend(searchEmail)}
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