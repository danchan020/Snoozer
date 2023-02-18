import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { globalStyles } from "../styles/global";

export default function Signup({ setUser }) {
  const navigation = useNavigation();

  const handleSignup = (values) => {
    // console.log(values);
    fetch("http://192.168.1.17:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // console.log(data);
          setUser(data);
          navigation.navigate("Home");
        });
      } else {
        response.json().then((errors) => {
          alert(errors.errors);
        });
      }
    });
  }; //still need error handling

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            passwordConfirmation: "",
          }}
          onSubmit={handleSignup}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <View style={styles.container}>
              <Text style={[globalStyles.text, { color: "black" }]}>Email</Text>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
              />
              <Text style={[globalStyles.text, { color: "black" }]}>
                Username
              </Text>
              <TextInput
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                style={styles.input}
              />
              <Text style={[globalStyles.text, { color: "black" }]}>
                Password
              </Text>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={styles.input}
              />
              <Text style={[globalStyles.text, { color: "black" }]}>
                Confirm Password
              </Text>
              <TextInput
                onChangeText={handleChange("passwordConfirmation")}
                onBlur={handleBlur("passwordConfirmation")}
                value={values.passwordConfirmation}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={[globalStyles.button, { marginTop: 20 }]}
              >
                <Text style={globalStyles.text}>Signup</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
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

  inputfocused: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    borderRadius: 7,
    borderColor: "#414999",
    borderWidth: "1px",
    backgroundColor: "#fff",
  },

  container: {
    paddingTop: "10%",
  },
});
