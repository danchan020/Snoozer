import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import AnalogClock from "./AnalogClock";

export default function Alarm() {
  const [second, setSecond] = useState("");
  const [minute, setMinute] = useState("");
  const [hour, setHour] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(new Date().getHours().toString().padStart(2, 0));
      setMinute(new Date().getMinutes().toString().padStart(2, 0));
      setSecond(new Date().getSeconds().toString().padStart(2, 0));
    }, 1000);
    // console.log(interval);
    // console.log(hour);
    // console.log(minute);
    // console.log(second);
    //   clearInterval(interval);
  }, [second]);

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.text, styles.title]}>Hi User!</Text>
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
        {/* {hour > 12 ? hour - 12 : hour} */}
        {hour}:{minute}:{second}
      </Text>
      <Text>Alarm name: </Text>
      <View>
        <View>
          <Text>Start</Text>
          <Text>Time</Text>
        </View>
        <View>
          <Text>Start</Text>
          <Text>Time</Text>
        </View>
        <View>
          <Text>Start</Text>
          <Text>Time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    fontSize: 35,
  },

  digitalClock: {
    width: 180,
    fontSize: 38,
    borderColor: "white",
    borderWidth: 1.5,
    marginVertical: 10,
    paddingBottom: 3,
    backgroundColor: "#6770af",
  },
});
