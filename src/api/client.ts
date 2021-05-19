import axios from "axios";

const client = () => {
  const defaultOptions = {
    baseURL: "http://localhost:3030",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    config.headers.authorization = token || "";

    return config
  });

  return instance
};

export default client
