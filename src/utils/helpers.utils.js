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
  return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
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
