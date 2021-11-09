
import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity,Platform, Image} from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
//import { globalStyles } from '../styles/global.js'

import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default class CameraComponent extends React.Component {
  constructor(props) {
    super(props)
    this.exitCamera = props.exitCamera;
    this.state = {
      chatId: props.chatId,
      senderId: props.senderId,
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
      setpreview: false,
      imageuploaded: null,
      removed: '',
      phototaken: '',
      email: props.email
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
    this.setState({ hasPermission: status === 'granted' })
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
  })

  let localUri = result.uri;
  let filename = localUri.split('/').pop();
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  this.exitCamera();

  let formData = new FormData();
  formData.append('photo', { uri: localUri, name: filename, type: type, email: this.state.email});
  formData.append('chatId', this.state.chatId);
  formData.append('senderId', this.state.senderId);


   await fetch('http://3.133.100.147:2550/add-photo', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
      },
    })
    .then((response) => {
      if (response.status === 200) {
        console.log('image send successful', response);
      } else {
        console.log('image send failed', response);
      }
    }).catch(function(err) {
      console.log("failed to connect", err);
    })
  }

  render(){
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1, backgroundColor: 'purple' }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
            {
              this.exitCamera === undefined ? (<View/>) :(
                <TouchableOpacity
                  style={styles.backArrow}
                  onPress={()=>this.exitCamera()}>
                  <Image
                      source={{uri:'https://www.creativefabrica.com/wp-content/uploads/2019/03/Arrow-icon-by-ahlangraphic-150-580x386.jpg'}}
                      style={{ height: 50, width: 50, left: 15, top: 10}}
                  />
                </TouchableOpacity>
              )
            }
            <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                <TouchableOpacity
                  style={styles.center}
                  onPress={()=>this.pickImage()}>
                  <Ionicons
                      name="images-outline"
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
  },
  backArrow: {
    alignSelf: 'flex-start'
  }
});