import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <View style={styles.container}>
          <Text>Snoozer</Text>
          <Text>Improve your sleeping patterns</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
