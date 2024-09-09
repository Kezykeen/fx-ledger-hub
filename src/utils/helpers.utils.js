export function createBreadcrumbs(pathname) {
  const pathArray = pathname.split("/").filter(Boolean);
  const breadcrumbs = [];
  let currentPath = "";

  pathArray.forEach((path, index, array) => {
    currentPath += `/${path}`;
    const breadcrumb = {
      name: path.replace(/-/g, " "),
    };
    if (array[array.length - 1] !== array[index]) {
      breadcrumb.path = currentPath;
    }
    breadcrumbs.push(breadcrumb);
  });

  return breadcrumbs;
}

export function formatCurrency(amount, locale = "en-US") {
  const formatted = `${amount.toLocaleString(locale, {
    style: "currency",
    currency: "NGN",
  })}`;
  return formatted.replace(/\.00$/, "").replace(/NGN/, "").slice(1);
}

export const formatNumberWithCommas = (number) => {
  if (!number) return "0";

  const [wholePart, decimalPart] = number.toString().split(".");
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedDecimalPart = decimalPart ? `.${decimalPart.slice(0, 2)}` : "";
  return `${formattedWholePart}${formattedDecimalPart}`;
};

export const findValueAndLabel = (
  id,
  array,
  property = "value",
  strictCompare = false
) => {
  const found = array.find((item) =>
    // eslint-disable-next-line
    strictCompare ? item[property] === id : item[property] == id
  );
  return found?.value ? { value: found?.value, label: found?.label } : null;
};

export const parseSelectFormData = (data) => {
  const parsedData = {};

  for (const key in data) {
    if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      "value" in data[key]
    ) {
      parsedData[key] = data[key].value;
    } else {
      parsedData[key] = data[key];
    }
  }
  return parsedData;
};

export const parseSelectFormArrayData = (data) => {
  const parsedData = {};

  for (const key in data) {
    if (Array.isArray(data[key])) {
      // If the value is an array, iterate over its items
      parsedData[key] = data[key].map((item) => parseSelectFormData(item));
    } else if (
      typeof data[key] === "object" &&
      data[key] !== null &&
      "value" in data[key]
    ) {
      parsedData[key] = data[key].value;
    } else {
      parsedData[key] = data[key];
    }
  }

  return parsedData;
};

export const generateUrlParams = (obj) => {
  let generatedUrl = ``;
  const arrayOfObjectKeys = Object.keys(obj);
  arrayOfObjectKeys.forEach((key) => {
    if (obj[key]) {
      generatedUrl += `${key}=${obj[key]}&`;
    }
  });
  return generatedUrl;
};

export const formatSelectItems = (items, label, value) => {
  return items?.length > 0
    ? items.map((data) => {
        const newObj = {};
        if (Array.isArray(value)) {
          value.forEach((item) => {
            newObj[item] = data[item];
          });
        }
        return {
          value: Array.isArray(value) ? newObj : data[value],
          label: Array.isArray(label)
            ? `${data[label[0]]} (${data[label[1]]})`
            : data[label],
        };
      })
    : [];
};

export const convertCurrency = (rate, amount, currencyA, currencyB) => {
  const multiplicationCurrencies = [
    ["RMB", "NAIRA"],
    ["RMB", "XAF"],
    ["RMB", "IVORY"],
    ["USDT", "RMB"],
    ["USDT", "NAIRA"],
    ["USDT", "XAF"],
    ["USDT", "IVORY"],
    ["ZELLE", "NAIRA"],
    ["ZELLE", "RMB"],
    ["ZELLE", "XAF"],
    ["ZELLE", "IVORY"],
    ["XAF", "NAIRA"],
  ];

  const divisionCurrencies = [
    ["RMB", "USDT"],
    ["RMB", "DOLLAR"],
    ["NAIRA", "XAF"],
    ["NAIRA", "IVORY"],
    ["NAIRA", "RMB"],
    ["NAIRA", "ZELLE"],
    ["NAIRA", "DOLLAR"],
    ["XAF", "USDT"],
    ["XAF", "DOLLAR"],
    ["XAF", "RMB"],
    ["XAF", "ZELLE"],
  ];

  const percentageCurrencies = [["USDT", "DOLLAR"]];

  if (
    multiplicationCurrencies.some(
      (pair) =>
        pair[0]?.toLowerCase() === currencyA?.toLowerCase() &&
        pair[1]?.toLowerCase() === currencyB?.toLowerCase()
    )
  ) {
    console.log("1");
    return amount * rate;
  } else if (
    divisionCurrencies.some(
      (pair) =>
        pair[0]?.toLowerCase() === currencyA?.toLowerCase() &&
        pair[1]?.toLowerCase() === currencyB?.toLowerCase()
    )
  ) {
    console.log("2");
    return amount / rate;
  } else if (
    percentageCurrencies.some(
      (pair) =>
        pair[0]?.toLowerCase() === currencyA?.toLowerCase() &&
        pair[1]?.toLowerCase() === currencyB?.toLowerCase()
    )
  ) {
    console.log("3");
    return amount * (rate / 100);
  } else {
    console.log("none");
    return 0;
  }
};

export const rateCurrencyConversion = (
  rate,
  amount,
  outgoingCurrency,
  incomingCurrency
) => {
  const outgoing = outgoingCurrency?.toLowerCase();
  const incoming = incomingCurrency?.toLowerCase();

  const formulaMapping = {
    // SELLING FORMULAS
    rmb: {
      naira: (amount, rate) => amount * rate,
      usdt: (amount, rate) => amount / rate,
      dollar: (amount, rate) => amount / rate,
      xaf: (amount, rate) => amount * rate,
      ivory: (amount, rate) => amount * rate,
    },
    usdt: {
      rmb: (amount, rate) => amount * rate,
      naira: (amount, rate) => amount * rate,
      xaf: (amount, rate) => amount * rate,
      ivory: (amount, rate) => amount * rate,
      dollar: (amount, rate) => amount * rate,
    },
    zelle: {
      naira: (amount, rate) => amount * rate,
      rmb: (amount, rate) => amount * rate,
      xaf: (amount, rate) => amount * rate,
      ivory: (amount, rate) => amount * rate,
    },
    naira: {
      xaf: (amount, rate) => amount / rate,
      ivory: (amount, rate) => amount / rate,
      rmb: (amount, rate) => amount / rate,
      zelle: (amount, rate) => amount / rate,
      dollar: (amount, rate) => amount / rate,
    },
    xaf: {
      naira: (amount, rate) => amount * rate,
      usdt: (amount, rate) => amount / rate,
      dollar: (amount, rate) => amount / rate,
      rmb: (amount, rate) => amount / rate,
      zelle: (amount, rate) => amount / rate,
    },
  };

  // Determine if the operation is reversed
  const isReversed = formulaMapping[outgoing]?.[incoming] === undefined;
  console.log(isReversed);

  if (isReversed) {
    // Reverse the currencies for the opposite operation (buying scenario)
    const conversionFunction = formulaMapping[incoming]?.[outgoing];
    if (!conversionFunction) {
      return amount;
    }
    return conversionFunction(amount, rate);
  } else {
    // Apply the normal selling formula
    const conversionFunction = formulaMapping[outgoing]?.[incoming];
    if (!conversionFunction) {
      return amount;
    }
    return conversionFunction(amount, rate);
  }
};
