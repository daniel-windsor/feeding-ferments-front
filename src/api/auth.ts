import client from "./client";

import { IRegisterCredentials } from "../types/user";

const axios = client()

export const login = async (token: string) => {
  return await axios
    .post("/user/login", { token })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => { throw err });
};

export const signUp = async (credentials: IRegisterCredentials) => {
  return await axios
    .post("/user/signUp", credentials)
    .then((res) => res)
    .catch(err => { throw err })
    };

export const deleteAccount = async () => {
  return await axios
    .delete("/user")
    .then(res => res)
    .catch(err => { throw err })
}
