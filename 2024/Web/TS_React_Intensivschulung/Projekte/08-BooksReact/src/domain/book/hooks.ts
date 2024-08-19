import { useState, useEffect } from "react";
import { Book } from "./Book";
import { fetchBooks } from "./api";
import { FetchState } from "./FetchState";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [state, setState] = useState<FetchState>("initial");
  const [error, setError] = useState<any>();
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const refresh = () => {
    setLastRefresh(Date.now);
  };

  useEffect(() => {
    setState("loading");
    fetchBooks()
      .then((books) => {
        setBooks(books);
        setState("success");
      })
      .catch((err) => {
        setError(err);
        setState("error");
      });
  }, [lastRefresh]);

  return {
    books,
    state,
    error,
    refresh,
  };
};
