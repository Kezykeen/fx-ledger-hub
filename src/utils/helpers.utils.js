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
