import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookEditScreen: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const titleInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const inputElement = titleInputRef.current!;
    console.log('Title:', inputElement.value);
  };

  return (
    <div className="book-edit-screen">
      <h2>Edit Book: {isbn}</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            ref={titleInputRef}
            type="text"
            placeholder="Enter book title"
            required
            minLength={5}
          />
        </div>
        <button type="submit">Save</button>
        <Link to={`/books/${isbn}`}>
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default BookEditScreen;
