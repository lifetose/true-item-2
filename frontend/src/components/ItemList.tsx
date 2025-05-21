import { useEffect, useState } from "react";
import { itemApi } from "../api/itemApi";
import type { Item } from "../api/itemApi";
import { Link } from "react-router-dom";

export const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const { data } = await itemApi.getAll();
    setItems(data);
  };

  const deleteItem = async (id: string) => {
    await itemApi.delete(id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Items</h1>
      <Link to='/create' className='bg-blue-500 text-white px-4 py-2 rounded'>
        Create New Item
      </Link>
      <ul className='mt-4'>
        {items.map((item) => (
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
                onClick={() => deleteItem(item._id!)}
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
