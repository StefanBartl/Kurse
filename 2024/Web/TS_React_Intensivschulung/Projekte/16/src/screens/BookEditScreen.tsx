import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate  } from 'react-router-dom';
import { fetchBook, updateBook } from '../domain/book/api';
import { Book } from '../domain/book/Book';

const BookEditScreen: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const navigate = useNavigate();
  const [book, setBook] = useState<Partial<Book>>({});

  const [subtitle, setSubtitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [numPages, setNumPages] = useState<number>(0);
  const [price, setPrice] = useState<string>('');

  const [isModified, setIsModified] = useState<boolean>(false); 

  useEffect(() => {
    const loadBook = async () => {
      if (!isbn) return;
      try {
        const book = await fetchBook(isbn);
        setTitle(book.title);
        setBook(book);
        setTitle(book.title);
        setSubtitle(book.subtitle);
        setAuthor(book.author);
        setNumPages(book.numPages);
        setPrice(book.price);
      } catch (error) {
        console.error("Fehler bei fetchBook:", error);
      }
    };
    loadBook();
  }, [isbn]);

  const handleChange = (field: string, event: any) => {

    setIsModified(true);

    setTitle(event.target.value);
    if (event.target.value.length >= 5) {
      setTitleError("");
    } else if (touched) {
      setTitleError("The title must be at least 5 characters long");
    }
  };

  const renderError = () => {
    if (titleError && touched) {
      return <p style={{ color: "red" }}>{titleError}</p>;
    }
    return null;
  };



  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (titleError || !isModified) {
        return;
      }
      try {
        await updateBook({ ...book, title });
        navigate(`/books/${isbn}`);
      } catch (error) {
        console.error("Fehler beim Aktualisieren des Buches:", error);
        alert(`Submitted Title: ${title}`)
      }
  };

  const handleBlur = () => {
    if (title.length < 5) {
      setTitleError("Title muss min  5 Zeichen löanf sein");
    }
    setTouched(true);
  };

  return (
    <div className="book-edit-screen">
      <h2>Edit Book: {isbn}</h2>
      <form onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Enter book title"
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={handleBlur}
            style={{ borderColor: titleError ? "red" : "initial" }}
          />
          {titleError && <p style={{ color: "red" }}>{titleError}</p>}
        </div>

        <div>
          <label htmlFor="subtitle">Subtitle</label>
          <input
            id="subtitle"
            type="text"
            value={subtitle}
            placeholder="Enter book subtitle"
            onChange={(e) => handleChange('subtitle', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            placeholder="Enter author name"
            onChange={(e) => handleChange('author', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="numPages">Number of Pages</label>
          <input
            id="numPages"
            type="number"
            value={numPages}
            placeholder="Enter number of pages"
            onChange={(e) => handleChange('numPages', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={price}
            placeholder="$99.99"
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </div>

        <button type="submit" disabled={titleError ? true : !isModified}>Save</button>

        <Link to={`/books/${isbn}`}>
          <button type="button">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default BookEditScreen;


/*




  

  */