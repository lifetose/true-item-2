import axios from "axios";

export interface Item {
  _id?: string;
  name: string;
}

const api = axios.create({
  baseURL: "/api/items",
});

export const itemApi = {
  getAll: () => api.get<Item[]>("/"),
  getById: (id: string) => api.get<Item>(`/${id}`),
  create: (item: Item) => api.post<Item>("/", item),
  update: (id: string, item: Item) => api.put<Item>(`/${id}`, item),
  delete: (id: string) => api.delete<void>(`/${id}`),
};
