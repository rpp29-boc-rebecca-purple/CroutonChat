

import React, {useState} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';

// * just means it will import everything from those packages
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


export default class CameraComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
      setpreview: false
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
        alert('photo has been taken')
      }
    }
  };


  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    console.log(result, 'uploaded photo')
    alert('photo uploaded successfully')
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