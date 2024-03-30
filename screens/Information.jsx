import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar, Alert } from "react-native";
import { FONTS, SIZES } from "../constants";
import { TextInput } from "react-native";
import Button from "../components/Button";
import { Row, Table } from "react-native-table-component";

const Information = () => {
  const [inf, setInf] = useState({
    name: "",
    class: "",
    num: "",
    place: "",
  });

  const [inputValue, setInputValue] = useState("");
  const [btnColor, setBtnColor] = useState("#f44336");

  function pressHandler() {
    if (inputValue !== "") {
      fetch(
        `https://schoolapis.mathjewel.com/abdullah-nadim/?code=${inputValue}`
      )
        .then((res) => res.json())
        .then((res) => {
          const state = res.code;
          if (state == "404") {
            Alert.alert("لقد قمت بإدخال كود خطأ", "", [
              {
                text: "close",
                style: "cancel",
              },
            ]);

            setBtnColor("#f44336");

            setInf({
              name: "",
              class: "",
              num: "",
              place: "",
            });
          } else if (state == "200") {
            const data = res[0][0];

            setBtnColor("#18ba89");
            setInf({
              name: data.name,
              class: data.class,
              num: data.num,
              place: data.place,
            });
          }
        });
    } else Alert.alert("برجاء إدخال الكود");
  }

  return (
    <View
      style={{
        backgroundColor: "#eee",
      }}
    >
      <Text style={styles.title}>عبدالله النديم</Text>
      <View style={styles.container}>
        <StatusBar backgroundColor="black" />
        <View
          style={{
            width: 200,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15,
          }}
        >
          <TextInput
            selectionColor="black"
            inputMode="numeric"
            style={styles.input}
            placeholder="الكود"
            onChangeText={(e) => setInputValue(e)}
          />
          <Button
            title="إرسال"
            btnStyle={[styles.button, { backgroundColor: btnColor }]}
            textStyle={styles.button.text}
            pressHandler={pressHandler}
          />
        </View>
        <Table style={{ backgroundColor: "white" }}>
          <Row
            data={[inf.name, "الاسم"]}
            textStyle={[
              styles.tableText,
              { borderBottomWidth: 0, borderTopWidth: 1 },
            ]}
          />
          <Row
            data={[inf.class, "الصف"]}
            textStyle={[styles.tableText, { borderTopWidth: 1 }]}
          />
          <Row data={[inf.num, "رقم الجلوس"]} textStyle={styles.tableText} />
          <Row data={[inf.place, "اللجنة"]} textStyle={styles.tableText} />
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    height: "100%",
  },
  title: {
    textAlign: "center",
    padding: SIZES.small,
    backgroundColor: "white",
    marginBottom: 12,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large + 5,
  },
  tableText: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderTopWidth: 0,
    textAlign: "center",
    paddingVertical: 5,
    fontSize: SIZES.medium + 3,
    fontFamily: FONTS.semiBold,
    height: 42,
    center: {
      borderColor: "#ccc",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      textAlign: "center",
      paddingVertical: 5,
      fontSize: SIZES.medium + 3,
      fontFamily: FONTS.semiBold,
      height: 42,
    },
  },
  input: {
    backgroundColor: "white",
    marginBottom: SIZES.small,
    borderRadius: SIZES.medium - 7,
    outlineColor: "#ccc",
    fontSize: SIZES.large,
    paddingTop: SIZES.medium - 5,
    paddingVertical: SIZES.small - 5,
    paddingHorizontal: SIZES.small - 5,
    fontFamily: FONTS.bold,
  },
  button: {
    borderRadius: SIZES.medium - 7,
    paddingVertical: SIZES.small - 5,
    paddingHorizontal: SIZES.small - 5,
    text: {
      textAlign: "center",
      fontFamily: FONTS.bold,
      color: "white",
      fontSize: SIZES.large,
    },
  },
});

export default Information;
