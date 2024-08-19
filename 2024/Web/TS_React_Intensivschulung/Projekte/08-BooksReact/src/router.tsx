import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";
import BooksScreen from './screens/BookScreen';
import AboutScreen from './screens/AboutScreen';
import ErrorScreen from './screens/ErrorScreen';
import BookDetailScreen from "./screens/BookDetailScreen";
import { fetchBook } from "./domain/book/api";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
        {
            path: '',
            loader: () => redirect('/books')
        },
        {
            path: 'books',
            element: <BooksScreen />
        },
        {
            path: 'books/:isbn',
            loader: ({ params }) => fetchBook(params.isbn!),
            element: <BookDetailScreen />,
          },
        {
            path: 'about',
            element: <AboutScreen />
        }
    ]
  },
]);
