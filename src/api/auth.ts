import axios from "axios";

import { RegisterCredentials } from "../types/user";

export const login = async (token: string) => {
  return await axios
    .post("http://localhost:3030/user/login", { token })
    .then((res) => res)
    .catch((err) => console.log(err));
};

export const register = async (credentials: RegisterCredentials) => {
  return await axios
    .post("http://localhost:3030/user/register", credentials)
    .then((res) => res)
    .catch((err) => console.log(err));
};
