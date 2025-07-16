export const handleAxiosError = (error) => {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
        throw new Error("Unauthorized — check your API key");
      case 403:
        throw new Error(
          "Forbidden — you might not have access to this resource"
        );
      case 404:
        throw new Error("Not found — the requested resource doesn't exist");
      case 429:
        throw new Error("Rate limit exceeded — slow down a bit");
      case 500:
      case 502:
      case 503:
        throw new Error("Server error — please try again later");
      default:
        throw new Error("Something went wrong — please try again");
    }
  } else if (error.request) {
    throw new Error("No response from server — check your internet connection");
  } else {
    throw new Error("Unexpected error occurred");
  }
};
