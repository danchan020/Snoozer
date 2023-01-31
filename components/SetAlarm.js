import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import SetAlarmName from "./SetAlarmName";
import SetAlarmStart from "./SetAlarmStart";
import SetAlarmEnd from "./SetAlarmEnd";
import SetIncrement from "./SetIncrement";
import { globalStyles } from "../styles/global";

export default function SetAlarm() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <SetAlarmName />
        <SetAlarmStart />
        {/* <SetAlarmEnd /> */}
        {/* <SetIncrement /> */}
        <TouchableOpacity style={globalStyles.button}>
          <Text style={globalStyles.text}>Set Alarm ⏰</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
