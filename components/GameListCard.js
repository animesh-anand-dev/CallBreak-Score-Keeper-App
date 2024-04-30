import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import PlayerNamePills from "./PlayerNamePills";
import { useNavigation } from "@react-navigation/native";
import { formatDate, formatTime } from "../utils/dateFormatter";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function GameListCard({ game }) {
  const navigation = useNavigation();
  function handleOnPress() {
    navigation.navigate("GameScreen", {
      gameId: game._id,
      players: game.players,
    });
  }

  return (
    <View style={styles.card}>
      <Pressable
        onPress={handleOnPress}
        android_ripple={{ color: "#f1f1f1", borderless: false }}
        style={({ pressed }) => [pressed && styles.pressed]}>
        <View style={styles.rowContainer}>
          <View style={styles.roundsText}>
            <MaterialCommunityIcons
              name="cards-playing"
              size={20}
              color="black"
            />
            <Text style={styles.textStyle}> {game.rounds.length} Rounds</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowContainer}>
              <Ionicons
                name="calendar"
                size={13}
                color="black"
              />
              <Text style={styles.dateTime}> {formatDate(game.gameDate)} </Text>
            </View>
            <View style={styles.rowContainer}>
              <AntDesign
                name="clockcircle"
                size={13}
                color="black"
              />
              <Text style={styles.dateTime}> {formatTime(game.gameDate)}</Text>
            </View>
          </View>
        </View>

        {/* <ScrollView horizontal={true}> */}
        <View style={styles.playerNameContainer}>
          {game.players.map((item) => (
            <PlayerNamePills
              key={item.playerName}
              name={item.playerName}
            />
          ))}
        </View>
        {/* </ScrollView> */}
      </Pressable>
    </View>
  );
}

export default GameListCard;

const styles = StyleSheet.create({
  card: {
    padding: 7,
    marginVertical: 7,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 8,
  },
  pressed: {
    opacity: 0.5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerNameContainer: {
    flexDirection: "row",
    padding: 5,
    marginTop: 10,
    flexWrap: "wrap",
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "600",
  },
  roundsText: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "col",
  },
  dateTime: {
    paddingRight: 5,
  },
});
