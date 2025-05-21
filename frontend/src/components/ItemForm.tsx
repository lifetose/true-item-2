import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
} from "@/api/itemApiSlice";
import { IItem } from "@/types/Item";
import { getErrorMessage } from "@/api/apiSlice";

export const ItemForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEdit = Boolean(id);
  const [item, setItem] = useState<IItem>({ name: "" });

  const { data: fetchedItem, isLoading } = useGetItemByIdQuery(id!, {
    skip: !id,
  });

  const [createItem, { isLoading: isCreating, error: createError }] =
    useCreateItemMutation();
  const [updateItem, { isLoading: isUpdating, error: updateError }] =
    useUpdateItemMutation();

  useEffect(() => {
    if (fetchedItem) {
      setItem({ name: fetchedItem.name });
    }
  }, [fetchedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, name: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id && isEdit) {
        await updateItem({ id, item }).unwrap();
      } else {
        await createItem(item).unwrap();
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to save item:", err);
    }
  };

  if (isEdit && isLoading) {
    return <div>Loading item...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h1 className='text-xl font-bold'>{isEdit ? "Edit" : "Create"} Item</h1>
      {createError && (
        <div className='text-red-500'>
          Error: {getErrorMessage(createError)}
        </div>
      )}
      {updateError && (
        <div className='text-red-500'>
          Error: {getErrorMessage(updateError)}
        </div>
      )}
      <div>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          className='border rounded p-2 w-full'
          value={item.name}
          onChange={handleChange}
        />
      </div>
      <button
        type='submit'
        className='bg-green-500 text-white px-4 py-2 rounded'
        disabled={isCreating || isUpdating}
      >
        {isEdit
          ? isUpdating
            ? "Updating..."
            : "Update"
          : isCreating
            ? "Creating..."
            : "Create"}
      </button>
    </form>
  );
};
