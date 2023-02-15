import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function Home({ user, setUser, setNotificationTitle }) {
  const Tab = createBottomTabNavigator();
  const [refresh, setRefresh] = useState(false);
  const [userAlarm, setUserAlarm] = useState({});
  const [loaded, setLoaded] = useState(false);

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
      setLoaded(true);
    }
    getAlarmData();

    // console.log(userAlarm);

    // (hours) substring( 0 , 2 )
    // (minutes) substring( 3 , 5 )

    // first we need some math to calculate the hours and minutes from the start of the alarm to the end of the alarm
    // this way we can calculate how many days it will take to reach the goal (end of the alarm) based on the alarm increment

    if (loaded) {
      // create a variable for difference in hours and a variable for difference in minutes
      // if minutes are equal then hour start - hour end
      // if start minutes are greater than end minutes than hour start - hour end / subtract start minutes from end minutes
      // if start minutes are less than end minutes than hour start - hour end - 1hr / 60 subtract (end - start) minutes

      let differenceHours;
      let differenceMinutes;

      if (
        parseInt(userAlarm.alarm_start.substring(3, 5)) ===
        parseInt(userAlarm.alarm_end.substring(3, 5))
      ) {
        differenceHours =
          parseInt(userAlarm.alarm_start.substring(0, 2)) -
          parseInt(userAlarm.alarm_end.substring(0, 2));
        differenceMinutes = 0;
      } else if (
        parseInt(userAlarm.alarm_start.substring(3, 5)) >
        parseInt(userAlarm.alarm_end.substring(3, 5))
      ) {
        differenceHours =
          parseInt(userAlarm.alarm_start.substring(0, 2)) -
          parseInt(userAlarm.alarm_end.substring(0, 2));
        differenceMinutes =
          parseInt(userAlarm.alarm_start.substring(3, 5)) -
          parseInt(userAlarm.alarm_end.substring(3, 5));
      } else if (
        parseInt(userAlarm.alarm_start.substring(3, 5)) <
        parseInt(userAlarm.alarm_end.substring(3, 5))
      ) {
        differenceHours =
          parseInt(userAlarm.alarm_start.substring(0, 2)) -
          parseInt(userAlarm.alarm_end.substring(0, 2)) -
          1;
        differenceMinutes =
          60 -
          (parseInt(userAlarm.alarm_end.substring(3, 5)) -
            parseInt(userAlarm.alarm_start.substring(3, 5)));
      }

      let totalMins = differenceHours * 60 + differenceMinutes;
      let totalDays = Math.floor(totalMins / userAlarm.alarm_increment) + 1;

      // console.log(differenceHours);
      // console.log(differenceMinutes);
      // console.log(totalMins);
      // console.log(totalDays);
    }

    // create an alarm array, should include the day and time of the user's first alarm + push all future alarms into the array
    const tomorrow = new Date(userAlarm.updated_at);
    tomorrow.setDate(tomorrow.getDate() + 1);
    // console.log(tomorrow);
    // tomorrow is a date object

    let alarmArray = [
      {
        date: JSON.stringify(tomorrow).substring(1, 11),
        time: userAlarm.alarm_start,
      },
    ];

    // console.log(alarmArray);

    // want to create the alarms for all days of an alarm's total days
    // create a for loop that ends when index reaches total days

    for (let i = 1; i <= totalDays; i++) {
      const nextDay = new Date(userAlarm.updated_at);
      nextDay.setDate(nextDay.getDate() + i);
    }
  }, [refresh, loaded]);

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
