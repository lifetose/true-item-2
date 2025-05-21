import { useState, useEffect } from "react";
import { itemApi } from "../api/itemApi";
import type { Item } from "../api/itemApi";
import { useNavigate, useParams } from "react-router-dom";

export const ItemForm = () => {
  const [item, setItem] = useState<Item>({ name: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const { data } = await itemApi.getById(id);
          setItem({ name: data.name });
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await itemApi.update(id, item);
    } else {
      await itemApi.create(item);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <h1 className='text-xl font-bold'>{id ? "Edit" : "Create"} Item</h1>
      <div>
        <label>Name</label>
        <input
          className='border rounded p-2 w-full'
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <button className='bg-green-500 text-white px-4 py-2 rounded'>
        Save
      </button>
    </form>
  );
};
