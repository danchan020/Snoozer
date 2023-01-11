import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

export default function Landing({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>Hello World</Text>
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
    </SafeAreaView>
  );
}
