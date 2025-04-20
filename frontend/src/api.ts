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
      return error.response.data;
    });
};

export const signup = async (email: string, password: string, name: string) => {
  const body = {
    email: email,
    password: password,
    name: name,
  };
  return axios
    .post("http://localhost:5000/api/users/signup", body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
