import { Book } from "../domain/book/Book";
import { ThemeContext } from "../domain/theme/ThemeContext";
import { BookListItem } from "./BookListItem";

const localTheme = { primaryColor: "steelblue", setPrimaryColor: () => {} };

interface BookListProps {
  books: Book[];
}

const getMinPages = (books: Book[]) => {
  return books.reduce((minPages, book) => {
    if (book.numPages < minPages) return book.numPages;
    return minPages;
  }, Number.MAX_SAFE_INTEGER);
};

const getMaxPages = (books: Book[]) => {
  return books.reduce((maxPages, book) => {
    if (book.numPages > maxPages) return book.numPages;
    return maxPages;
  }, 0);
};

export const BookList = ({ books }: BookListProps) => {
  return (
    <ThemeContext.Provider value={localTheme}>
      <div className="book-list">
        <small className="text-meta">
          Showing {books.length} books with {getMinPages(books)} to{" "}
          {getMaxPages(books)} pages.
        </small>
        {books.map((b) => (
          <BookListItem key={b.id} book={b} />
        ))}
      </div>
    </ThemeContext.Provider>
  );
};
