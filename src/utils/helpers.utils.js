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
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
