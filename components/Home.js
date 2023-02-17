import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

export default function Home({
  user,
  setUser,
  setNotificationTitle,
  setAlarmTrigger,
}) {
  const Tab = createBottomTabNavigator();
  const [refresh, setRefresh] = useState(false);
  const [userAlarm, setUserAlarm] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [allAlarms, setAllAlarms] = useState([]);
  const [alarmTomorrow, setAlarmTomorrow] = useState({});

  useEffect(() => {
    async function getAlarmData() {
      const response = await fetch("http://localhost:3000/alarms");
      const alarmJSON = await response.json();
      setUserAlarm(alarmJSON.find((alarm) => alarm.user_id === user.id));
      setLoaded(true);
    }
    getAlarmData();

    // console.log(userAlarm);

    // first we need some math to calculate the hours and minutes from the start of the alarm to the end of the alarm
    // this way we can calculate how many days it will take to reach the goal (end of the alarm) based on the alarm increment

    if (loaded && userAlarm) {
      setNotificationTitle(userAlarm.alarm_name);

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

      // create an alarm array, should include the day and time of the user's first alarm + push all future alarms into the array

      // console.log(userAlarm.updated_at);
      const tomorrow = new Date(userAlarm.updated_at);
      tomorrow.setDate(tomorrow.getDate());
      // console.log(tomorrow);
      // created_at and updated_at values are in UTC , need to make this local

      let alarmArray = [
        {
          date: JSON.stringify(tomorrow).substring(1, 11),
          time: userAlarm.alarm_start,
        },
      ];

      // console.log(alarmArray);
      // console.log(userAlarm.alarm_start);

      // want to create the alarms for all days of an alarm's total days
      // create a for loop that ends when index reaches total days

      for (let i = 2; i <= totalDays; i++) {
        const nextDay = new Date(userAlarm.updated_at);
        nextDay.setDate(nextDay.getDate() + i);

        // need the hour and time to add within time property in alarm array
        let hour;
        let minute;

        // conditional of minutes at 00
        if (parseInt(userAlarm.alarm_start.substring(3, 5)) === 0) {
          hour = parseInt(userAlarm.alarm_start.substring(0, 2)) - 1;
          minute = 60 - userAlarm.alarm_increment * (i - 1);
          // loop while j is less than difference in hours?
          for (
            // constant can be set at 1 because hour variable has already subtracted 1 hour
            let j = 1;
            j <
            parseInt(userAlarm.alarm_start.substring(0, 2)) -
              parseInt(userAlarm.alarm_end.substring(0, 2));
            j++
          ) {
            // if minutes are less than 0 , decrement hour and reset minutes to 60
            if (minute < 0) {
              hour--;
              minute = 60 + minute;
            }
          }
          // console.log(hour, minute);
          // set the alarm array object with each new date and time and push into alarm array
          alarmArray.push({
            date: JSON.stringify(nextDay).substring(1, 11),
            time: `${hour.toString().padStart(2, 0)}:${minute
              .toString()
              .padStart(2, 0)}`,
          });

          // console.log(alarmArray);
        } else {
          // conditional for all other minutes
          hour = parseInt(userAlarm.alarm_start.substring(0, 2));
          minute =
            parseInt(userAlarm.alarm_start.substring(3, 5)) -
            userAlarm.alarm_increment * (i - 1);

          // loop while j is less than difference in hours?
          for (
            // set constant at 0 because hour variable has no changed yet
            let j = 0;
            j <
            parseInt(userAlarm.alarm_start.substring(0, 2)) -
              parseInt(userAlarm.alarm_end.substring(0, 2));
            j++
          ) {
            // if minutes are less than 0 , decrement hour and reset minutes to 60
            if (minute < 0) {
              hour--;
              minute = 60 + minute;
            }
          }
          // console.log(hour, minute);
          // set the alarm array object with each new date and time and push into alarm array
          alarmArray.push({
            date: JSON.stringify(nextDay).substring(1, 11),
            time: `${hour.toString().padStart(2, 0)}:${minute
              .toString()
              .padStart(2, 0)}`,
          });
        }
      }
      // create today date, find date in the set alarm array that matches today date, and set the trigger to that alarm array object

      const today =
        String(new Date().getFullYear()) +
        "-" +
        // today I learned that JavaScript Date months begin at 0 and end at 11
        String(new Date().getMonth() + 1).padStart(2, "0") +
        "-" +
        String(new Date().getDate());

      // console.log(today);
      // console.log(alarmArray);

      const currentAlarm = alarmArray.find((alarm) => alarm.date === today);
      // currentAlarm will be undefined on the first day where the alarm is set
      // console.log(currentAlarm);
      if (currentAlarm) {
        setAlarmTrigger(currentAlarm);
      } else if (
        !currentAlarm &&
        alarmArray.find((alarm) => today > alarm.date)
      ) {
        setAlarmTrigger({
          date: new Date(),
          time: userAlarm.alarm_end,
        });
      } else {
        setAlarmTrigger(null);
      }

      setAllAlarms(alarmArray);
      setAlarmTomorrow(alarmArray.find((alarm) => alarm.date > today));
      // console.log(allAlarms);
      // console.log(alarmTomorrow); delayed update
      // console.log(userAlarm.alarm_start); delayed update
    }
  }, [refresh, loaded]);

  // console.log(userAlarm.updated_at);
  // console.log(alarmTomorrow); delayed update
  // console.log(userAlarm.alarm_start); updates immediately

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
        children={() => (
          <Alarm
            user={user}
            userAlarm={userAlarm}
            allAlarms={allAlarms}
            alarmTomorrow={alarmTomorrow}
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
        name="Set Alarm"
        children={() => (
          <SetAlarm
            user={user}
            userAlarm={userAlarm}
            setRefresh={setRefresh}
            setUserAlarm={setUserAlarm}
            setAlarmTomorrow={setAlarmTomorrow}
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
        children={() => (
          <Settings user={user} setUser={setUser} userAlarm={userAlarm} />
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
    </Tab.Navigator>
  );
}
