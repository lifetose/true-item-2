import { getErrorMessage } from "@/api/apiSlice";
import { useGetItemByIdQuery } from "@/api/itemApiSlice";

import { useParams } from "react-router-dom";

function ItemCard() {
  const { id } = useParams<{ id: string }>();

  const {
    data: item,
    isLoading,
    error,
  } = useGetItemByIdQuery(id!, {
    skip: !id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {getErrorMessage(error)}</div>;
  }

  return <div>{item?.name}</div>;
}

export default ItemCard;
