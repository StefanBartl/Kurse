import { useEffect } from "react";
import { AppHeader } from "./components/AppHeader";
import { useBooks } from "./domain/book/hooks";
import { Outlet } from "react-router-dom";

function App() {
  const { refresh } = useBooks();
  //const { books, state, error, refresh } = useBooks();

  useEffect(() => {
    const intervalId = setInterval(refresh, 30000);
    return () => clearInterval(intervalId);
  });

  return (
    <div className="App">
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default App;

/*
{state === "loading" && (
  <h2 className="text-meta m-top">Loading books...</h2>
)}
{state === "error" && <h2 className="error m-top">{error.message}</h2>}
{state === "success" && <BookList books={books} />}

*/