import client from "./client";

import { INewDirection } from "../types/directions";

const axios = client();

export const getAllFermentDirections = async () => {
  return await axios
    .get("/directions")
    .then((res) => res)
    .catch((err) => err);
};

export const getFermentDirections = async (fermentId: string) => {
  return await axios
    .get(`/directions/ferment/${fermentId}`)
    .then((res) => res)
    .catch((err) => err);
};

export const createDirection = async (direction: INewDirection) => {
  return await axios
    .post("/directions", direction)
    .then((res) => res)
    .catch((err) => err);
};
