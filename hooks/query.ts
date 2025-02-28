import { getClient } from "@/components/api/client";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "@backpackapp-io/react-native-toast";

const fetchCollectionsByProfile = async () => {
  const client = await getClient();
  const { data } = await client("/profile/uploads");
  console.log(data);
  return data;
};

export const useFetchCollectionsByProfile = () => {
  return useQuery(["collections"], {
    queryFn: () => fetchCollectionsByProfile(),
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        // Handle Axios errors
        if (err.response) {
          // Server responded with a status other than 200 range
          console.error("Error response:", err.response);
          toast.error(err.response.data.message, {
            icon: "❌",
          });
        } else if (err.request) {
          // Request was made but no response received
          console.error("Error request:", err.request);
          toast.error("Network error, please try again later", {
            icon: "❌",
          });
        } else {
          // Something else happened while setting up the request
          console.error("Error message:", err.message);
          toast.error(err.message, {
            icon: "❌",
          });
        }
      } else {
        // Handle non-Axios errors
        console.error("Error:", err);
        toast.error("An unknown error occurred", {
          icon: "❌",
        });
      }
    },
  });
};
