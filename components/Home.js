import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Alarm" component={Home} />
      <Tab.Screen name="Set Alarm" component={SetAlarm} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
