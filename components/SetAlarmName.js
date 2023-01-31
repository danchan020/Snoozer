import { StyleSheet, View, Text, TextInput } from "react-native";
import { globalStyles } from "../styles/global";

export default function SetAlarmName() {
  return (
    <View>
      <Text style={[globalStyles.text, { marginTop: 50 }]}>Set Alarm Name</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    borderRadius: 7,
    borderColor: "black",
    borderWidth: "1px",
    backgroundColor: "#8a91ce",
  },
});
