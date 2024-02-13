import { getToken } from "../utils/useToken";
async function postData(data = {}) {
  const url = require("../utils/utils").base_url + "api";

  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${getToken()}`,
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const resp = await response.json();
    return resp;
  } catch (e) {
    return { success: 0, message: "Request failed" };
  }
  // parses JSON response into native JavaScript objects
}

export const postDataAuth = async (data = {}) => {
  const url = require("../utils/utils").base_url + "api";
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json();
  } catch (e) {
    return { success: 0, message: "Request failed" };
  }
  // parses JSON response into native JavaScript objects
};

export default postData;
