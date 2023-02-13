import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function Home({ setUser }) {
  const Tab = createBottomTabNavigator();
  const [refresh, setRefresh] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [alarmData, setAlarmData] = useState([]);
  const [userAlarm, setUserAlarm] = useState([]);

  useEffect(() => {
    async function getUserData() {
      const response = await fetch("http://localhost:3000/me");
      const userJSON = await response.json();
      setCurrentUser(userJSON);
    }
    getUserData();

    async function getAlarmData() {
      const response = await fetch("http://localhost:3000/alarms");
      const alarmJSON = await response.json();
      setAlarmData(alarmJSON);
    }
    getAlarmData();

    setUserAlarm(alarmData.find((alarm) => alarm.user_id === currentUser.id));
  }, [refresh]);

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
        component={Alarm}
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
          <SetAlarm
            currentUser={currentUser}
            userAlarm={userAlarm}
            setRefresh={setRefresh}
          />
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
