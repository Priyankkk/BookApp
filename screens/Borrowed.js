import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";

export default function Borrowed() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Real-time listener for Firestore
  useEffect(() => {
    const borrowedBooksCollection = collection(db, "borrowedBooks");

    const unsubscribe = onSnapshot(borrowedBooksCollection, (snapshot) => {
      const borrowedBooksList = snapshot.docs.map((doc) => ({
        id: doc.id, // Firestore Document ID
        ...doc.data(),
      }));

      console.log("Real-time data fetched:", borrowedBooksList);
      setBorrowedBooks(borrowedBooksList);
    });

    return () => unsubscribe();
  }, []);

  const returnBook = async (bookId) => {
    setIsLoading(true);
    try {
      console.log("Attempting to delete book with ID:", bookId);

      // Query to fetch the document with the given bookId
      const borrowedBooksCollection = collection(db, "borrowedBooks");
      const q = query(borrowedBooksCollection, where("id", "==", bookId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching document found for ID:", bookId);
        Alert.alert("Error", "Book not found in the borrowed list.");
        setIsLoading(false);
        return;
      }

      // Get the Firestore document ID
      const docId = querySnapshot.docs[0].id;
      console.log("Deleting document with Firestore ID:", docId);

      // Delete the document from Firestore
      await deleteDoc(doc(db, "borrowedBooks", docId));
      console.log("Book deleted successfully:", docId);

      // Update the UI state immediately
      setBorrowedBooks((prevBooks) => prevBooks.filter((book) => book.id !== docId));

      Alert.alert("Success", "Book returned successfully!");
    } catch (error) {
      console.error("Error returning the book:", error);
      Alert.alert("Error", `Failed to return the book. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0d6efd" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {borrowedBooks.length === 0 && !isLoading ? (
        <Text style={styles.emptyText}>No books borrowed yet!</Text>
      ) : (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.bookName}>{item.name}</Text>
              <Button
                title="Return Book"
                onPress={() => returnBook(item.id)}
                color="#dc3545"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  bookName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#868e96",
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#495057",
  },
});
