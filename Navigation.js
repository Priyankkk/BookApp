import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BooksList from "./screens/BooksList";
import BookDetail from "./screens/BookDetail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BooksList" component={BooksList} options={{ title: "Books List" }} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ title: "Book Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
