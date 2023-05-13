import type { AxiosError } from "axios";
import axios from "axios";

interface ServerError {
  message: string;
}

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<ServerError>;
    if (serverError && serverError.response) {
      return serverError.response.data?.message;
    }
    return "something went wrong!";
  }
  return "Unknown";
};

export { getErrorMessage };
