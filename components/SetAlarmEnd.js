import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SetAlarmEnd() {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  return (
    <View>
      <Text>End Time</Text>
      <Picker
        selectedValue={hour}
        onValueChange={(itemValue, itemIndex) => setHour(itemValue)}
      >
        {/* <Picker.Item label="Java" value="java" /> */}
      </Picker>
      <Picker
        selectedValue={minute}
        onValueChange={(itemValue, itemIndex) => setMinute(itemValue)}
      >
        {/* <Picker.Item label="Java" value="java" /> */}
      </Picker>
    </View>
  );
}
