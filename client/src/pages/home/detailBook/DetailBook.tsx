import "./style.scss";
import { useQuery,useMutation,useQueryClient } from "react-query";
import { deleteBook, getBookDetail } from "../../../services/book.service";
import { useParams,useNavigate, Link } from "react-router-dom";
import useAlert,{ IUseAlert } from "../../../hooks/useAlert";

const DetailBook = () => {
    const { id } = useParams();
    const {
        data,
        isLoading
     } = useQuery({
         queryKey:'get-book-detail-request',
         queryFn: () => getBookDetail(Number(id))
     });

     const { isAlertOpen,onCloseAlert,onOpenAlert } = useAlert() as IUseAlert;

     const navigate = useNavigate();
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
               navigate('/');
           }
        } catch(err:any) {
          const { response:{ data } } = err;
          onOpenAlert(data.message,'error');
        } finally {
          setTimeout(()=> onCloseAlert() ,4500);
        }
     }

    if(isLoading) {
         return (
            <div className="detail-book-loading">
                 <h5>Loading...</h5>
            </div>
         )
    }

    return (
       <div className="detail-book-container">
          <div className="detail-book-content-container">
              <img src={data.data?.cover_url} alt={data?.data.title} />
              <div className="description-book">
              <h4>{data?.data?.title}</h4>
              <div className="book-detail-desc">
                 <div className="detail-desc-item">
                     <h6>Language</h6>
                     <h5>{data?.data?.language}</h5>
                 </div>
                 <div className="detail-desc-item">
                     <h6>ISBN</h6>
                     <h5> {data?.data?.isbn}</h5>
                 </div>
                 <div className="detail-desc-item">
                     <h6>Author</h6>
                     <h5>{data?.data?.author}</h5>
                 </div>
                 <div className="detail-desc-item">
                     <h6>Category</h6>
                     <h5>{data?.data?.category}</h5>
                 </div>
                 <div className="detail-desc-item">
                     <h6>Release Date</h6>
                     <h5>{data?.data?.release_date}</h5>
                 </div>
                 <div className="detail-desc-item">
                     <h6>Total Page</h6>
                     <h5>{data?.data?.total_page}</h5>
                 </div>
              </div>
                <p>{data?.data?.description}</p>
                <div className="detail-book-action mt-3">
                 <button onClick={() => deleteHandler(data?.data?.id)} className="book-action-delete">Delete</button>
                 <Link to={`/book/update/${data?.data?.id}`} className="book-action-update">Update</Link>
            </div>
              </div>
          </div>
       </div>
    )
}

export default DetailBook;