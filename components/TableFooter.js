import React from "react";
import { StyleSheet, Text, View } from "react-native";

function TableFooter({ totalScore }) {
  return (
    <View style={styles.container}>
      <View style={[styles.column]}>
        <Text style={styles.playerNames}>All Total</Text>
      </View>
      {totalScore.map((scores, index) => (
        <View
          style={[styles.column]}
          key={index}>
          <Text style={styles.playerNames}>
            {scores.totalScore ? scores.totalScore : 0}
          </Text>
        </View>
      ))}
      <View style={styles.placeholder} />
    </View>
  );
}

export default TableFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    flexGrow: 1,
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
    fontWeight: "700",
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
