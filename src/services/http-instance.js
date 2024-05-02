export async function handleRequest(url, options) {
  try {
    // Send fetch request
    const response = await fetch(url, options);
    const apiResponse = await response.json();

    return apiResponse;
  } catch (error) {
    // Handle other errors
    const errorResponse = {
      ok: false, // Set ok to false on error
      data: null,
      status: 500,
      info: "Something went wrong",
      error: error instanceof Error ? error.message : "Something went wrong",
    };

    return errorResponse;
  }
}
