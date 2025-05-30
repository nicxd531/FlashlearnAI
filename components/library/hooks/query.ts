import { HistoryT, Playlist } from "@/@types/collection";
import client, { getClient } from "@/components/api/client";
import { UserProfile } from "@/utils/store/auth";
import { useQuery } from "react-query";

// get user profile

export const fetchUserPublicProfile = async (userId: string) => {
  const client = await getClient();
  const { data } = await client(`/profile/info/${userId}`);
  return data.profile;
};

export const useFetchUserPublicProfile = (id: string) => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["UserPublicProfile"],
    {
      queryFn: () => fetchUserPublicProfile(id),
      onError: (err) => console.error(err),
    }
  );
  return {
    data,
    isLoading,
    isFetching,
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
  const { data, isLoading, error, isSuccess, refetch } = useQuery(
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
    refetch 
  };
};
export const fetchSearchedCategories = async (category: string) => {
  const { data } = await client.post(`/collection/public-category`, {
    category: category,
  });
  return data;
};

export const useFetchSearchedCategories = (category: string) => {
  const { data, isLoading, error, isSuccess, refetch } = useQuery(
    ["fetchSearchedCategories"],
    {
      queryFn: () => fetchSearchedCategories(category),
      onError: (err) => console.error("sug error", err),
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
    refetch,
  };
};
export const fetchDeleteCollection = async (collectionId: string) => {
  const { data } = await client.delete(`/collection/${collectionId}`);
  return data;
};

export const useFetchDeleteCollection = (collectionId: string) => {
  const { data, isLoading, error, isSuccess, refetch } = useQuery(
    ["fetchDeleteCollection"],
    {
      queryFn: () => fetchDeleteCollection(collectionId),
      onError: (err) => console.error("delete error", err),
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
    refetch,
  };
};

// uploads by profile
export const fetchUploadsByProfile = async () => {
  const client = await getClient();
  const { data } = await client("/profile/uploads");

  return data.cardsCollection;
};

export const useFetchUploadsByProfile = () => {
  const { data, isLoading, error, isSuccess } = useQuery(
    ["uploads-by-profile"],
    {
      queryFn: () => fetchUploadsByProfile(),
      onError: (err) => console.error("uploads-profile", err),
    }
  );
  return {
    data,
    isLoading,
    error,
    isSuccess,
  };
};
// FETch HISTORIES
export const fetchHistories = async (pageNo = 0): Promise<HistoryT[]> => {
  const client = await getClient();
  const { data } = await client("/history?limit=15&pageNo=" + pageNo);

  return data.histories;
};

export const useFetchHistories = () => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["histories"],
    {
      queryFn: () => fetchHistories(),
      onError: (err) => console.error("history ", err),
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
// FETch following
export const fetchIsFollowing = async (id: string): Promise<boolean[]> => {
  const client = await getClient();
  const { data } = await client("/profile/is-following/" + id);

  return data.status;
};

export const useFetchIsFollowing = (id: string) => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["is-following", id],
    {
      queryFn: () => fetchIsFollowing(id),
      onError: (err) => console.error("is-following ", err),
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
// FETch user login profile
export const fetchLogInUser = async (): Promise<UserProfile> => {
  const client = await getClient();
  const { data } = await client("/auth/is-auth");
  return data.profile;
};

export const useFetchLogInUser = () => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["useFetchLogInUser"],
    {
      queryFn: () => fetchLogInUser(),
      onError: (err) => console.error("useFetchLogInUser"),
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

// FETch playlist
export const fetchPlaylistPreview = async (id: string): Promise<Playlist> => {
  const client = await getClient();
  const { data } = await client("/playlist/" + id);
  return data;
};

export const useFetchPlaylistPreview = (id: string) => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["playlist", id],
    {
      queryFn: () => fetchPlaylistPreview(id),
      onError: (err) => console.error("playlist ", err),
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
// fetch cards data
export const fetchCardsData = async (historyId: string, collectionId: string) => {
  const { data } = await client.get(`/cardData/${historyId}/${collectionId}`);
  return data;
};


export const useFetchCardsData = async (historyId: string, collectionId: string) => {
  const { data, isLoading, error, isSuccess, isFetching } = useQuery(
    ["cardsData", historyId, collectionId],
    {
      queryFn:  () =>  fetchCardsData(historyId,collectionId),
      onError: (err) => console.error("playlist ", err),
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
