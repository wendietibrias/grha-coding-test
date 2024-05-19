import "./style.scss";
import { IBookResponse } from "../../../interfaces/api_response/book.response";
import { deleteBook, getAllBook } from "../../../services/book.service";
import { useInfiniteQuery,useMutation,useQueryClient } from "react-query";
import { LoadingSpinner } from "../../../components";
import BookCard from "./components/BookCard";
import notfoundavatar from "../../../assets/images/notfound.png";

const Book = () =>{ 
   const {
       isLoading,
       data,
       hasNextPage,
       fetchNextPage,
       isFetchingNextPage
   } = useInfiniteQuery({
       queryKey:'get-book-request',
       queryFn: ({ pageParam = 1 }) => getAllBook(pageParam,8),
       getNextPageParam:(lastPage) => lastPage.data.nextPage
   });

   const queryClient = useQueryClient();

   const deleteMutation = useMutation({
       mutationFn: deleteBook,
       mutationKey:'delete-book-request'
   });

   const deleteHandler = async (id: number) => {
      try {
         const { status } = await deleteMutation.mutateAsync(id);
         if(status === 'success') {
             queryClient.invalidateQueries(['get-book-request']);
         }
      } catch(err) {

      } finally {
          
      }
   }

   if(isLoading) {
      return (
         <div className="loading-container">
             <LoadingSpinner width={24} height={24} color="#FF357E"/>
         </div>
      )
   }

   if(data?.pages[0]?.totalItems === 0) {
      return (
         <div className="not-found-container">
             <img src={notfoundavatar} alt="not found pictures"/>
             <h3>No book found</h3>
         </div>
      )
   }

   return (
      <div className="book-container">
          <header className="book-container-header">
             <h3>All Books</h3>
          </header>
          <div className="book-items-container">
              {data?.pages?.flatMap((item:any)=> item.data.items).map((item: IBookResponse,idx:number)=>(
                 <BookCard book={item} key={idx} onDelete={deleteHandler} onUpdate={()=>{}}/>
              ))}
          </div>
          {isFetchingNextPage && <div className="fetch-page-spinner"> <LoadingSpinner width={24} height={24} color="#FF357E" /></div>}
          {hasNextPage && (
             <div className="load-more-container">
              <button onClick={()=> fetchNextPage()}>Load More</button>
           </div>
          )}
      </div>
   )
}

export default Book;