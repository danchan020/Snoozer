import * as SplashScreen from "expo-splash-screen";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Alegreya_400Regular,
} from "@expo-google-fonts/dev";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Alegreya_400Regular,
  });
  if (!fontsLoaded) {
    return <Landing />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            children={() => {
              <Login />;
            }}
            options={{
              headerTitleStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 23,
              },
              headerStyle: {
                backgroundColor: "#414999",
              },
              headerTintColor: "#D9E4DD",
            }}
          />
          <Stack.Screen
            name="Signup"
            children={() => {
              <Signup />;
            }}
            options={{
              headerTitleStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 23,
              },
              headerStyle: {
                backgroundColor: "#414999",
              },
              headerTintColor: "#D9E4DD",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
