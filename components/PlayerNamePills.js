import React from "react";
import { StyleSheet, Text, View } from "react-native";

function PlayerNamePills({ name }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{name}</Text>
    </View>
  );
}

export default PlayerNamePills;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#272727",
    borderRadius: 13,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 15,
    color: "white",
  },
});
