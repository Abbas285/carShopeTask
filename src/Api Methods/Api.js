import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000/",
});

export const getLoginUser = async (configuration) => {
  const { route } = configuration;
  const response = await api.get(route);
  return response;
};

export const signInNewuser = async (configuration) => {
  const { route, data } = configuration;
  const response = await api.post(route, data);
  return response;
};

export const getApiData = async (configuration) => {
  const { route } = configuration;
  const response = await api.get(route);
  return response;
};
export const postApiData = async (configuration) => {
  const { route, data } = configuration;
  const response = await api.post(route, data);
  return response;
};
export const DleteApiData = async (configuration) => {
  const { route } = configuration;
  const response = await api.delete(route);
  return response;
};
export const updateRecourd = async (configuration) => {
  const { route, data } = configuration;
  const response = await api.put(route, data);
  return response;
};
