import React from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { FONTS, SIZES } from "../constants";

const Home = () => {
  const navigation = useNavigation();

  return (
    <>
      <Text style={styles.title}>عبدالله النديم</Text>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />
        <Button
          btnStyle={styles.button}
          textStyle={styles.btnText}
          title="النتيجة"
          pressHandler={() => {
            navigation.navigate("Result");
          }}
        />
        <Button
          btnStyle={styles.button}
          textStyle={styles.btnText}
          title="بيانات الطالب"
          pressHandler={() => {
            navigation.navigate("Information");
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    paddingHorizontal: SIZES.small,
    display: "flex",
    justifyContent: "center",
    gap: SIZES.medium + 3,
  },
  title: {
    textAlign: "center",
    padding: SIZES.small,
    backgroundColor: "white",
    fontFamily: FONTS.bold,
    fontSize: SIZES.large + 5,
  },
  button: {
    backgroundColor: "#087eff",
    borderRadius: SIZES.small - 4,
    paddingVertical: SIZES.small - 2,
    paddingHorizontal: SIZES.small,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium + 5,
  },
});

export default Home;
