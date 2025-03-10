import { getClient } from "@/components/api/client";
import { useQuery } from "react-query";

// get user profile

export const fetchUserPublicProfile = async (userId: string) => {
  const client = await getClient();
  const { data } = await client(`/profile/info/${userId}`);
  return data.profile;
};

export const useFetchUserPublicProfile = (id: string) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ["UserPublicProfile"],
    {
      queryFn: () => fetchUserPublicProfile(id),
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
// get collection data

export const fetchCollectionData = async (userId: string) => {
  const client = await getClient();
  const { data } = await client(`/collection/${userId}/cards`);
  return data;
};

export const useFetchCollectionData = (id: string) => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ["fetchCollectionData"],
    {
      queryFn: () => fetchCollectionData(id),
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
