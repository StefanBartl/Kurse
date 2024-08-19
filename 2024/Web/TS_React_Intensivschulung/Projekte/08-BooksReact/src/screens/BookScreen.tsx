// src/screens/BooksScreen.tsx
import React, { useEffect, useState } from 'react';
import {BookList} from '../components/BookList';
import { fetchBooks } from '../domain/book/api';
import { Book } from '../domain/book/Book';

const BooksScreen: React.FC = () => {
    
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks().then(setBooks).catch(err => console.error(err));
  }, []);

  return (
    <div className="book-screen">
      <h2>Books</h2>
      <BookList books={books} />
    </div>
  );
};

export default BooksScreen
