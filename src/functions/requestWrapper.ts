import axios from "axios";

const makeRequest = (
  url: string,
  method: "post" | "get" | "put" | "patch",
  bearer?: string,
  body?: object
) =>
  axios({
    method,
    url,
    headers: {Authorization: `Bearer ${bearer}`, "Content-Type": "text/plain"},
    data: body,
  })
    .then((res) => res)
    .catch((error) => {
      switch (error.response.status) {
        case 401:
          console.log("redirect to login");
          break;
        case 404:
          console.log("not found");
          break;
        default:
          console.log(`error code: ${error.response.status}, ${error.response.data}`);
          break;
      }
      return error;
    });

export default makeRequest;
