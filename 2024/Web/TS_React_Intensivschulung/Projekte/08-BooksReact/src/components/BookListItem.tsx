import { useState } from "react";
import { Book } from "../domain/book/Book";
import { Hideable } from "./Hideable";
import { LikeCounter } from "./LikeCounter";
import { NavLink } from 'react-router-dom';

export interface BookListItemProps {
  book: Book;
}

const getPriceRating = (price: string) => {
  if (!price) return;
  const priceNumber = parseInt(price.substring(1));
  if (isNaN(priceNumber)) return "";
  if (priceNumber <= 10) return "$";
  if (priceNumber <= 30) return "$$";
  return "$$$";
};

export const BookListItem = ({ book }: BookListItemProps) => {
  const [likes, setLikes] = useState(0);
  const isFree = book.price === "$0.00";

  return (
    <div className={`book-list-item ${isFree ? "book-list-item_free" : ""}`}>
      <h2>
        {likes >= 5 && <span className="icon_entry">⭐ </span>}
        {isFree && <span>💰 </span>}
        {book.title}
      </h2>
      <h3>{book.subtitle}</h3>
      {!isFree && (
        <div style={{ color: "green" }}>{getPriceRating(book.price)}</div>
      )}
      <div className="text-meta">by {book.author}</div>
      <LikeCounter likes={likes} onLikesChange={setLikes} />
      <Hideable>
        <p>{book.abstract}</p>
      </Hideable>
      <NavLink to={`/books/${book.isbn}`}>siehe Details</NavLink>
    </div>
  );
};
