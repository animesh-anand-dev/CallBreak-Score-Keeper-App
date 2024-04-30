import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import IconButton from "./IconButton";

function RoundManageModal({
  visible,
  onClose,
  gameId,
  players,
  onStart,
  onEnd,
  isRoundCompleted,
  currentRoundId,
}) {
  const [totalInputScore, setTotalInputScore] = useState(0);
  const [inputs, setInputs] = useState(
    players.map((player) => ({
      playerName: player.playerName,
      playerId: player._id,
      expectedScore: "",
      isValid: true,
    }))
  );

  function onModalClose() {
    setInputs(
      players.map((player) => ({
        playerName: player.playerName,
        playerId: player._id,
        expectedScore: "",
        isValid: true,
      }))
    );
    onClose();
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return curInputs.map((input) => {
        if (input.playerId === inputIdentifier) {
          // const isValid = isRoundCompleted
          //   ? enteredValue >= 20 &&
          //     enteredValue <= 130 &&
          //     enteredValue % 10 == 0
          //   : enteredValue >= 10 &&
          //     enteredValue <= 130 &&
          //     enteredValue % 10 == 0; // Check if the entered value is valid
          return { ...input, expectedScore: enteredValue, isValid: true };
        }
        return input;
      });
    });
    console.log(enteredValue);
  }

  function onSubmitHandler() {
    // Check if each player's expected score is at least 20
    let allPlayersScoreValid;
    if (isRoundCompleted) {
      allPlayersScoreValid = inputs.every(
        (input) =>
          parseInt(input.expectedScore) >= 20 &&
          parseInt(input.expectedScore) <= 130 &&
          parseInt(input.expectedScore) % 10 == 0
      );
    } else {
      allPlayersScoreValid = inputs.every(
        (input) =>
          parseInt(input.expectedScore) >= 0 &&
          parseInt(input.expectedScore) <= 130 &&
          parseInt(input.expectedScore) % 10 == 0
      );
    }

    // Calculate the sum of all expected scores
    const totalExpectedScore = inputs.reduce(
      (total, input) => total + parseInt(input.expectedScore),
      0
    );

    setTotalInputScore(totalExpectedScore);

    // Check if the total expected score is greater than or equal to 10
    const totalScoreValid = isRoundCompleted
      ? totalExpectedScore >= 100
      : totalExpectedScore == 130;

    // If any of the conditions fail, don't submit
    if (!allPlayersScoreValid || !totalScoreValid) {
      // Handle invalid input, for example, show an error message
      const updatedInputs = inputs.map((input) => {
        return {
          ...input,
          isValid: false, // Check if expected score is valid
        };
      });
      setInputs(updatedInputs);
      return;
    }

    if (!isRoundCompleted) {
      const dataToEndRound = {
        playersWithScores: inputs.map((item) => ({
          playerID: item.playerId,
          actualScore: item.expectedScore,
        })),
        roundID: currentRoundId,
      };
      onEnd(dataToEndRound);
      console.log(dataToEndRound);
    } else {
      const dataToStartRound = {
        playersWithScores: inputs.map((item) => ({
          playerID: item.playerId,
          expectedScore: item.expectedScore,
        })),
        gameId: gameId,
      };
      onStart(dataToStartRound);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onModalClose}
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Players Score</Text>
          {inputs.some((input) => !input.isValid) && (
            <Text style={[styles.modalTitle, { color: "red" }]}>
              Total Score {totalInputScore}
            </Text>
          )}
          {players.map((player) => (
            <Input
              key={player._id} // Use the player's _id as the key
              label={player.playerName}
              textInputConfig={{
                selectionColor: "black",
                keyboardType: "numeric",
                placeholder: isRoundCompleted
                  ? "Enter Expected Score/Hands"
                  : "Enter Actual Score/Hands",
                placeholderTextColor: "#797979",
                onChangeText: (enteredValue) =>
                  inputChangeHandler(player._id, enteredValue), // Pass the playerId
                value:
                  inputs.find((input) => input.playerId === player._id)
                    ?.expectedScore || "",
              }}
              invalid={
                !inputs.find((input) => input.playerId === player._id)?.isValid
              }
              // Check if the input is invalid
            />
          ))}

          {inputs.some((input) => !input.isValid && isRoundCompleted) ? (
            <Text style={styles.errorText}>
              Score/Hands of each player should be equal to 20 or greater than
              20 and Total is greater than or equal to 100
            </Text>
          ) : (
            inputs.some((input) => !input.isValid && !isRoundCompleted) && (
              <Text style={styles.errorText}>
                Score/Hands of each player should be equal to 10 or greater than
                10 and Total is equal to 130
              </Text>
            )
          )}

          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <IconButton
                icon="close-circle"
                onPress={onModalClose}
                color="white"
                title="Close"
                textStyle={styles.buttonText}
              />
            </View>
            <View style={styles.buttons}>
              <IconButton
                icon={
                  isRoundCompleted ? "arrow-right-drop-circle" : "stop-circle"
                }
                onPress={onSubmitHandler}
                color="white"
                title={isRoundCompleted ? "Start Round" : "End Round"}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default RoundManageModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 8,
  },
});
