import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import BooksList from "./screens/BooksList";
import BookDetail from "./screens/BookDetail";
import Borrowed from "./screens/Borrowed";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BooksList" component={BooksList} options={{ title: "Books List" }} />
    <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: "Book Details" }} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Borrowed" component={Borrowed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
