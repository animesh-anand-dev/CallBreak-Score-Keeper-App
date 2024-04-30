import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const OfflineLayout = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/no-internet-animation.json")} // Path to your Lottie animation JSON file
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default OfflineLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#ececec",
  },
  iconsContainer: {
    flexDirection: "row",
    padding: 10,
  },
});
