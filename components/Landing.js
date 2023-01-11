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
          <Image style={styles.logo}></Image>
          <Text style={styles.title}>Snoozer</Text>
          <Text style={globalStyles.text}>Improve your sleeping pattern</Text>
        </View>
        <View style={styles.loginsignup}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={globalStyles.button}
          >
            <Text style={globalStyles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
            style={globalStyles.button}
          >
            <Text style={globalStyles.text}>Signup</Text>
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
  logo: {},
  title: {},
  loginsignup: {
    alignItems: "center",
  },
});
