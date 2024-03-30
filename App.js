import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Welcome from "./screens/Welcome";
import Result from "./screens/Result";
import Home from "./screens/Home";
import Information from "./screens/Information";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontLoaded] = useFonts({
    cairoBold: require("./assets/fonts/Cairo-Bold.ttf"),
    cairoLight: require("./assets/fonts/Cairo-Light.ttf"),
    cairoMedium: require("./assets/fonts/Cairo-Medium.ttf"),
    cairoRegular: require("./assets/fonts/Cairo-Regular.ttf"),
    cairoSemiBold: require("./assets/fonts/Cairo-SemiBold.ttf"),
  });

  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setWelcome(false);
    }, 2000);
  }, []);

  if (!fontLoaded) return null;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {welcome && <Stack.Screen name="Welcome" component={Welcome} />}
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="Information" component={Information} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
