import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Alarm from "./Alarm";
import SetAlarm from "./SetAlarm";
import Settings from "./Settings";

export default function Home() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Alarm" component={Alarm} />
      <Tab.Screen name="Set Alarm" component={SetAlarm} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
