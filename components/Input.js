import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ style, label, textInputConfig, invalid }) {
  let inputStyles = [styles.inputBox];

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={styles.inputBox}
        {...textInputConfig}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputBox: {
    borderBottomColor: "#636363",
    borderBottomWidth: 1,
    fontSize: 15,
  },
  inputContainer: {
    marginVertical: 5,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  invalidLabel: {
    color: "#c74747",
  },
  invalidInput: {
    borderBottomColor: "#c74747",
  },
});
