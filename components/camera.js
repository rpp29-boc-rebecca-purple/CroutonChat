

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform, Image, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios'
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
//import { globalStyles } from '../styles/global.js'

// * just means it will import everything from those packages
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';



  // **********************
  //       TASK TO DO    //
  // **********************

  // post request to send the uploaded photo to the API database line 89-105
  // Figure out URI and how to send that to database base64 data type

   // ********************


export default class CameraComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
      setpreview: false,
      imageuploaded: null,
      removed: '',
      phototaken: ''
    }
  }

  async componentDidMount() {
    this.getPermissionAsync()
  }

  // Camera roll Permission
  getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Enable Camera Roll Permissions');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType=()=>{
    const { cameraType } = this.state
    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }


   takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await this.camera.takePictureAsync(options);
      //camera roll (saving picture)

      this.setState({
        phototaken: data
      })

      const photo = await MediaLibrary.createAssetAsync(data.uri);
      const source = photo.uri;
      if (source) {
         alert('photo added')

    }
  };
}


    pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      let formData = new FormData();
      formData.append('photo', {type:type, uri:localUri, name:filename});

      console.log(formData, '🙂🙂🙂')

    const handleSubmit = () => {
      fetch('http://3.133.100.147:2550/addPhoto', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': `multipart/form-data`
      },
      body:formData
      })
      .then(function(data) {
       console.log(data, 'image send successful')
      // console.log(localUri, 'localUri')
      }).catch(function() {
        console.log("fail");
      });
    }
    handleSubmit()
  }
}


  render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                <TouchableOpacity
                  style={styles.center}
                  onPress={()=>this.pickImage()}>
                  <Ionicons
                      name="cloud-upload-outline"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.center}
                  onPress={()=>this.takePicture()}
                  >
                  <FontAwesome
                      name="camera"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                 style={styles.center}
                  onPress={()=>this.handleCameraType()}
                  >
                    <Ionicons
                      name="camera-reverse-outline"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
              </View>
            </Camera>

        {/* this just shows the photo below camera to see what was added testing** */}
            {/* <Image source={{ uri: this.state.imageuploaded }} style={{ width: 305, height: 159 }} /> */}

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  center: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
});