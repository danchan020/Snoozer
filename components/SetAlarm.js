import {
  Alert,
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

export default function SetAlarm({ user, userAlarm, setRefresh }) {
  const [alarmName, setAlarmName] = useState("");
  const [alarmStart, setAlarmStart] = useState("");
  const [alarmEnd, setAlarmEnd] = useState("");
  const [alarmIncrement, setAlarmIncrement] = useState("");

  const handleAlarmName = (value) => setAlarmName(value);
  const handleAlarmStart = (value) => setAlarmStart(value);
  const handleAlarmEnd = (value) => setAlarmEnd(value);
  const handleAlarmIncrement = (value) => setAlarmIncrement(value);

  // console.log(alarmName);
  // console.log(alarmStart);
  // console.log(alarmEnd);
  // console.log(alarmIncrement);
  // console.log(currentUser);
  // console.log(userAlarm);

  const handleAlarm = async () => {
    if (
      parseInt(startTime.substring(0, 2)) < parseInt(endTime.substring(0, 2)) ||
      (parseInt(startTime.substring(0, 2)) ===
        parseInt(endTime.substring(0, 2)) &&
        parseInt(startTime.substring(3, 5)) < parseInt(endTime.substring(3, 5)))
    ) {
      Alert.alert("Start time must be greater than end time.");
    } else {
      if (!userAlarm) {
        await fetch("http://localhost:3000/alarms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            alarm_name: alarmName,
            alarm_start: alarmStart,
            alarm_end: alarmEnd,
            alarm_increment: alarmIncrement,
            is_disabled: false,
          }),
        });
        Alert.alert("Alarm has been created");
      } else {
        await fetch(`http://localhost:3000/alarms/${userAlarm.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            alarm_name: alarmName,
            alarm_start: alarmStart,
            alarm_end: alarmEnd,
            alarm_increment: alarmIncrement,
            is_disabled: false,
          }),
        });
        Alert.alert("Alarm has been updated");
      }
      setRefresh((refresh) => !refresh);
      // bug here , update is one render delayed, renders previous state (GET BACK TO THIS LATER DONT FORGET)
    }

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
  };
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginTop: 35 },
});
