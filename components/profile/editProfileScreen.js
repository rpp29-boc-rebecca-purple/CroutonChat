import React, {useState} from 'react';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
  TextInput
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { editProfileInfo } from '../../HelperFuncs/profileApi';


const EditProfile = ({fakeUser, editProfile, isDarkTheme}) => {
  const [name, setName] = useState(fakeUser.first_name);
  const [lastName, setLastName] = useState(fakeUser.last_name);
  const [age, setAge] = useState(fakeUser.age);
  const [favoriteSnack, setFavoriteSnack] = useState(fakeUser.snack);
  const [animalType, setAnimalType] = useState(fakeUser.animal_type);

  const sendChanges = () => {
    let curState = {
      'first_name': name,
      'last_name': lastName,
      'age': age,
      'snack': favoriteSnack,
      'animal_type': animalType
    }
    editProfileInfo(curState);
  }

    return (
      <SafeAreaView style={styles.container}>

        {/* profile pic, name, and snack tag */}
        <View style={styles.userInfoSection}>
          <ImageBackground
          source={isDarkTheme ? require('../../assets/BOC.nightskymoon.jpeg') : require('../../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400, height: 250}}>

            {/* back button */}
            <View>
              <TouchableOpacity onPress={()=> editProfile()}>
                <Text style={isDarkTheme ? styles.backButtonDark : styles.backButton}
                >  &#x2190;</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 35}}>
              <Avatar.Image
                source={{
                  uri: 'https://i.imgur.com/ckCX9Xc.jpg'
                }}
                size={100}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>{name}</Title>
                <Caption style={styles.caption}>Loves snacking on {favoriteSnack}</Caption>
              </View>
            </View>
            </ImageBackground>
        </View>

        {/* user info textinput section */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.textStyleDark :styles.textStyle}>First Name:          </Text>
            <TextInput
            placeholder={fakeUser.first_name}
            onChangeText={(val)=> setName(val)}
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.textStyleDark :styles.textStyle}>Last Name:          </Text>
            <TextInput
            placeholder={fakeUser.last_name}
            onChangeText={(val)=> setLastName(val)}
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.textStyleDark :styles.textStyle}>Age:                       </Text>
            <TextInput
            style={{marginRight:0}}
            placeholder={fakeUser.age}
            onChangeText={(val) => setAge(val)}
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.textStyleDark :styles.textStyle}>Species:               </Text>
            <TextInput
            placeholder={fakeUser.animal_type}
            onChangeText={(val) => setAnimalType(val)}
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.textStyleDark :styles.textStyle}>Favorite Snack:  </Text>
            <TextInput
            placeholder={fakeUser.snack}
            onChangeText={(val) => setFavoriteSnack(val)}
            style={styles.input}
            />
          </View>
        </View>

        {/* save changes button */}
        <TouchableRipple style={isDarkTheme ? styles.editProfileButtonsWrapperDark : styles.editProfileButtonsWrapper}>
              <Text
              style={isDarkTheme ? styles.editProfileButtonDark : styles.editProfileButton}
              onPress={()=> {editProfile(); sendChanges();}}>Save changes?</Text>
          </TouchableRipple>
      </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 20
  },
  editProfileButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 20,
    minWidth: 200,
    textAlign: 'center'
  },
  editProfileButtonsWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginTop: 20
  },
  editProfileButtonDark: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 20,
    minWidth: 200,
    textAlign: 'center',
    backgroundColor: 'black',
    color: 'white'
  },
  editProfileButtonsWrapperDark: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginTop: 20,

  },
   input: {
     borderWidth: 1,
     borderColor: '#777',
     padding: 8,
     margin: 0,
     width: 250,
    height: 20,
    marginTop: -5,
   },
  textStyle: {
    fontWeight: 'bold'
  },
  textStyleDark: {
    fontWeight: 'bold',
    color: 'white'
  },
  backButton: {
    fontSize: 35
  },
  backButtonDark: {
    fontSize: 35,
    color: 'white'
  }
});



export default EditProfile;