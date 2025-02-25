import { categories } from "@/utils/Categories";
import * as yup from "yup";

export interface FromFields {
  title: string;
  category: string;
  description: string;
  visibility: "private" | "public";
  poster?: {
    uri: string | null | undefined;
    name: string | null | undefined;
    type: string | null | undefined;
    size: number | null | undefined;
  };
}
export const defaultForm: FromFields = {
  title: "",
  category: "",
  description: "",
  visibility: "private",
};
export const collectionInfoSchema = yup.object().shape({
  title: yup.string().trim().required("Title is missing!"),
  description: yup.string().trim().required("Description is missing!"),
  category: yup.string().oneOf(categories, "Category is missing "),
  visibility: yup.string().oneOf(["public", "private"], "Category is missing "),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
});
export const cardsInfoSchema = yup.object().shape({
  question: yup.string().trim().required("Question is missing!"),
  answer: yup.string().trim().required("Answer is missing!"),
});

// Add file field
export const file = {
  uri: "file:///path/to/file",
  name: "filename.jpg",
  type: "image/jpeg",
};
