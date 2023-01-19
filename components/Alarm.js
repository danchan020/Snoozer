import { useState, useEffect } from "react";
import { View, Text } from "react-native";
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
    // return () => {clearInterval(interval)};
  }, [second]);

  return (
    <View style={globalStyles.container}>
      <Text>Alarm</Text>
    </View>
  );
}
