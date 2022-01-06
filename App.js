//import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BottomTabNavigator from "./src/navigation";

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function GalleryScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Images!</Text>
//     </View>
//   );
// }

//const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});
