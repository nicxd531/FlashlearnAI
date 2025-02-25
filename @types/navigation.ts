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
