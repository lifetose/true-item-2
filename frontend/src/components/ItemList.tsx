import { Link } from "react-router-dom";
import { useDeleteItemMutation, useGetAllItemsQuery } from "@/api/itemApiSlice";
import { getErrorMessage } from "@/api/apiSlice";

export const ItemList = () => {
  const { data: items, isLoading, error, refetch } = useGetAllItemsQuery();
  const [deleteItem] = useDeleteItemMutation();

  const handleDeleteItem = async (itemId: string) => {
    if (!itemId) return;
    try {
      await deleteItem(itemId).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {getErrorMessage(error)}</div>;
  }

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Items</h1>
      <Link to='/create' className='bg-blue-500 text-white px-4 py-2 rounded'>
        Create New Item
      </Link>
      <ul className='mt-4'>
        {items?.map((item) => (
          <li key={item._id} className='border p-2 my-2 rounded'>
            <h2 className='font-semibold'>{item.name}</h2>
            <div className='mt-2 space-x-2'>
              <Link
                to={`/edit/${item._id}`}
                className='text-blue-500 underline'
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteItem(item._id!)}
                className='text-red-500'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
