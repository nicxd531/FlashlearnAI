import { CollectionData, Playlist } from "@/@types/collection";
import { getClient } from "@/components/api/client";
import { handleError } from "@/components/api/request";
import { toast } from "@backpackapp-io/react-native-toast";
import { useQuery, useQueryClient } from "react-query";

export const HandleOnFavoritePress = async (
  selectedCollection: any,
  setShowOptions: (value: boolean) => void,
  setSelectedCollection: (value: any) => void,
  queryClient?: any
) => {
  try {
    if (!selectedCollection) return;
    const client = await getClient();
    
    const { data } = await client.post(
      "/favorite?collectionId=" + selectedCollection?.id
    );
    toast.success("added to favorite list  ", { icon: "🎉" });
    if (queryClient) queryClient.invalidateQueries({ queryKey: ["favorites"] });
  } catch (e) {
    handleError(e);
  }
  setShowOptions(false);
  setSelectedCollection(undefined);
};
export const HandleOnRemoveFav = async (
  selectedCollection: any,
  setShowOptions: (value: boolean) => void,
  setSelectedCollection: (value: any) => void,
  queryClient?: any
) => {
  try {
    if (!selectedCollection) return;
    
    const client = await getClient();
    const { data } = await client.post(
      "/favorite?collectionId=" + selectedCollection?.id
    );
    toast.success("removed from favorites  ", { icon: "✔️" });
    if (queryClient) queryClient.invalidateQueries({ queryKey: ["favorites"] });
  } catch (e) {
    console.log(e);
    handleError(e);
  }
  setShowOptions(false);
  setSelectedCollection(undefined);
};
export const HandleOnPlaylistPress = async (
  setShowOptions: (value: boolean) => void,
  setShowPlaylistModal: (value: boolean) => void
) => {
  setShowOptions(false);
  setShowPlaylistModal(true);
};

export const handlePlaylistSubmit = async (
  value: {
    title: string;
    private: boolean;
  },
  selectedCollection: any,
  setShowPlayListForm: (value: boolean) => void,
  setShowPlaylistModal: (value: boolean) => void,
  setShowOptions: (value: boolean) => void,
  setSelectedCollection: (value: any) => void,
  queryClient?: any
) => {
  if (!value.title.trim()) return;
  try {
    if (!selectedCollection) return;
    const client = await getClient();
    const { data } = await client.post("/playlist/create", {
      title: value.title,
      visibility: value.private ? "private" : "public",
      resId: selectedCollection?.id,
    });
    toast.success("collection added to playlist", { icon: "🎉" }) ;
    if (queryClient) queryClient.invalidateQueries({ queryKey: ["favorites"] });
  } catch (e) {
    handleError(e);
  }
  setShowPlayListForm(false);
  setShowPlaylistModal(false);
  setShowOptions(false);
  setSelectedCollection(undefined);
};

export const updatePlaylist = async (
  item: Playlist,
  selectedCollection: any,
  setShowPlayListForm: (value: boolean) => void,
  setShowPlaylistModal: (value: boolean) => void,
  setShowOptions: (value: boolean) => void,
  setSelectedCollection: (value: any) => void
) => {
  try {
    const client = await getClient();
    const { data } = await client.patch("/playlist", {
      id: item.id,
      item: selectedCollection?.id,
      title: item.title,
      visibility: item.visibility,
    });
    toast.success("collection added to playlist", { icon: "🎉" });
  } catch (e) {
    handleError(e);
  }
  setShowPlayListForm(false);
  setShowPlaylistModal(false);
  setShowOptions(false);
  setSelectedCollection(undefined);
};
