import { Link, useLoaderData } from "react-router-dom";
import { Book } from "../domain/book/Book";

export const BookDetailScreen = () => {
  // const { isbn } = useParams<{ isbn: string }>();
  // const { state, book } = useBook(isbn || "");
  // if (state === "loading") return <div>Loading...</div>;

  const book = useLoaderData() as Book;

  return (
    <div className="book-detail-screen">
      <Link to="/books">
        <span>⬅️ </span>Back to books
      </Link>
      <img src={book.cover} alt={book.title} />
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <div className="text-meta">by {book.author}</div>
      <small>
        {book.isbn} | {book.numPages} pages
      </small>
      <h2 className="m-top m-bottom">{book.price}</h2>
      <p className="m-top">{book.abstract}</p>
    </div>
  );
};
