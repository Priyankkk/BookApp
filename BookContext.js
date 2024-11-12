import React, { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    if (borrowedBooks.length >= 3) {
      alert("You cannot borrow more than three books at a time.");
      return;
    }
    setBorrowedBooks([...borrowedBooks, book]);
  };

  const returnBook = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== bookId));
  };

  return (
    <BookContext.Provider value={{ books, setBooks, borrowedBooks, borrowBook, returnBook }}>
      {children}
    </BookContext.Provider>
  );
};
