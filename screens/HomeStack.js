import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BooksList from "./BooksList";
import BookDetail from "./BookDetail";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BooksList" component={BooksList} />
      <Stack.Screen name="BookDetail" component={BookDetail} />
    </Stack.Navigator>
  );
}
