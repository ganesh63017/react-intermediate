import { get } from "../services/http-methods";

export const fetchCategories = async (endpoint) => {
  //  * The response variable holds the response from the get method.

  const response = await get(endpoint);

  // Return the response from the API
  return response;
};
