import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";

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
    console.log(interval);
    console.log(hour);
    console.log(minute);
    console.log(second);
    //   clearInterval(interval);
  }, [second]);

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.text, styles.digitalClock]}>
        {hour}:{minute}:{second}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  digitalClock: {
    width: 180,
    fontSize: 38,
    borderColor: "white",
    borderWidth: 2.5,
    color: "black",
  },
});
