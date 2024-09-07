import axios from "axios";
import { store } from "../redux/store";
import { logout, setUser } from "../redux/reducers";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

request.interceptors.request.use(
  (config) => {
    let accessToken;
    const { user } = store.getState();
    if (user === null) {
      accessToken = "";
    } else {
      const { token } = user;
      accessToken = token;
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    let accessToken;
    let refresh;
    const { user } = store.getState();
    if (user === null) {
      accessToken = "";
    } else {
      const { token, refreshToken } = user;
      accessToken = token;
      refresh = refreshToken;
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Make a request to refresh the token
        const { data } = await axios.post(
          `${BASE_URL}/authentication/refresh-token`,
          { accessToken, refreshToken: refresh }
        );

        // update user object
        setUser(data);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return request(originalRequest);
      } catch (refreshError) {
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
      if (typeof error.response?.data?.responseMessage === "object") {
        const errArray = error.response?.data?.responseMessage;
        errArray.map((x) => toast.error(x));
      } else {
        toast.error(error.response?.data?.responseMessage);
      }
      return Promise.reject(error.response?.data?.responseMessage);
    }

    if (error.response?.status === 403) {
      if (typeof error.response?.data?.responseMessage === "object") {
        const errArray = error.response?.data?.responseMessage;
        errArray.map((x) => toast.error(x));
      } else {
        toast.error(error.response?.data?.responseMessage);
      }
      return Promise.reject(error.response?.data?.responseMessage);
    }
    return Promise.reject(error?.response);
  }
);

export default request;
