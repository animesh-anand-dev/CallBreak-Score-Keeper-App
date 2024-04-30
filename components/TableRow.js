import React from "react";
import { StyleSheet, Text, View } from "react-native";

function TableRow({ scoreContainer, scoreText, rowName, rowData }) {
  return (
    <View style={[styles.container, scoreContainer]}>
      <View style={styles.column}>
        <Text style={[styles.playerNames, scoreText]}>{rowName}</Text>
      </View>
      {rowData.map((score, index) => (
        <View
          style={styles.column}
          key={index}>
          <Text style={[styles.playerNames, scoreText]}>
            {rowName == "Expected"
              ? score.expectedScore
              : rowName == "Actual"
              ? score.actualScore
              : score.totalScore}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default TableRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  column: {
    flex: 1,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  playerNames: {
    color: "black",
    fontSize: 12,
  },
});
