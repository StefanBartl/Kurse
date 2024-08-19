import { Book } from "./Book";

export const fetchBooks = () => {
  return fetch(`${process.env.REACT_APP_URL_API}/books`).then((res) =>
    res.json()
  ) as Promise<Book[]>;
};

export const fetchBook = async (isbn: string): Promise<Book> => {
  const response = await fetch(`http://localhost:4730/books/${isbn}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book');
  }
  return response.json();
};