import React, {useEffect,useRef,useState} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    camera: {
      flex: 1,
    },

    buttonContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      margin: 20,
    },

    flipButton: {
      left:330,
      top:20,
      flex: 0.1,
      alignSelf: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
    takePictureButton:{
      backgroundColor: 'white',
      borderRadius:50,
      alignItems: 'center',
      alignSelf: 'flex-end',
      width:70,
      height:70,
      left:125,
      bottom:40
    }
});


const CameraView = () => {

    let camera = useRef(Camera)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    const __takePicture = async ()=>{

      /*
      TODO:

      take picture
      send photo to api
      await reponse
      slide in animation with results
      
      */

      //takes picture, gets base64 encoding
      const photo = await camera.takePictureAsync({base64:true})
      const base64ID = photo.base64

      //sends to api
      await fetch('https://bluprntapi.herokuapp.com/data', {
        method:'POST',
        headers:{
          Accept: 'application/json','Content-Type':'application/json'
        },
        body: JSON.stringify({
          "base64ID": base64ID
        })
      }).then(res=>res.json())
      .then(data=>console.log(data))
      

      alert('sent complete')

      


    }



    return (
      <View style={styles.container}>
        <Camera ref={ref=> {camera=ref}}style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Text style={styles.text}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.takePictureButton}
              onPress={__takePicture}
            ></TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
}


export default CameraView;