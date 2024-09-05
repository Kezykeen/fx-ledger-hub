import axios from "axios";
import { store } from "../redux/store";
import { logout, setUser } from "../redux/reducers";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

let token;
let refreshToken;
const state = store.getState();
const userState = state?.user;
if (userState === null) {
  token = "";
} else {
  const { token, refreshToken } = userState;
  token;
  refreshToken;
}

request.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Make a request to refresh the token
        const { data } = await axios.post(
          `${BASE_URL}/authentication/refresh-token`,
          { accessToken: token, refreshToken }
        );

        // update user object
        setUser(data);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return request(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., logout the user)
        store.dispatch(logout(null));
        toast.error("Session expired. Please log in again.");
        return Promise.reject(refreshError);
      }
    }
    // Handle network errors or other errors here
    if (error.response?.status === 500) {
      toast.error("Something went wrong.");
      return Promise.reject("Something went wrong.");
    }

    if (error.response?.status === 400) {
      if (typeof error.response?.data?.errors === "object") {
        const errArray = error.response?.data?.errors;
        errArray.map((x) => toast.error(x));
      } else {
        toast.error(error.response?.data?.errors);
      }
      return Promise.reject(error.response?.data?.errors);
    }

    if (error.response?.status === 403) {
      if (typeof error.response?.data?.errors === "object") {
        const errArray = error.response?.data?.errors;
        errArray.map((x) => toast.error(x));
      } else {
        toast.error(error.response?.data?.errors);
      }
      return Promise.reject(error.response?.data?.errors);
    }
    return Promise.reject(error?.response);
  }
);

export default request;
