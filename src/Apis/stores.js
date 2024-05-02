import { get } from "../services/http-methods";

export const fetchStores = async (endpoint) => {
  //  * The response variable holds the response from the get method.

  const response = await get(endpoint);

  // Return the response from the API
  return response;
};

export const getStoresByCategory = async (slug) => {
  //  * The response variable holds the response from the get method.

  const response = await get(`stores?${slug}=1`);

  // Return the response from the API
  return response;
};
