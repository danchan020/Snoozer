import { useState, useEffect, useCallback } from "react";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Inter_400Regular,
  Inter_700Bold,
  Alegreya_400Regular,
  Sriracha_400Regular,
} from "@expo-google-fonts/dev";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const Stack = createNativeStackNavigator();
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [alarmTrigger, setAlarmTrigger] = useState("");
  const [time, setTime] = useState("");

  // console.log(time);
  // console.log(notificationTitle);
  // console.log(alarmTrigger);

  async function scheduleLocalNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationTitle,
        body: "RING RING RING TIME TO GET UP!",
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().catch((errors) => console.log(errors));
      }
    });
  }, []);

  // if (userAlarm && !userAlarm.is_disabled) {}
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        `${new Date().getHours().toString().padStart(2, 0)}:${new Date()
          .getMinutes()
          .toString()
          .padStart(2, 0)}`
      );

      if (user && alarmTrigger) {
        console.log(alarmTrigger.time, time);
        if (time === alarmTrigger.time) {
          scheduleLocalNotification();
          alert("TIME TO WAKE UP!!!");
        }
      }
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  // console.log(time);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Inter_400Regular,
          Inter_700Bold,
          Alegreya_400Regular,
          Sriracha_400Regular,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayout}>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            children={() => (
              <Home
                user={user}
                setUser={setUser}
                setNotificationTitle={setNotificationTitle}
                setAlarmTrigger={setAlarmTrigger}
              />
            )}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
            // (screen component) higher order components are automatically passed the navigation prop
          />
          <Stack.Screen
            name="Login"
            children={() => <Login setUser={setUser} />}
            options={{
              headerTitleStyle: {
                fontFamily: "Sriracha_400Regular",
                fontSize: 25,
              },
              headerStyle: {
                backgroundColor: "#414999",
              },
              headerTintColor: "#D9E4DD",
            }}
            // (child component) requires useNavigation passed as prop or imported in component
          />
          <Stack.Screen
            name="Signup"
            children={() => <Signup setUser={setUser} />}
            options={{
              headerTitleStyle: {
                fontFamily: "Sriracha_400Regular",
                fontSize: 25,
              },
              headerStyle: {
                backgroundColor: "#414999",
              },
              headerTintColor: "#D9E4DD",
            }}
            // (child component) requires useNavigation passed as prop or imported in component
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
