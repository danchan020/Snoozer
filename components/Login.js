import { Formik } from "formik";
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

export default function Login() {
  // const customStyles = isFocused ? styles.inputfocused : styles.input;

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
          }) => (
            <View style={styles.container}>
              <Text style={[globalStyles.text, { color: "black" }]}>Email</Text>
              <TextInput
                onChangeText={handleChange("email")}
                // After research, I still dont quite understand blur/touched in formik... may have to revisit these concepts.
                onBlur={() => {
                  handleBlur("email");
                }}
                // onFocus={setFocus}
                value={values.email}
                style={styles.input}
              />
              <Text style={[globalStyles.text, { color: "black" }]}>
                Password
              </Text>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={() => {
                  handleBlur("password");
                }}
                // onFocus={setFocus}
                value={values.password}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={[globalStyles.button, { marginTop: 20 }]}
              >
                <Text style={globalStyles.text}>Login</Text>
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
