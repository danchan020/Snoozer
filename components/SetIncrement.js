import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";
import increment from "../timePicker/increment";
import { Dropdown } from "react-native-element-dropdown";

export default function SetIncrement() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View>
      <Text style={[globalStyles.text, { marginTop: 20, marginBottom: 10 }]}>
        Increment (min)
      </Text>
      <View>
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && { borderColor: "cornflowerblue" },
          ]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={increment}
          maxHeight={250}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "0" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#6770af",
    height: 50,
    borderColor: "darkgrey",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 18,
    fontFamily: "Sriracha_400Regular",
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: "Sriracha_400Regular",
  },
});
