// src/screens/BookDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, redirect } from 'react-router-dom';  //navigate??
import { Book } from '../domain/book/Book';
import { fetchBook } from '../domain/book/api';

const BookDetailScreen: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<Book | null>(null);
  //const navigate = useNavigate();

  useEffect(() => {
    if (isbn) {
      fetchBook(isbn)
        .then(setBook)
        .catch(err => console.error(err));
    }
  }, [isbn]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail-screen">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Price:</strong> {book.price}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Description:</strong> {book.abstract}</p>
      <button onClick={() => redirect('/books')}>Zurück zu Books</button>
    </div>
  );
};

export default BookDetailScreen;
