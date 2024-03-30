import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const Button = ({ title, pressHandler, btnStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={pressHandler && pressHandler} style={btnStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Button;
