import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllGames from "./screens/AllGames";
import GameScreen from "./screens/GameScreen";
import { StatusBar } from "expo-status-bar";
// import AdsScreen from "./screens/AdsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
          name="ADS"
          component={AdsScreen}
        /> */}
          <Stack.Screen
            name="AllGames"
            component={AllGames}
            options={{
              headerTitle: "All Games",
              // headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            options={{
              headerTitle: "Score Table",
              headerTitleContainerStyle: {
                left: 50,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
