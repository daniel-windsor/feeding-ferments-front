import client from "./client";

import { INewFerment } from "../types/ferment";

const axios = client();

export const getAllFerments = async () => {
  return await axios
    .get("ferment")
    .then((res) => res)
    .catch((err) => err);
};

export const createFerment = async (ferment: INewFerment) => {
  return await axios
    .post("/ferment", ferment)
    .then((res) => res)
    .catch((err) => err);
};

export const updateFerment = async (fermentId: String, ferment: INewFerment) => {
  return await axios
    .patch(`/ferment/${fermentId}`, ferment)
    .then((res) => res)
    .catch((err) => err);
};

export const deleteFerment = async (fermentId: string) => {
  return await axios
    .delete(`/ferment/${fermentId}`)
    .then((res) => res)
    .catch((err) => err);
};
