import "./style.scss";
import { useMutation, useQuery,useQueryClient } from "react-query";
import { FormField, Button, Textarea, Alert } from "../../../components";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { getBookDetail, updateBook } from "../../../services/book.service";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUpdateBookInterface } from "../../../interfaces/form/update_book.interface";
import { getAllCategoryForSelectOption } from "../../../services/category.service";
import useAlert, { IUseAlert } from "../../../hooks/useAlert";
import AsyncSelect from "react-select/async";

const UpdateBook = () => {
  const { id } = useParams();
  const { onOpenAlert,onCloseAlert,isAlertOpen } = useAlert() as IUseAlert;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [cover, setCover] = useState<any>(null);
  const [coverPreview, setCoverPreview] = useState<any>(null);
  const [categoryValue, setCategoryValue] = useState<string>("");

  const {
    data
  } = useQuery({
    queryKey: "detail-book-request",
    queryFn: () => getBookDetail(Number(id)),
  });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IUpdateBookInterface>();

  const updateBookMutation = useMutation({
     mutationKey:'update-book-request',
     mutationFn: (formData:any) => updateBook(Number(id),formData),
  })

  const fileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (result) => {
        setCover(files);
        setCoverPreview(result?.target?.result);
      });

      fileReader.readAsDataURL(files);
    }
  };

  const submitHandler: SubmitHandler<IUpdateBookInterface> = async (
    formData
  ) => {
    try {
      const {
        title,
        description,
        isbn,
        language,
        publisher,
        release_date,
        total_page,
        author,
        old_cover_id
      } = formData;

      const formAppend = new FormData();

      formAppend.append("title", title);
      formAppend.append("description", description);
      formAppend.append("isbn", isbn);
      formAppend.append("language", language);
      formAppend.append("publisher", publisher);
      formAppend.append("release_date", release_date);
      formAppend.append("total_page", String(total_page));
      formAppend.append("cover", cover);
      formAppend.append("category", categoryValue);
      formAppend.append('author' ,author);
      formAppend.append('old_cover_id',old_cover_id);

      const { message, status } = await updateBookMutation.mutateAsync(
        formAppend
      );

      if (status === "success") {
        onOpenAlert(message, "success");
        queryClient.invalidateQueries(['get-book-request']);

        setCover(null);
        setCategoryValue("");
        setCoverPreview(null);

        reset();

        navigate("/");
      }
    } catch (err: any) {
       const { response:{ data }} = err;
       onOpenAlert(data.message,'error');
    } finally {
      setTimeout(() => {
        onCloseAlert();
      }, 4500);
    }
  };

  useEffect(()=>{
    if(data && data?.data){
        setValue('title',data?.data?.title);
        setValue('isbn',data?.data?.isbn);
        setValue('release_date',data?.data?.release_date);
        setValue('author',data?.data?.author);
        setValue('language',data?.data?.language);
        setValue('total_page',data?.data?.total_page);
        setValue('description',data?.data?.description);
        setValue('publisher', data?.data?.publisher);
        setValue('old_cover_id' , data?.data?.cover_id);
        setValue("category" , data?.data?.category);
      
        setCategoryValue(data?.data?.category);
        setCoverPreview(data?.data?.cover_url);
    }
  },[data])

  return (
    <div className="update-book-container">
      <h3>Update Book</h3>
      {isAlertOpen && <Alert/>}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="form-container mt-3"
      >
        <FormField
          name="title"
          type="text"
          label="Book Title"
          placeholder="Book Title"
          register={register}
          error={errors.title?.message}
        />
        <FormField
          name="isbn"
          type="text"
          label="ISBN"
          placeholder="Book Title"
          register={register}
          error={errors.title?.message}
        />
        <FormField
          name="release_date"
          type="date"
          label="Relase Date"
          placeholder="Release Date"
          register={register}
          error={errors.title?.message}
        />
        <FormField
          name="total_page"
          type="number"
          label="Total Page"
          placeholder="Total Page"
          register={register}
          error={errors.title?.message}
        />
        <FormField
          name="language"
          type="text"
          label="Language"
          placeholder="Language"
          register={register}
          error={errors.title?.message}
        />
        <FormField
          name="publisher"
          type="text"
          label="Publisher"
          placeholder="Publisher"
          register={register}
          error={errors.title?.message}
        />
        <div className="form-item select">
          <label>Category</label>
          <AsyncSelect
            className="react-select"
            defaultOptions
            value={categoryValue}
            onChange={(e: any) => setCategoryValue(e.value)}
            loadOptions={getAllCategoryForSelectOption}
            cacheOptions
          />
        </div>
        <FormField
          name="author"
          type="text"
          label="Author"
          placeholder="Author"
          register={register}
          error={errors.author?.message}
        />
        <Textarea
          name="description"
          placeholder="Description"
          label="Description"
          register={register}
          error={errors.description?.message}
        />
        <div className="file-upload-field">
          {coverPreview && <img src={coverPreview} alt="cover upload" />}
          <label htmlFor="cover">
            <i className="ri-file-text-line"></i>
            Choose file
          </label>
          <input onChange={fileHandler} type="file" id="cover" name="cover" />
        </div>
        <Button isDisabled={updateBookMutation.isLoading} title="Update" />
      </form>
    </div>
  );
};

export default UpdateBook;
