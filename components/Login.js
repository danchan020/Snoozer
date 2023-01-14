import { useState } from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Login() {
  const [focus, setFocus] = useState(false);
  const customStyles = focus ? styles.inputfocused : styles.input;

  // const handleLogin = () => {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{ email: "", password: "" }}
          // onSubmit={handleLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <View style={styles.container}>
              <Text style={[globalStyles.text, { color: "black" }]}>Email</Text>
              <TextInput
                onChangeText={handleChange("email")}
                // After research, I still dont quite understand blur/touched in formik... may have to revisit these concepts.
                onBlur={() => {
                  handleBlur("email");
                  setFocus(false);
                }}
                onFocus={() => setFocus(true)}
                value={values.email}
                style={customStyles}
              />
              <Text style={[globalStyles.text, { color: "black" }]}>
                Password
              </Text>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={() => {
                  handleBlur("password");
                  setFocus(false);
                }}
                onFocus={() => setFocus(true)}
                value={values.password}
                style={customStyles}
              />
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
    borderRadius: 3,
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
    borderRadius: 3,
    borderColor: "#414999",
    borderWidth: "1px",
    backgroundColor: "#fff",
  },

  container: {
    paddingTop: "10%",
  },
});
