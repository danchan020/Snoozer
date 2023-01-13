import { Formik } from "formik";
import { View, Text } from "react-native";

export default function Signup() {
  return (
    <View>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          passwordConfirmation: "",
        }}
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
            <TextInput />
            <Text>Name</Text>
            <TextInput />
            <Text>Password</Text>
            <TextInput />
            <Text>Confirm Password</Text>
            <TextInput />
          </View>
        )}
      </Formik>
    </View>
  );
}
