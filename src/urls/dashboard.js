import { generateUrlParams } from "../utils/helpers.utils";

const baseUrl = "Dashboard";

export const overviewUrl = (params) =>
  `${baseUrl}/overview?${generateUrlParams(params)}`;
export const graphUrl = (year) => `${baseUrl}/graph/${year}`;
export const recentTransactionUrl = () => `${baseUrl}/recent`;
