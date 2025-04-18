import { CollectionData } from "./collection";

interface NewUserResponse {
  id?: string;
  name: string;
  email: string;
}

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  IntroPage: undefined;
  HomeLayout: undefined;
  LostPassword: undefined;
  Verification: { userInfo: NewUserResponse };
  CollectionPlay: undefined;
  auth: undefined;
  tabs: undefined;
};

export type libraryNavigatorStackParamList = {
  libraryMain: undefined;
  librarySettings: undefined;
  collectionPreview: undefined;
  CategoriesPreviewPage: undefined;
  ProfilePreviewPage: undefined;
  Verification: { userInfo: NewUserResponse };
};
export type homeNavigatorStackParamList = {
  HomeMain: undefined;
  collectionPreview: undefined;
  ProfilePreviewPage: undefined;
};
export type libraryNavigatorStackParamListMini = {
  LibraryPage: {
    screen: string;
    params: {
      userId?: string;
      category?: string;
    };
  };
};
export type homeNavigatorStackParamListMini = {
  HomePage: {
    screen: string;
    params: {
      userId?: string;
      category?: string;
    };
  };
};
export type createNavigatorStackParamList = {
  CreateCollectionPage: undefined;
  AddCards: undefined;
  AiCardsCreator: { collectionInfo: CollectionData };
  ManualCardsCreation: { collectionInfo: CollectionData };
  CardsPreview: { collectionInfo: CollectionData };
};

export type PublicProfileTabParamsList = {
  publicCollections: {
    profileId: string;
  };
  publicPlaylist: {
    profileId: string;
  };
};
