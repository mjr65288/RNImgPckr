import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import images from "./imageList";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

const GalleryScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [photo, setPhotot] = useState(null);

  const mediaLibraryAsync = async () => {
    //openImagePickerAsync();

    const status = await MediaLibrary.requestPermissionsAsync();

    if (status.granted === false) {
      alert("Permission to access Gallery is required!");
      return;
    }

    const albunName = "Camera";
    const getPhotos = await MediaLibrary.getAlbumAsync(albunName);

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
      first: 20,
      album: getPhotos,
    });

    const i = await MediaLibrary.getAssetInfoAsync(media.assets[0]);
    //console.log(i.localUri);
    setImageUri({ localUri: i.localUri });

    console.log(media.assets);
    setPhotot(media.assets);
  };

  // useEffect(() => {
  //   mediaLibraryAsync();
  // }, [imageUri]);

  //const v = imageUri !== null;

  const openImagePickerAsync = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  return (
    // <View style={styles.container}>
    //   {imageUri !== null ?
    //     (
    //     <ScrollView>
    //       <Image source={{ uri: imageUri.localUri }} style={styles.thumbnail} />
    //       <TouchableOpacity onPress={mediaLibraryAsync} style={styles.button}>
    //       <Text style={styles.buttonText}>Load Album</Text>
    //     </TouchableOpacity>
    //     </ScrollView>
    //     )
    //     :
    //     (
    //     <TouchableOpacity onPress={mediaLibraryAsync} style={styles.button}>
    //       <Text style={styles.buttonText}>Load Album</Text>
    //     </TouchableOpacity>
    //     )
    //   }
    // </View>
    <View style={styles.container}>
      {photo !== null ? (
        <SafeAreaView style={styles.container2}>
          <FlatList
            data={photo}
            renderItem={({ item, index }) => (
              <Image key={index} source={{uri: item.uri}} style={styles.img} />
            )}
            showsVerticalScrollIndicator={false}
            snapToAlignment={"start"}
            decelerationRate={"fast"}
            snapToInterval={Dimensions.get("window").height}
          />
        </SafeAreaView>
      ) : (
        <TouchableOpacity onPress={mediaLibraryAsync} style={styles.button}>
          <Text style={styles.buttonText}>Load Album</Text>
        </TouchableOpacity>
      )}
    </View>
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
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default GalleryScreen;
