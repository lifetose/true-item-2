import { ITEMS_URL } from "@/constants/api";
import { apiSlice } from "./apiSlice";
import { IItem } from "@/types/Item";

export const itemApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query<IItem[], void>({
      query: () => `${ITEMS_URL}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Item" as const, _id })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
      keepUnusedDataFor: 30,
    }),
    getItemById: builder.query<IItem, string>({
      query: (id) => `${ITEMS_URL}/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Item", id }],
      keepUnusedDataFor: 30,
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
      invalidatesTags: ["Item"],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `${ITEMS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
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
