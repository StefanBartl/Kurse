/*
In a file called src/api.ts implement a function called fetchBooks that returns the response to the above get request as a Promise<Book[]>
Use the fetchBooks function in your main.ts file to fetch and console.log the list of books.
*/

import { Book } from "./book";

export const fetchBooks = async () :Promise<Book[]> => {

  const url = "http://localhost:4730/books"
  const response = await fetch(url);
  if(!response.ok){
    throw new Error("Fail");
  }

  return await response.json();
  // oder
  // const books: Book[] = await response.json();
  // return books
}
