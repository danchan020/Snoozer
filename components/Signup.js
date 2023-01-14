import { Formik } from "formik";
import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../styles/global";

export default function Signup() {
  // const handleSignup = () => {}

  return (
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
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              value={values.email}
            />
            <Text>Name</Text>
            <TextInput
              onChangeText={handleChange("name")}
              value={values.name}
            />
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              value={values.password}
            />
            <Text>Confirm Password</Text>
            <TextInput
              onChangeText={handleChange("passwordConfirmation")}
              value={values.passwordConfirmation}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}
