import "./style.scss";
import { ICreateBookInterface } from "../../../interfaces/form/create_book.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField, Button, Textarea, Alert } from "../../../components";
import { useMutation,useQueryClient } from "react-query";
import { createBook } from "../../../services/book.service";
import { getAllCategoryForSelectOption } from "../../../services/category.service";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert, { IUseAlert } from "../../../hooks/useAlert";
import AsyncSelect from "react-select/async";

const CreateBook = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<ICreateBookInterface>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { onOpenAlert, onCloseAlert, isAlertOpen } = useAlert() as IUseAlert;

  const [cover, setCover] = useState<any>(null);
  const [coverPreview, setCoverPreview] = useState<any>(null);
  const [categoryValue, setCategoryValue] = useState<string>("");

  const createBookMutation = useMutation({
    mutationKey: "create-book-request",
    mutationFn: (formData: any) => createBook(formData),
  });

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

  const submitHandler: SubmitHandler<ICreateBookInterface> = async (
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
        author
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

      const { message, status } = await createBookMutation.mutateAsync(
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

  return (
    <div className="create-book-container">
      <h3>Add Book</h3>
      {isAlertOpen && <div className="mt-3"><Alert/></div>}
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
            defaultOptions
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
        <Button isDisabled={createBookMutation.isLoading} title="Submit" />
      </form>
    </div>
  );
};

export default CreateBook;
