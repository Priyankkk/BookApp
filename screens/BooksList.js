import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function BooksList({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Books List</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("BookDetail", { book: item })}
          >
            <Text style={styles.bookName}>{item.name}</Text>
            <Text style={styles.bookAuthor}>by {item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 16,
    textAlign: "center",
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
  },
  bookAuthor: {
    fontSize: 14,
    color: "#868e96",
    marginTop: 4,
  },
});
