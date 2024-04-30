import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import IconButton from "./IconButton";

const WinnerModal = ({ visible, onClose, winnerName }) => {
  function onModalClose() {
    onClose();
  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onModalClose}
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <Text
            style={[
              styles.winnerName,
              { fontStyle: "italic", color: "#ff7300" },
            ]}>
            Congratulations
          </Text>
          <LottieView
            source={require("../assets/winner-confetti.json")} // Path to your Lottie animation JSON file
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.winnerName}>{winnerName}</Text>
          <LottieView
            source={require("../assets/winner-badge.json")} // Path to your Lottie animation JSON file
            autoPlay
            loop
            style={{ width: "50%", height: "50%" }}
          />
          <View style={styles.buttonsContainer}>
            <IconButton
              icon="close-circle"
              color="#000000"
              title="Close"
              onPress={onModalClose}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WinnerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: "80%",
    height: "60%",
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 0,
  },
  buttons: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    marginLeft: 7,
  },
  animation: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent", // Ensure transparency
  },
  winnerName: {
    fontSize: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
