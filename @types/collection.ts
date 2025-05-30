import { string } from "yup";

export type categoriesTypes =
  | "Mathematics"
  | "Science"
  | "History"
  | "Geography"
  | "English Language"
  | "Literature"
  | "Art and Design"
  | "Music Theory"
  | "Physical Education"
  | "Physics"
  | "Chemistry"
  | "Biology"
  | "Computer Science"
  | "Engineering Basics"
  | "Environmental Science"
  | "Astronomy"
  | "Vocabulary Building"
  | "Grammar Rules"
  | "Spelling and Pronunciation"
  | "Idioms and Phrases"
  | "Foreign Languages"
  | "Translation Practice"
  | "SAT/ACT Prep"
  | "GRE/GMAT Prep"
  | "TOEFL/IELTS Practice"
  | "JAMB"
  | "WAEC/NECO"
  | "Medical Exams"
  | "Law Exams"
  | "Public Speaking"
  | "Soft Skills"
  | "Financial Literacy"
  | "Coding and Programming"
  | "Logical Reasoning"
  | "Leadership Skills"
  | "Project Management"
  | "Business and Economics"
  | "Marketing and Sales"
  | "Human Resources"
  | "Customer Service"
  | "Alphabets"
  | "Numbers and Counting"
  | "Colors and Shapes"
  | "Animal Recognition"
  | "Basic Sight Words"
  | "Nursery Rhymes"
  | "Sports Trivia"
  | "Famous Personalities"
  | "Movie Facts"
  | "Book Summaries"
  | "Food and Cuisine"
  | "Bible Verses"
  | "World Religions"
  | "Moral Lessons"
  | "Philosophical Concepts"
  | "Nutrition"
  | "First Aid Basics"
  | "Mental Health Awareness"
  | "Anatomy and Physiology"
  | "Fun Facts"
  | "Trivia Questions"
  | "General Knowledge"
  | "Current Events"
  | "others";

export interface CollectionData {
  _id: string;
  id?: string;
  title: string;
  description: string;
  category: categoriesTypes;
  poster?: { publicId: string; url: string };
  owner?: {
    name: string;
    id: string;
    avatar?: string;
  };
  cards: string[];
  createdAt: string;
  updatedAt: string;
  visibility: "private" | "public";
  likes: number;
}
export interface CollectionData2 {
  id: string;
  title: string;
  description: string;
  category: categoriesTypes;
  poster?: string;
  owner?: {
    name: string;
    id: string;
    avatar?: string;
  };
  cards: string[];
  createdAt: string;
  updatedAt: string;
  visibility: "private" | "public";
  likes: number;
}
export interface topCreatorsData {
  id: string;
  name: string;
  avatar: string;
  backgroundCover: string;
  userId: string;
}

export interface RecentlyPlayedData {
  id: string;
  title: string;
  description: string;
  category: categoriesTypes;
  poster?: {
    url: string;
  };
  owner?: {
    name: string;
    id: string;
    avatar?: string;
  };
  cards: string[];
  createdAt: string;
  updatedAt: string;
  visibility: "private" | "public";
  likes: number;
}
export interface FavoritesData {
  id: string;
  title: string;
  description: string;
  poster: string;
}

export interface Playlist {
  id: string;
  title: string;
  main: string;
  itemsCount: number;
  visibility: "public" | "private";
  createdAt?: string;
  collection?: CollectionData[];
}
export interface HistoryT {
  date: string;
  cardsCollection: {
    cardsCollectionId: string;
    date: string;
    id: string;
    title: string;
  }[];
}
export type historyCollection = {
  cardsCollectionId: string;
  date: string;
  id: string;
  title: string;
};
export const categories = [
  "Mathematics",
  "Science",
  "History",
  "Geography",
  "English Language",
  "Literature",
  "Art and Design",
  "Music Theory",
  "Physical Education",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Engineering Basics",
  "Environmental Science",
  "Astronomy",
  "Vocabulary Building",
  "Grammar Rules",
  "Spelling and Pronunciation",
  "Idioms and Phrases",
  "Foreign Languages",
  "Translation Practice",
  "SAT/ACT Prep",
  "GRE/GMAT Prep",
  "TOEFL/IELTS Practice",
  "JAMB",
  "WAEC/NECO",
  "Medical Exams",
  "Law Exams",
  "Public Speaking",
  "Soft Skills",
  "Financial Literacy",
  "Coding and Programming",
  "Logical Reasoning",
  "Leadership Skills",
  "Project Management",
  "Business and Economics",
  "Marketing and Sales",
  "Human Resources",
  "Customer Service",
  "Alphabets",
  "Numbers and Counting",
  "Colors and Shapes",
  "Animal Recognition",
  "Basic Sight Words",
  "Nursery Rhymes",
  "Sports Trivia",
  "Famous Personalities",
  "Movie Facts",
  "Book Summaries",
  "Food and Cuisine",
  "Bible Verses",
  "World Religions",
  "Moral Lessons",
  "Philosophical Concepts",
  "Nutrition",
  "First Aid Basics",
  "Mental Health Awareness",
  "Anatomy and Physiology",
  "Fun Facts",
  "Trivia Questions",
  "General Knowledge",
  "Current Events",
  "others",
];

export interface questionSection {
  _id: string;
  image: {
    publicId: string;
    url: string;
  };
  text: string;
}
export interface answerSection {
  _id: string;
  image: {
    publicId: string;
    url: string;
  };
  text: string;
}
export interface cards {
  _id: string;
  answer: answerSection[];
  question: questionSection[];
  collectionId: string;
}

export interface CardsData {
  historyId: string
  collectionId: string
  cards:string[]
  correctCards:String[]
  progress:number
  owner:String
  points:number
  durationInSeconds:number
  previous?:{
correctCards:string[]
  progress:number
  points:number
  durationInSeconds:number
  }
}

export interface owner {
   _id: string;
        name: string;
        email: string;
        avatar?: {
            url: string;
            id: string;
        };
        verified?: boolean;
        followers: string[];
        followings: string[];
}