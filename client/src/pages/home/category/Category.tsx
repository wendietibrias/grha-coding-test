import "./style.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../../../services/category.service";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Alert, Button, FormField, LoadingSpinner } from "../../../components";
import { ICategoryResponse } from "../../../interfaces/api_response/category.response";
import { ICreateCategoryInterface } from "../../../interfaces/form/create_category.interface";
import { useState } from "react";
import useAlert, { IUseAlert } from "../../../hooks/useAlert";
import notfoundavatar from "../../../assets/images/notfound.png";
import CategoryCard from "./components/CategoryCard";

const Category = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] =
    useState<boolean>(false);
  const { isAlertOpen, onOpenAlert, onCloseAlert } = useAlert() as IUseAlert;
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ICreateCategoryInterface>();

  const { isLoading, data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: "get-category-request",
      queryFn: ({ pageParam = 1 }) => getAllCategory(pageParam, 8),
      getNextPageParam: (lastPage) => lastPage.data.nextPage,
    });

  const deletCategoryeMutation = useMutation({
    mutationKey: "delete-category-request",
    mutationFn: (id: number) => deleteCategory(Number(id)),
  });
  const createCategoryMutation = useMutation({
    mutationKey: "create-category-request",
    mutationFn: createCategory,
  });

  const deleteHandler = async (id: number) => {
    try {
      const { status } = await deletCategoryeMutation.mutateAsync(id);
      if (status === "success") {
        queryClient.invalidateQueries(["get-category-request"]);
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      onOpenAlert(data.message, "error");
    } finally {
      setTimeout(() => onCloseAlert(), 4500);
    }
  };

  const submitHandler: SubmitHandler<ICreateCategoryInterface> = async (
    formData
  ) => {
    try {
      const { status } = await createCategoryMutation.mutateAsync(formData);
      if (status === "success") {
        setOpenAddCategoryModal(false);
        queryClient.invalidateQueries(["get-category-request"]);
      }
    } catch (err: any) {
      const {
        response: { data },
      } = err;
      onOpenAlert(data.message, "error");
    } finally {
      setTimeout(() => onCloseAlert(), 4500);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner width={24} height={24} color="#FF357E" />
      </div>
    );
  }

  if (data?.pages[0]?.totalItems === 0) {
    return (
      <div className="not-found-container">
        <img src={notfoundavatar} alt="not found pictures" />
        <h3>No category found</h3>
      </div>
    );
  }

  return (
    <div className="category-container">
      {openAddCategoryModal && (
        <div className="category-modal-container">
          <button
            onClick={() => setOpenAddCategoryModal(false)}
            className="close-modal"
          >
            X
          </button>
          <div className="category-modal-form-container">
            {isAlertOpen && <Alert />}
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="category-modal-form"
            >
              <FormField
                name="category_title"
                label="Category"
                type="text"
                placeholder="Category"
                register={register}
                error={errors?.category_title?.message}
              />
              <Button
                isDisabled={createCategoryMutation.isLoading}
                title="Submit"
              />
            </form>
          </div>
        </div>
      )}
      <header className="category-container-header">
        <h3>All Category</h3>
        <button
          onClick={() => setOpenAddCategoryModal(!openAddCategoryModal)}
          className="add-category-button"
        >
          <i className="ri-add-line"></i>Add Category
        </button>
      </header>
      {isAlertOpen && <Alert />}
      <div className="category-container-items">
        {data?.pages
          ?.flatMap((item: any) => item.data.items)
          .map((item: ICategoryResponse, idx: number) => (
            <CategoryCard category={item} key={idx} onDelete={deleteHandler} />
          ))}
      </div>
      {isFetchingNextPage && (
        <div className="fetch-page-spinner"> <LoadingSpinner width={24} height={24} color="#FF357E" /></div>
      )}
      {hasNextPage && (
        <div className="load-more-container">
          <button onClick={() => fetchNextPage()}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default Category;
