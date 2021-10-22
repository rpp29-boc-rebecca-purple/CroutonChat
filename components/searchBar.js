
import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

function SearchBar(prop) {

  const [searchTerm, setSearchTerm] = useState('');

  const onChangeSearch = q => {
    setSearchTerm(q);
  }

  return (
    <View style={styles.container}>
      <Searchbar style={styles.searchbar}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchTerm}/>
    </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    marginTop: 25,
  },
  searchbar: {
    width: 377,
    borderWidth: 1
  }
});

export default SearchBar
