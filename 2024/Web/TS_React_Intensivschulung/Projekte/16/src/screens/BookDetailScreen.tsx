import { Link, useLoaderData } from "react-router-dom";
import { Book } from "../domain/book/Book";

export const BookDetailScreen: React.FC = () => {
  const book = useLoaderData() as Book;

  return (
    <div className="book-detail-screen">
      <Link to="/books">
        <span>⬅️ </span>Zurück zu Books
      </Link>
      <img src={book.cover} alt={book.title} />
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <div className="text-meta">by {book.author}</div>
      <small>
        {book.isbn} | {book.numPages} Seiten
      </small>
      <h2 className="m-top m-bottom">{book.price}</h2>
      <p className="m-top">{book.abstract}</p>
      <Link to={`/books/${book.isbn}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/books">
        <button>Zurück zu Books</button>
      </Link>
    </div>
  );
}
