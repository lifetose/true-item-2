import { ITEMS_URL } from "@/constants/api";
import { apiSlice } from "./apiSlice";
import { IItem } from "@/types/Item";

export const itemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<IItem[], void>({
      query: () => `${ITEMS_URL}`,
      providesTags: ["Item"],
    }),
    getItemById: builder.query<IItem, string>({
      query: (id) => `${ITEMS_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Item", id }],
    }),
    createItem: builder.mutation<IItem, IItem>({
      query: (item) => ({
        url: `${ITEMS_URL}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation<IItem, { id: string; item: IItem }>({
      query: ({ id, item }) => ({
        url: `${ITEMS_URL}/${id}`,
        method: "PUT",
        body: item,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Item", id }],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ITEMS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Item", id }],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;
