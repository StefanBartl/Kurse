import { Book } from "./Book";

export const fetchBooks = () => {
  return fetch(`${process.env.REACT_APP_URL_API}/books`).then((res) =>
    res.json()
  ) as Promise<Book[]>;
};

export const fetchBook = (isbn: string) => {
  const result = fetch(`http://localhost:4730/books/${isbn}`).then((res) =>
    res.json()
  );
  return result as Promise<Book>;
};
