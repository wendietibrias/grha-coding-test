import { IBookResponse } from "../../../../interfaces/api_response/book.response";
import { Link } from "react-router-dom";

type BookCardProps = {
    book: IBookResponse,
    onDelete: (id:number)=>void,
    onUpdate: ()=>void
}

const BookCard = ({ book,onDelete,onUpdate }: BookCardProps) => {
    return (
        <div className="book-card-item">
            <div className="book-cover">
                <img src={book.cover_url} alt={book.title}/>
            </div>
            <div className="book-description">
                <h4>{book.title}</h4>
                <p>{book.category}</p>
            </div>
            <div className="book-action mt-2">
                 <button onClick={() => onDelete(book.id)} className="book-action-delete">Delete</button>
                 <Link className="book-action-detail" to={`/book/${book.id}`}>Detail</Link>
                 <Link className="book-action-update" to={`/book/update/${book.id}`}>Update</Link>
            </div>
        </div>
    )
}

export default BookCard;