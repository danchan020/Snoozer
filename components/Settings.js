import {
  Alert,
  Keyboard,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { globalStyles } from "../styles/global";

export default function Settings({
  user,
  setUser,
  userAlarm,
  setUserAlarm,
  setRefresh,
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
    if (values.username.length === 0) {
      Alert.alert("Username is required");
    } else {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data);
          });
          Alert.alert("Username changed successfully.");
        } else {
          response.json().then((errors) => alert(errors.errors));
        }
      });
      setRefresh((refresh) => !refresh);
    }
  };

  const handleChangeEmail = (values) => {
    if (values.email.length === 0 || !values.email.includes("@")) {
      Alert.alert("Please enter a valid email");
    } else {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data);
          });
          Alert.alert("Email changed successfully.");
        } else {
          response.json().then((errors) => alert(errors.errors));
        }
      });
      setRefresh((refresh) => !refresh);
    }
  };

  const handleChangePassword = (values) => {
    if (
      values.oldPassword.length === 0 ||
      values.password.length === 0 ||
      values.passwordConfirmation.length === 0
    ) {
      Alert.alert("Password fields must be completed");
    } else if (values.password !== values.passwordConfirmation) {
      Alert.alert("Password fields do not match:");
    } else {
      fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUser(data);
          });
          Alert.alert("Password has been updated.");
        } else {
          response.json().then((errors) => alert(errors.errors));
        }
      });
      setRefresh((refresh) => !refresh);
    }
  };

  const handleAlarmSwitch = () => {
    fetch(`http://localhost:3000/alarms/${userAlarm.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_disabled: `${!userAlarm.is_disabled}` }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setUserAlarm(data);
        });
      } else {
        response.json().then((errors) => alert(errors.errors));
      }
    });
    setRefresh((refresh) => !refresh);
  };

  return (
    <View style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              username: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleChangeUsername(values);
              resetForm();
            }}
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
                  <Text style={[globalStyles.text, { fontSize: 21 }]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleChangeEmail(values);
              resetForm();
            }}
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
                  <Text style={[globalStyles.text, { fontSize: 21 }]}>
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              passwordConfirmation: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleChangePassword(values);
              resetForm();
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <View style={styles.passwordForm}>
                <Text style={[globalStyles.text, { fontSize: 23 }]}>
                  {" "}
                  Change Password{" "}
                </Text>
                <TextInput
                  onChangeText={handleChange("oldPassword")}
                  onBlur={handleBlur("oldPassword")}
                  value={values.oldPassword}
                  style={styles.input}
                  placeholder="Enter old password"
                  placeholderTextColor="#cecece"
                />
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#cecece"
                />
                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#cecece"
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[globalStyles.button, { marginTop: 12 }]}
                >
                  <Text style={[globalStyles.text, { fontSize: 21 }]}>
                    Update Password
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <View style={styles.switch}>
            <Text
              style={[globalStyles.text, { fontSize: 23, marginBottom: 5 }]}
            >
              {" "}
              Disable Alarm?{" "}
            </Text>
            {userAlarm ? (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={userAlarm.is_disabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleAlarmSwitch}
                value={userAlarm.is_disabled}
              />
            ) : (
              <Text style={[globalStyles.text, { fontSize: 23 }]}>
                {" "}
                "Configure your alarm to enable this feature"{" "}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              globalStyles.button,
              { marginTop: 20, width: 170, alignSelf: "center" },
            ]}
          >
            <Text style={[globalStyles.text, { fontSize: 21 }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
  },
  form: {
    flexDirection: "row",
    margin: 5,
    alignItems: "center",
  },
  passwordForm: {
    flexDirection: "column",
    alignItems: "center",
    margin: 15,
  },
  input: {
    margin: 12,
    height: 40,
    width: 200,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: "1px",
    backgroundColor: "#8a91ce",
  },
  switch: {
    alignItems: "center",
    margin: 10,
  },
});
