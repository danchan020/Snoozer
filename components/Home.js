import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function Home({ user, setUser, setNotificationTitle }) {
  const Tab = createBottomTabNavigator();
  const [refresh, setRefresh] = useState(false);
  const [userAlarm, setUserAlarm] = useState([]);

  useEffect(() => {
    // async function getUserData() {
    //   const response = await fetch("http://localhost:3000/me");
    //   const userJSON = await response.json();
    //   setCurrentUser(userJSON);
    // }
    // getUserData();

    async function getAlarmData() {
      const response = await fetch("http://localhost:3000/alarms");
      const alarmJSON = await response.json();
      await setUserAlarm(alarmJSON.find((alarm) => alarm.user_id === user.id));
    }
    getAlarmData();

    // https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    // https://www.w3resource.com/javascript-exercises/javascript-date-exercise-45.php (hours)
    // https://www.w3resource.com/javascript-exercises/javascript-date-exercise-44.php (minutes)

    // first we need some math to calculate the start of the alarm to the end of the alarm
    // this way we can calculate how many days it will take to reach the goal (end of the alarm) based on the alarm increment

    // create an alarm array, should include the day and time of the user's first alarm

    // want to create the alarm for today

    // want to create the alarm for the next day
    const tomorrow = new Date(userAlarm.updated_at);
    tomorrow.setDate(tomorrow.getDate() + 1);
    console.log(tomorrow);
  }, [refresh]);

  // console.log(userAlarm.updated_at);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Alarm") {
            iconName = focused ? "alarm" : "alarm-outline";
          } else if (rn === "Set Alarm") {
            iconName = focused ? "time" : "time-outline";
          } else if (rn === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { height: 110, marginBottom: -30 },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "#5d65aa",
        tabBarInactiveBackgroundColor: "#414999",
        tabBarIconStyle: { marginTop: 10 },
        tabBarLabelStyle: { marginBottom: 20 },
      })}
    >
      <Tab.Screen
        name="Alarm"
        children={() => <Alarm user={user} userAlarm={userAlarm} />}
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
      />
      <Tab.Screen
        name="Set Alarm"
        children={() => (
          <SetAlarm user={user} userAlarm={userAlarm} setRefresh={setRefresh} />
        )}
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
      />
      <Tab.Screen
        name="Settings"
        children={() => <Settings setUser={setUser} />}
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
      />
    </Tab.Navigator>
  );
}
