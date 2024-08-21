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


export const updateBook = async (book: Partial<Book>): Promise<void> => {
 
  const response = await fetch(`http://localhost:4730/books/${book.isbn}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error("Update book fehlerhaft....");
  }



};