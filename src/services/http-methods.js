import { apiRoutes } from "./constants";
import { handleRequest } from "./http-instance";

// Base URL for API
const BASE_URL = apiRoutes.baseUrl;

// GET method
export async function get(endpoint) {
  const url = BASE_URL + endpoint;

  const config = {
    method: "GET",
  };

  return handleRequest(url, config);
}
