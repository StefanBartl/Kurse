import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import { fetchBook } from "./domain/book/api";
import { AboutScreen } from "./screens/AboutScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import BookEditScreen from './screens/BookEditScreen';
import { BooksScreen } from "./screens/BooksScreen";
import { ErrorScreen } from "./screens/ErrorScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "",
        loader: () => redirect("books"),
      },
      {
        path: "books",
        element: <BooksScreen />,
      },
      {
        path: "about",
        element: <AboutScreen />,
      },
      {
        path: "books/:isbn",
        element: <BookDetailScreen />,
        loader: ({ params }) => fetchBook(params.isbn!),
      },
      {
        path: 'books/:isbn/edit',
        element: <BookEditScreen />,
      },
    ],
  },
]);
