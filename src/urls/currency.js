const baseUrl = "Currency";

export const getAccountByCurrencyUrl = (currencyType) =>
  `${baseUrl}/${currencyType}`;
