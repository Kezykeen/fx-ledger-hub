import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "../utils/network";

const useApiMutation = (
  method,
  endpoint,
  onSuccessCallback = () => {},
  invalidateKey
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await request[method](endpoint, payload);
      return data?.data;
    },
    onSuccess: (data) => {
      if (invalidateKey) {
        queryClient.invalidateQueries(invalidateKey);
      }
      onSuccessCallback(data);
    },
  });
};

export const useGet = (key, endpoint, config) => {
  return useQuery(key, async () => {
    const { data } = await request.get(endpoint, config);
    return data;
  });
};

export const usePost = (endpoint, onSuccessCallback, invalidateKey) =>
  useApiMutation("post", endpoint, onSuccessCallback, invalidateKey);

export const usePut = (endpoint, onSuccessCallback, invalidateKey) =>
  useApiMutation("put", endpoint, onSuccessCallback, invalidateKey);

export const useDelete = (endpoint, onSuccessCallback, invalidateKey) =>
  useApiMutation("delete", endpoint, onSuccessCallback, invalidateKey);
