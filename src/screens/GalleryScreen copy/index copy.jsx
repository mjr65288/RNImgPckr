import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import images from "./imageList";
import * as MediaLibrary from 'expo-media-library';


let mediaLibraryAsync = async () => {
  let { status } = await MediaLibrary.requestPermissionsAsync()
  
  if (status.granted === false) {
    alert('Permission to access camera roll is required!');
    return;
  }

  const albunName = "Camera";
  const getPhotos = await MediaLibrary.getAlbumAsync(albunName);

  const media = await MediaLibrary.getAssetsAsync({
    mediaType: ['photo', 'video'],
    first: 20,
    album: getPhotos,
  });

  //let video = await MediaLibrary.getAssetInfoAsync(media.assets[0])

  console.log(media);
};

const GalleryScreen = () => {
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
        <Text style={styles.buttonText}>Pick a photo</Text>
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
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
});

export default GalleryScreen;
