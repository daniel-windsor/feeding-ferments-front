export interface ILoginCredentials { 
  email: string,
  password: string
};

export interface IRegisterCredentials {
  displayName: string,
  email: string,
  password: string,
  passwordConf: string
}

export interface IUser {
  displayName: string,
  email: string,
  uid: string
}
