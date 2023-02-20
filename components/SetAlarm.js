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

export default function SetAlarm({
  user,
  userAlarm,
  setRefresh,
  setUserAlarm,
}) {
  const [alarmName, setAlarmName] = useState("");
  const [alarmStart, setAlarmStart] = useState("");
  const [alarmEnd, setAlarmEnd] = useState("");
  const [alarmIncrement, setAlarmIncrement] = useState("");

  const handleAlarmName = (value) => setAlarmName(value);
  const handleAlarmStart = (value) => setAlarmStart(value);
  const handleAlarmEnd = (value) => setAlarmEnd(value);
  const handleAlarmIncrement = (value) => setAlarmIncrement(value);

  const handleAlarm = async () => {
    if (
      parseInt(alarmStart.substring(0, 2)) <
        parseInt(alarmEnd.substring(0, 2)) ||
      (parseInt(alarmStart.substring(0, 2)) ===
        parseInt(alarmEnd.substring(0, 2)) &&
        parseInt(alarmStart.substring(3, 5)) <
          parseInt(alarmEnd.substring(3, 5)))
    ) {
      Alert.alert("Start time must be greater than end time");
    } else {
      if (!userAlarm) {
        await fetch("https://8dd3-76-14-68-51.ngrok.io/alarms", {
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
        await fetch(
          `https://8dd3-76-14-68-51.ngrok.io/alarms/${userAlarm.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              alarm_name: alarmName,
              alarm_start: alarmStart,
              alarm_end: alarmEnd,
              alarm_increment: alarmIncrement,
              is_disabled: false,
            }),
          }
        );
        Alert.alert("Alarm has been updated");
        const updatedAlarmResponse = await fetch(
          `https://8dd3-76-14-68-51.ngrok.io/alarms/${userAlarm.id}`
        );
        if (updatedAlarmResponse.ok) {
          const updatedAlarm = await updatedAlarmResponse.json();
          setUserAlarm(updatedAlarm);
        } else {
          updatedAlarmResponse.json().catch((err) => {
            console.log(err);
          });
        }
      }
      setRefresh((refresh) => !refresh);
      // bug here , previous alarmTomorrow state is used throughout the application (userAlarm updates correctly) because
      // useeffect alarm fetch of created or updated data occurs after initial rerender
      // fixed by fetching data and updating state in handle request, leaving notes here as learning reminders
      // second bug where alarmTomorrow state is undefined on create, but on update the render updates state correctly?
    }
  };

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
