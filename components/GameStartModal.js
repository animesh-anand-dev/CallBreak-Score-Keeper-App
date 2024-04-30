import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import Input from "./Input";
import IconButton from "./IconButton";
import LoadingOverlay from "./LoadingOverlay";
import { addPlayers } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import LoadingSpinner from "./LoadingSpinner";
import DeviceInfo from "react-native-device-info";

const initialPlayerInputs = {
  player1: { value: "", isValid: true },
  player2: { value: "", isValid: true },
  player3: { value: "", isValid: true },
  player4: { value: "", isValid: true },
};

function GameStartModal({ visible, onClose, deviceID }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const navigation = useNavigation();
  const [inputs, setInputs] = useState(initialPlayerInputs);

  function onModalClose() {
    setInputs(initialPlayerInputs);
    onClose();
  }
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  async function onSubmit(playerData) {
    setIsSubmitting(true);
    try {
      const os = DeviceInfo.getSystemName();
      const version = DeviceInfo.getSystemVersion();
      const brand = DeviceInfo.getBrand();
      const model = DeviceInfo.getModel();
      const type = DeviceInfo.getDeviceType();

      const device = {
        deviceOs: os || "",
        osVersion: version || "",
        deviceBrand: brand || "",
        deviceModel: model || "",
        deviceType: type || "",
      };
      console.log(deviceID);
      const response = await addPlayers(playerData, device, deviceID);
      ToastAndroid.show(response.message, ToastAndroid.SHORT);
      //console.log(response);
      onClose();
      navigation.navigate("GameScreen", {
        gameId: response.gameId,
        players: response.playersData,
      });
    } catch (error) {
      console.log("Error in Add Players : ", error);
    }
    setIsSubmitting(false);
  }

  function submitHandler() {
    const formIsInvalid = Object.values(inputs).some(
      (input) => input.value.trim().length === 0
    );

    if (formIsInvalid) {
      setInputs((prevInputs) => {
        const updatedInputs = { ...prevInputs };
        for (const key in updatedInputs) {
          updatedInputs[key].value = updatedInputs[key].value.trim();
          updatedInputs[key].isValid = updatedInputs[key].value.length > 0;
        }
        return updatedInputs;
      });
      return;
    }

    const playerData = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, value.value])
    );

    onSubmit(playerData);
  }

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onModalClose}
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Players Name</Text>
          {Object.entries(inputs).map(([key, input]) => (
            <Input
              key={key}
              label={`Player ${key.charAt(key.length - 1)}`}
              textInputConfig={{
                selectionColor: "black",
                placeholder: "Enter Name",
                placeholderTextColor: "#797979",
                onChangeText: inputChangeHandler.bind(this, key),
                value: input.value,
              }}
              invalid={!input.isValid}
            />
          ))}
          {Object.values(inputs).some((input) => !input.isValid) && (
            <Text style={styles.errorText}>
              Please enter all players names !
            </Text>
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
                icon="content-save"
                onPress={submitHandler}
                color="white"
                title="Save"
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
export default GameStartModal;

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
