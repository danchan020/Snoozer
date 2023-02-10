import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { useState } from "react";
import SetAlarmName from "./SetAlarmName";
import SetAlarmStart from "./SetAlarmStart";
import SetAlarmEnd from "./SetAlarmEnd";
import SetIncrement from "./SetIncrement";
import { globalStyles } from "../styles/global";

export default function SetAlarm() {
  const [alarmName, setAlarmName] = useState("");
  const [alarmStart, setAlarmStart] = useState("");
  const [alarmEnd, setAlarmEnd] = useState("");
  const [alarmIncrement, setAlarmIncrement] = useState("");

  const handleAlarmName = (value) => setAlarmName(value);
  const handleAlarmStart = (value) => setAlarmStart(value);
  const handleAlarmEnd = (value) => setAlarmEnd(value);
  const handleAlarmIncrement = (value) => setAlarmIncrement(value);

  console.log(alarmStart);
  console.log(alarmEnd);

  // const handleAlarm = async () => {
  //   await fetch("http://localhost:3000/alarms", {
  //     method: "POST",
  //     header: { "Content-Type": "application/json" },
  //     // body: JSON.stringify
  //   });
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <SetAlarmName handleAlarmName={handleAlarmName} />
        <View style={styles.container}>
          <SetAlarmStart handleAlarmStart={handleAlarmStart} />
          <SetAlarmEnd handleAlarmEnd={handleAlarmEnd} />
        </View>
        <SetIncrement handleAlarmIncrement={handleAlarmIncrement} />
        <TouchableOpacity
          onPress={() => handleAlarm()}
          style={[globalStyles.button, { width: 220, borderRadius: 17 }]}
        >
          <Text style={globalStyles.text}>Set Alarm ⏰</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginTop: 35 },
});
