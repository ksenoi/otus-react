

export type SignInBody = {
  email: string;
  password: string;
};

export type SignUpBody = SignInBody & {
  commandId: string;
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: Date;
  commandId: String;
};

export type Token = {
  token:String;
  profile: Profile;
}