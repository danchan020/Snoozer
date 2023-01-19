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
      setMinute(new Date().getHours().toString().padStart(2, 0));
      setSecond(new Date().getHours().toString().padStart(2, 0));
    }, 1000);
    // return () => {clearInterval(interval)};
  }, [second]);

  return (
    <View style={globalStyles.container}>
      <Text>Alarm</Text>
    </View>
  );
}
