export interface LoginCredentials { 
  email: string,
  password: string
};

export interface RegisterCredentials {
  displayName: string,
  email: string,
  password: string,
  passwordConf: string
}

export interface User {
  displayName: string,
  email: string,
  uid: string
}
