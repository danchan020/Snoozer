import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/global";

export default function Settings({ user, setUser, userAlarm }) {
  const navigation = useNavigation();

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        // console.log(response);
        // console.log("HELLO");
        setUser(null);
        navigation.navigate("Landing");
      }
    });
  };

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity
        onPress={handleLogout}
        style={[globalStyles.button, { marginTop: 20 }]}
      >
        <Text style={globalStyles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
