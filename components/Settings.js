import {
  Alert,
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";

export default function Settings({
  user,
  setUser,
  userAlarm,
  setRefresh,
  refresh,
}) {
  const navigation = useNavigation();

  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        // console.log(response);
        // console.log("HELLO");
        setUser(null);
        navigation.navigate("Landing");
      }
    });
  };

  const handleChangeUsername = (values) => {
    if (values.email.length === 0 || values.email.includes("@")) {
      Alert.alert("Please enter a valid email");
    } else {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          Alert.alert("Email successfully changed.");
        } else {
          response.json().then((errors) => alert(errors.errors));
        }
      });
      setRefresh((refresh) => !refresh);
    }
  };

  const handleChangeEmail = (values) => {
    if (values.username.length === 0) {
      Alert.alert("Username is required");
    } else {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => setUser(data));
          Alert.alert("Username successfully changed.");
        } else {
          response.json().then((errors) => alert(errors.errors));
        }
      });
      setRefresh((refresh) => !refresh);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              username: "",
            }}
            onSubmit={handleChangeUsername}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <View style={styles.form}>
                <TextInput
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  style={styles.input}
                  placeholder={`Username: ${user.username}`}
                  placeholderTextColor="#cecece"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={globalStyles.button}
                >
                  <Text style={globalStyles.text}>Change</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={handleChangeEmail}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <View style={styles.form}>
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={styles.input}
                  placeholder={`Email: ${user.email}`}
                  placeholderTextColor="#cecece"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={globalStyles.button}
                >
                  <Text style={globalStyles.text}>Change</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <TouchableOpacity
            onPress={handleLogout}
            style={[globalStyles.button, { marginTop: 20 }]}
          >
            <Text style={globalStyles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  form: {
    flexDirection: "row",
  },
  input: {
    margin: 10,
    width: 200,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: "1px",
    backgroundColor: "#8a91ce",
  },
});
