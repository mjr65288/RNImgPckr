import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import images from "./imageList";

const GalleryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item, index }) => (
          <Image key={index} source={item.image} style={styles.img} />
        )}
        showsVerticalScrollIndicator={false}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height}
      />
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
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginBottom: 10,
  },
});

export default GalleryScreen;
