import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <View>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/snoozer-logo.png")}
          ></Image>
          <Text style={styles.title}>☁ Snoozer ☁ </Text>
          <Text style={globalStyles.text}>Adjust your sleeping pattern</Text>
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
    margin: 50,
    marginTop: "30%",
    alignItems: "center",
  },
  logo: {
    height: 250,
    width: 300,
    marginBottom: 15,
  },
  title: {
    color: "black",
    fontSize: 48,
    fontFamily: "Sriracha_400Regular",
    paddingBottom: 8,
  },
  loginsignup: {
    alignItems: "center",
  },
});
