import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function BookDetail({ route }) {
  const { book } = route.params;

  const borrowBook = async () => {
    try {
      const borrowedBooksCollection = collection(db, "borrowedBooks");

      // Check if the book already exists in the borrowedBooks collection
      const q = query(borrowedBooksCollection, where("id", "==", book.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Already Borrowed", `You have already borrowed "${book.name}".`);
        return;
      }

      // Check if the user has already borrowed 3 books
      const allBorrowedBooksSnapshot = await getDocs(borrowedBooksCollection);
      const borrowedBooksCount = allBorrowedBooksSnapshot.docs.length;

      if (borrowedBooksCount >= 3) {
        Alert.alert("Borrowing Limit Reached", "You cannot borrow more than 3 books at a time.");
        return;
      }

      // If under limit and not already borrowed, add the book to Firestore
      await addDoc(borrowedBooksCollection, book);
      Alert.alert("Success", `You have borrowed "${book.name}"!`);
    } catch (error) {
      Alert.alert("Error", "Failed to borrow the book. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>by {book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Text style={styles.summary}>{book.summary}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Borrow Book" onPress={borrowBook} color="#0d6efd" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: "#495057",
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    color: "#868e96",
    marginBottom: 16,
  },
  summary: {
    fontSize: 14,
    color: "#6c757d",
    lineHeight: 20,
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 16,
    alignSelf: "center",
  },
});
