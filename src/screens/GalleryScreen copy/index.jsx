import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import images from "./imageList";
import * as MediaLibrary from "expo-media-library";
import { View } from "react-native-web";

// let mediaLibraryAsync = async () => {
//   let { status } = await MediaLibrary.requestPermissionsAsync()

//   if (status.granted === false) {
//     alert('Permission to access camera roll is required!');
//     return;
//   }

//   const albunName = "Camera";
//   const getPhotos = await MediaLibrary.getAlbumAsync(albunName);

//   const media = await MediaLibrary.getAssetsAsync({
//     mediaType: ['photo', 'video'],
//     first: 20,
//     album: getPhotos,
//   });

//   //let video = await MediaLibrary.getAssetInfoAsync(media.assets[0])

//   console.log(media);
// };

const GalleryScreen = () => {
  const [images, setImages] = React.useState(null);
  const [imageUri, setImageUri] = useState(null);

  const mediaLibraryAsync = async () => {
    const status = await MediaLibrary.requestPermissionsAsync();

    if (status.granted === false) {
      alert("Permission to access Gallery is required!");
      return;
    }

    const albunName = "Camera";
    const getPhotos = await MediaLibrary.getAlbumAsync(albunName);

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo', 'video'],
      first: 20,
      album: getPhotos,
    });

    const i = await MediaLibrary.getAssetInfoAsync(media.assets[0]);

    //setImages(media);
    //console.log(i);
    console.log(i.localUri);
    setImageUri({localUri: i.localUri})
    //console.log(imageUri.localUri);
  };

  // const displayImages = async () =>{

  // }
  if(imageUri !== null){
    return(
      // <FlatList
      //   data={images}
      //   renderItem={({ item, index }) => (
      //     <Image key={index} source={item.image} style={styles.img} />
      //   )}
      //   showsVerticalScrollIndicator={false}
      //   snapToAlignment={"start"}
      //   decelerationRate={"fast"}
      //   snapToInterval={Dimensions.get("window").height}
      // />
      <ScrollView>
        <Text style={styles.buttonText}>{imageUri.localUri}</Text>
          <Image source={{uri : imageUri.localUri}} style={styles.thumbnail}/>
      </ScrollView>
      //<Text style={styles.buttonText}>{imageUri.localUri}</Text>
      // <Image source={{uri : imageUri.localUri}} />
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <Image key={index} source={item.image} style={styles.img} />
        )}
        showsVerticalScrollIndicator={false}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height}
      /> */}
      <TouchableOpacity onPress={mediaLibraryAsync} style={styles.button}>
        <Text style={styles.buttonText}>Load Album</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 385,
    height: 385,
    borderRadius: 1,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  thumbnail: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default GalleryScreen;
