

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
  commandId: string;
};

export type Token = {
  token:string;
  profile: Profile;
}