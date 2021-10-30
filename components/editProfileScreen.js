import React from 'react';
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


const EditProfile = (props) => {
    return (
      <SafeAreaView style={styles.container}>

        {/* profile pic, name, and snack tag */}
        <View style={styles.userInfoSection}>
          <ImageBackground
          source={require('../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400}}>

            {/* back button */}
            <View style={styles.backButton}>
              <TouchableOpacity onPress={()=> props.editProfile()}>
                <Text style={{fontSize: 35}}
                >&#x2190;</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginTop: 75}}>
              <Avatar.Image
                source={{
                  uri: 'https://i.imgur.com/ckCX9Xc.jpg'
                }}
                size={100}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>Ladypants</Title>
                <Caption style={styles.caption}>Loves snacking on roast turkey sandwhiches</Caption>
              </View>
            </View>
            </ImageBackground>
        </View>

        {/* user info textinput section */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text>Name:                 </Text>
            <TextInput
            placeholder='Ladypants'
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text>Age:                    </Text>
            <TextInput
            style={{marginRight:0}}
            placeholder='3'
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text>Species:             </Text>
            <TextInput
            placeholder='Dog'
            style={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text>Favorite Snack: </Text>
            <TextInput
            placeholder='Roast Turkey Sandwhiches'
            style={styles.input}
            />
          </View>
        </View>

        {/* save changes button */}
        <TouchableRipple style={styles.editProfileButtonsWrapper}>
              <Text
              style={styles.editProfileButton}
              onPress={()=> props.editProfile()}>Save changes?</Text>
          </TouchableRipple>
      </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 15,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
   input: {
     borderWidth: 1,
     borderColor: '#777',
     padding: 8,
     margin: 0,
     width: 250,
    height: 20,
    marginTop: -5,
   }
});



export default EditProfile;