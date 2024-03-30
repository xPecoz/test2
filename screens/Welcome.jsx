import React from "react";
import { View, StyleSheet, Image, Text, StatusBar } from "react-native";
import { FONTS, SIZES } from "../constants";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" />
      <Image source={require("../assets/icon.png")} style={styles.logo} />
      <Text style={styles.text}>معنا نحو التقدم الرقمي</Text>
      <Text
        style={[styles.text, { color: "#aa0808", fontSize: SIZES.large + 4 }]}
      >
        بميت زنقر
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#eee",
  },
  logo: {
    width: 120,
    height: 120,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontSize: SIZES.large + 2,
    fontFamily: FONTS.bold,
    lineHeight: SIZES.xLarge + 9,
    paddingTop: 5,
  },
});

export default Welcome;
