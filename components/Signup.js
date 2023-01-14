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

export default function Signup() {
  // const handleSignup = () => {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            passwordConfirmation: "",
          }}
          // onSubmit={handleSignup}
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
            <View>
              <Text style={[globalStyles.text, { color: "black" }]}>Email</Text>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.input}
              />
              <Text style={[globalStyles.text, { color: "black" }]}>Name</Text>
              <TextInput
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
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
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}
