export const apiRoutes = {
  baseUrl: "http://localhost:3001/",
  categories: "categories",
  stores: "stores",
};

export const dollarPng =
  "https://laraback.enactweb.com/img/money-back-guarantee.png";

export const filters = [
  {
    id: "cashback-checkbox",
    checked: "flase",
    query: "cashback_enabled=1",
    value: "cashback_enabled",
  },
  {
    id: "promoted-checkbox",
    checked: "flase",
    query: "is_promoted=1",
    value: "is_promoted",
  },
  {
    id: "shareble-checkbox",
    checked: "flase",
    query: "is_sharable=1",
    value: "is_sharable",
  },
  {
    id: "status-checkbox",
    checked: "flase",
    query: "status=draft",
    value: "status",
  },
];
