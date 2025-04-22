import { getFromAsyncStorage, Keys } from "@/utils/asyncStorage";
import axios, { CreateAxiosDefaults } from "axios";
const web = "http://localhost:8989";
const androidStudio = "http://10.0.2.2:8989";
const pc = "192.168.0.100";
const test = "https://qefas-flashcard-mobile-backend-1.onrender.com";

const client = axios.create({
  baseURL: test,
});

type headers = CreateAxiosDefaults<any>["headers"];
export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);

  if (!token)
    return axios.create({
      baseURL: test,
    });
  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
    ...headers,
  };

  return axios.create({ baseURL: test, headers: defaultHeaders });
};
export default client;
