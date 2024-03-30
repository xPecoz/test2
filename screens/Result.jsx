import { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { FONTS, SIZES } from "../constants/index";
import Button from "../components/Button";

export default function Result() {
  const [data, setData] = useState([
    {
      name: "العربي",
      nameEn: "arabic",
      fullMark: 100,
    },
    {
      name: "الدراسات",
      nameEn: "social",
      fullMark: 100,
    },
    {
      name: "الرياضيات",
      nameEn: "math",
      fullMark: 100,
    },
    {
      name: "الانجليزي",
      nameEn: "english",
      fullMark: 100,
    },
    {
      name: "العلوم",
      nameEn: "science",
      fullMark: 100,
    },
    {
      name: "التربية الإسلامية",
      nameEn: "religion",
      fullMark: 100,
    },
    {
      name: "تكنولوجيا",
      nameEn: "computer",
      fullMark: 100,
    },
    {
      name: "مهارات",
      nameEn: "skills",
      fullMark: 100,
    },
  ]);
  const [result, setResult] = useState({
    name: "",
    arabic: "0",
    social: "0",
    math: "0",
    english: "0",
    science: "0",
    religion: "0",
    computer: "0",
    skills: "0",
    total: "",
    rank: "",
  });
  const [resultStyle, setResultStyle] = useState({
    arabic: "",
    social: "",
    math: "",
    english: "",
    science: "",
    religion: "",
    computer: "",
    skills: "",
    total: "",
  });

  const [btnColor, setBtnColor] = useState("#f44336");
  const [inputValue, setInputValue] = useState("");

  function setColor(num) {
    return num >= 85
      ? "#087bb8"
      : num >= 65
      ? "#008655"
      : num >= 50
      ? "#f1cc0c"
      : "#aa0808";
  }
  function setTotalColor(num) {
    return num >= 680
      ? "#087bb8"
      : num >= 520
      ? "#008655"
      : num >= 400
      ? "#f1cc0c"
      : "#aa0808";
  }

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

            setResult({
              name: "",
              arabic: "0",
              social: "0",
              math: "0",
              english: "0",
              science: "0",
              religion: "0",
              computer: "0",
              skills: "0",
              total: "",
              rank: "",
            });
            setResultStyle({
              arabic: "",
              social: "",
              math: "",
              english: "",
              science: "",
              religion: "",
              computer: "",
              skills: "",
              total: "",
            });
          } else if (state == "200") {
            const data = res[0][0];
            setResult(data);

            const arabic = data.arabic,
              social = data.social,
              math = data.math,
              english = data.english,
              science = data.science,
              religion = data.religion,
              computer = data.computer,
              skills = data.skills,
              total = data.total;

            setResultStyle({
              arabic: setColor(arabic),
              social: setColor(social),
              math: setColor(math),
              english: setColor(english),
              science: setColor(science),
              religion: setColor(religion),
              computer: setColor(computer),
              skills: setColor(skills),
              total: setTotalColor(total),
            });

            setBtnColor("#18ba89");
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
            data={[result.name, "الاسم"]}
            textStyle={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderBottomWidth: 0,
              textAlign: "center",
              paddingVertical: 5,
              fontSize: SIZES.medium + 3,
              fontFamily: FONTS.medium,
              height: 42,
            }}
          />
          <Row
            data={[
              "درجة المادة",
              <Text style={[styles.tableText.center, { borderTopWidth: 1 }]}>
                درجة الطالب
              </Text>,
              "المادة",
            ]}
            textStyle={[styles.tableText, { borderTopWidth: 1 }]}
          />
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <Row
                  data={[
                    item.fullMark,
                    <Text
                      style={[
                        styles.tableText.center,
                        {
                          backgroundColor: resultStyle[item.nameEn]
                            ? resultStyle[item.nameEn]
                            : "white",
                          color: resultStyle[item.nameEn] ? "white" : "black",
                        },
                      ]}
                    >
                      {result[item.nameEn]}
                    </Text>,
                    item.name,
                  ]}
                  textStyle={styles.tableText}
                />
              );
            }}
            keyExtractor={(item) => item.nameEn}
          />
          {/* {data.map((item, i) => {
            return (
              <Row
                data={[
                  item.fullMark,
                  <Text
                    style={[
                      styles.tableText.center,
                      {
                        backgroundColor: resultStyle[item.nameEn]
                          ? resultStyle[item.nameEn]
                          : "white",
                        color: resultStyle[item.nameEn] ? "white" : "black",
                      },
                    ]}
                  >
                    {result[item.nameEn]}
                  </Text>,
                  item.name,
                ]}
                textStyle={styles.tableText}
                key={i}
              />
            );
          })} */}
          <Row
            data={[
              "800",
              <Text
                style={[
                  styles.tableText.center,
                  {
                    backgroundColor: resultStyle.total
                      ? resultStyle.total
                      : "white",
                    color: resultStyle.total ? "white" : "black",
                  },
                ]}
              >
                {result.total}
              </Text>,
              "المجموع",
            ]}
            textStyle={styles.tableText}
          />
          <Row
            data={["", result.rank, "ترتيب على الصف"]}
            textStyle={styles.tableText}
          />
        </Table>
      </View>
    </View>
  );
}

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
