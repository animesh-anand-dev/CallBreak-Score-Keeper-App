import React from "react";
import { StyleSheet, Text, View } from "react-native";

function TableHead({ playersNames }) {
  return (
    <View style={styles.container}>
      <View style={[styles.column]}>
        <Text style={styles.playerNames}>Rounds</Text>
      </View>
      {playersNames.map((player, index) => (
        <View
          style={[styles.column]}
          key={index}>
          <Text style={styles.playerNames}>{player.playerName}</Text>
        </View>
      ))}
    </View>
  );
}

export default TableHead;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
  },
  column: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  playerNames: {
    color: "white",
    fontSize: 15,
  },
  col1: {
    backgroundColor: "red",
  },
  col2: {
    backgroundColor: "green",
  },
  col3: {
    backgroundColor: "black",
  },
  col4: {
    backgroundColor: "white",
  },
  col5: {
    backgroundColor: "yellow",
  },
});
