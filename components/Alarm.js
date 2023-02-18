import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import AnalogClock from "./AnalogClock";

export default function Alarm({ user, userAlarm, allAlarms, alarmTomorrow }) {
  const [second, setSecond] = useState("");
  const [minute, setMinute] = useState("");
  const [hour, setHour] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().getHours().toString().padStart(2, 0));
      setMinute(new Date().getMinutes().toString().padStart(2, 0));
      setSecond(new Date().getSeconds().toString().padStart(2, 0));
    }, 1000);
  }, [second]);

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.text, styles.title]}>
        Hello {user.username}!
      </Text>
      <AnalogClock
        colorClock="#414999"
        colorNumber="#D9E4DD"
        colorCenter="#D9E4DD"
        colorHour="#FF8AAE"
        colorMinutes="#F9CEEE"
        autostart={true}
        showSeconds
      />
      <Text style={[globalStyles.text, styles.digitalClock]}>
        {hour}:{minute}:{second}
      </Text>
      {userAlarm && !userAlarm.is_disabled ? (
        <>
          <Text
            style={[globalStyles.text, { marginVertical: 8, fontSize: 21 }]}
          >
            Alarm Name: {userAlarm.alarm_name}{" "}
          </Text>
          <View style={styles.alarmContainer}>
            <View style={styles.alarmCard}>
              <Text style={[globalStyles.text, { fontSize: 22 }]}>Start</Text>
              <Text style={[globalStyles.text, { fontSize: 22 }]}>
                {userAlarm.alarm_start}
              </Text>
            </View>
            <View style={styles.alarmCard}>
              <Text style={[globalStyles.text, { fontSize: 22 }]}>
                Increment
              </Text>
              <Text style={[globalStyles.text, { fontSize: 22 }]}>
                {userAlarm.alarm_increment} min(s)
              </Text>
            </View>
            <View style={styles.alarmCard}>
              <Text style={[globalStyles.text, { fontSize: 22 }]}>Goal</Text>
              <Text style={[globalStyles.text, { fontSize: 22 }]}>
                {userAlarm.alarm_end}
              </Text>
            </View>
          </View>
          <Text
            style={[
              globalStyles.text,
              { paddingVertical: 5, marginTop: 5, fontSize: 21 },
            ]}
          >
            Tomorrow's alarm: {alarmTomorrow ? alarmTomorrow.date : "Everyday"}{" "}
            at {alarmTomorrow ? alarmTomorrow.time : userAlarm.alarm_end}
          </Text>
          {alarmTomorrow ? (
            <View>
              <Text
                style={[
                  globalStyles.text,
                  { paddingVertical: 5, fontSize: 21 },
                ]}
              >
                This is day {allAlarms.indexOf(alarmTomorrow)} of your progress.
              </Text>
              <Text
                style={[
                  globalStyles.text,
                  { paddingVertical: 5, fontSize: 21 },
                ]}
              >
                {allAlarms.length - allAlarms.indexOf(alarmTomorrow)} day(s)
                left before you reach your goal!
              </Text>
            </View>
          ) : (
            <Text style={globalStyles.text}>You have reached your goal!</Text>
          )}
        </>
      ) : (
        <Text style={globalStyles.text}>Please set or enable your alarm</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 35,
  },

  digitalClock: {
    width: 180,
    fontSize: 38,
    borderColor: "whitesmoke",
    borderWidth: 1.5,
    marginVertical: 15,
    paddingBottom: 3,
    backgroundColor: "#6770af",
  },

  alarmContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
  },
  alarmCard: {
    width: 115,
    paddingVertical: 5,
    borderColor: "whitesmoke",
    borderWidth: 1.5,
    borderRadius: 15,
    backgroundColor: "#6770af",
  },
});
