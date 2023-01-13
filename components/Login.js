import { Formik } from "formik";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";

export default function Login() {
  return (
    <View>
      <Formik initialValues={{ email: "", password: "" }}>
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
            <TextInput />
            <Text>Password</Text>
            <TextInput />
          </View>
        )}
      </Formik>
    </View>
  );
}
