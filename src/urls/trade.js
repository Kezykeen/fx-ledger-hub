import { generateUrlParams } from "../utils/helpers.utils";

const baseUrl = "Trade";

export const getTradeUrl = (params) =>
  `${baseUrl}?${generateUrlParams(params)}`;
export const editTradeUrl = () => `${baseUrl}`;
export const createTradeUrl = () => `${baseUrl}`;
export const getSingleTradeUrl = (id) => `${baseUrl}/${id}`;
export const adminActionTradeUrl = (id) => `${baseUrl}/${id}/process`;
