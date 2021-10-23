
import React, {useState} from "react";
import { Searchbar } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from "react-native";

function SearchBar(prop) {


  //const { width, height } = Dimensions.get("window");
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

export default SearchBar
