import axios from "axios";

export const login = async (email: string, password: string) => {
  const body = {
    email: email,
    password: password,
  };
  return axios
    .post("http://localhost:5000/api/users/login", body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error.response?.data?.error || error.message);
    });
};
