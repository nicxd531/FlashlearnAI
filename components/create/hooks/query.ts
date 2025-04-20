import { getClient } from "@/components/api/client";
import { useQuery } from "react-query";

export const fetchCardsCreate = async (id: string) => {
  try {
    const client = await getClient();

    const url = "/collection/cards/" + id;

    const { data } = await client(url);

    return data.cards;
  } catch (err) {
    console.error("Error fetching cards:", err);
    throw err;
  }
};

export const useFetchCardsCreate = (id: string) => {
  const { data, isLoading, error, isSuccess } = useQuery(["cardsCreate", id], {
    queryFn: () => fetchCardsCreate(id),
    onError: (err) => console.error(err),
  });
  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};
