import { Formik } from "formik";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../styles/global";

export default function Login() {
  // const handleLogin = () => {}

  return (
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
          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              value={values.email}
            />
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              value={values.password}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
