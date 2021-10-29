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
  Button,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';



const EditProfile = (props) => {
    return (
      <SafeAreaView style={styles.container}>
        {/* profile pic, name, and snack tag */}
        <View style={styles.userInfoSection}>
          <ImageBackground
          source={require('../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400}}>
            <View style={{alignItems: 'center', marginTop: 75}}>
              <Avatar.Image
                source={{
                  uri: 'https://i.imgur.com/ckCX9Xc.jpg'
                }}
                size={100}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>EDIT</Title>
                <Caption style={styles.caption}>Loves snacking on roast turkey sandwhiches</Caption>
              </View>
            </View>
            </ImageBackground>
        </View>

        {/* user info section */}
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

        {/* buttons for edit profile and navigate to settings */}
        <TouchableRipple style={styles.profileButtonsWrapper} onPress={()=>{}}>
              <Button
              style={styles.profileButton}
              title='Save Changes'
              onPress={()=> props.editProfile()}></Button>
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
  profileButtons: {
    display: 'flex',
    flexDirection: 'row'
  },
  profileButtonsWrapper: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    marginTop: 'auto',
    marginLeft: 170
  },
  profileButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
   input: {
     borderWidth: 1,
     borderColor: '#777',
     padding: 8,
     margin: 0,
     width: 200,
    height: 20,
    marginTop: -5,
   }
});



export default EditProfile;