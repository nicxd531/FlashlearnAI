import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToAsyncStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};
export const getFromAsyncStorage = async (key: string) => {
  return await AsyncStorage.getItem(key);
};
export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};
export const removeFromAsyncStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export enum Keys {
  AUTH_TOKEN = "auth-token",
  USER_INFO = "userInfo",
  TOP_CREATORS = "topCreators", // Add this line
}
