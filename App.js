import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          children={() => {
            <Login />;
          }}
        />
        <Stack.Screen
          name="Signup"
          children={() => {
            <Signup />;
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
