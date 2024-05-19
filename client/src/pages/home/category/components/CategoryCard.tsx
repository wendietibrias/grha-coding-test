import { ICategoryResponse } from "../../../../interfaces/api_response/category.response";
import { Link } from "react-router-dom";

type CategoryCardProps = {
    category: ICategoryResponse,
    onDelete: (id:number)=>void,
}

const CategoryCard = ({ category,onDelete }: CategoryCardProps) => {
   return (
     <div className="category-item">
         <h4>{category?.category_title}</h4>
         <div className="category-action mt-2">
                 <button onClick={() => onDelete(category.id)} className="book-action-delete">Delete</button>
            </div>
     </div>
   )
}

export default CategoryCard;