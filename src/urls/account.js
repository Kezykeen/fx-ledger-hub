const baseUrl = "Account";

export const getAccountUrl = () => `${baseUrl}`;
export const createAccountUrl = (currencyId) => `${baseUrl}/${currencyId}`;
export const fundAccountUrl = (accountId) => `${baseUrl}/${accountId}/fund`;
export const withdrawAccountUrl = (accountId) =>
  `${baseUrl}/${accountId}/withdraw`;
