import { CollectionData } from "@/@types/collection";
import { getClient } from "@/components/api/client";
import { useQuery } from "react-query";

export const fetchPublicUploads = async (userId: string) => {
  const client = await getClient();
  const { data } = await client("/profile/uploads/" + userId);
  return data.cardsCollection;
};

export const useFetchPublicUploads = (id: string) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ["publicCollection", id],
    {
      queryFn: () => fetchPublicUploads(id),
      onError: (err) => console.error(err),
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};
export const fetchPublicPlaylist = async (userId: string) => {
  const client = await getClient();
  const { data } = await client("/profile/playlist/" + userId);
  return data.playlist;
};

export const useFetchPublicPlaylist = (id: string) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ["publicPlaylist", id],
    {
      queryFn: () => fetchPublicPlaylist(id),
      onError: (err) => console.error(err),
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};

export const fetchSuggestedCollections = async () => {
  const client = await getClient();
  const { data } = await client("/collection/suggested-collections");
  return data.collections;
};

export const useSuggestedCollections = () => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ["suggestedCollections"],
    {
      queryFn: () => fetchSuggestedCollections(),
      onError: (err) => console.error(err),
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};
// FETch likes
export const fetchLikes = async (id: string): Promise<number> => {
  const client = await getClient();
  const { data } = await client(`/collection/${id}/likes`);
  return data.totalLikes;
};

export const useFetchLikes = (id: string) => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["fetchLikes", id],
    {
      queryFn: () => fetchLikes(id),
      onError: (err) => console.error("fetchLikes", err),
      enabled: id ? true : false,
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
    isFetching,
  };
};
// FETch likes
export const fetchHasUserLiked = async (id: string): Promise<number> => {
  const client = await getClient();
  const { data } = await client(`/collection/like-status/${id}`);
  return data.liked;
};

export const useFetchHasUserLiked = (id: string) => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["fetchHasUserLiked", id],
    {
      queryFn: () => fetchHasUserLiked(id),
      onError: (err) => console.error("fetchHasUserLiked", err),
      enabled: id ? true : false,
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
    isFetching,
  };
};
