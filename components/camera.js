

import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform, Image, ImageBackground} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

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
      photoTaken: null
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
      const photo = await MediaLibrary.createAssetAsync(data.uri);
      const source = photo.uri;
      if (source) {
        let base64Img = `data:image/jpg;base64,${source}`;
        this.setState({
          photoTaken: { base64: source }
        })
        alert('photo added')
        console.log(this.state.photoTaken)
    }
  };
}

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    this.setState({
      imageuploaded: result.uri
    })

  // formatting URI link to match URL
  // let localUri = result.uri;
  // let filename = localUri.split('/').pop();
  // let match = /\.(\w+)$/.exec(filename);
  // let type = match ? `image/${match[1]}` : `image`;

  // let formData = new FormData();
  // // Information of what sent will be changed depending on API data expected and structure
  // formData.append('photo', { uri: localUri, name: filename, type });
  //   return await fetch(YOUR_SERVER_URL, {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //     'content-type': 'multipart/form-data',
  //   },
  // });
    // alert('photo uploaded successfully')
   console.log(this.state.imageuploaded)
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