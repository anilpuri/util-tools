import LocalStorageHelper from "./localStorageHelper";
import "dotenv/config";
const apiRequest = async ({
  url = "",
  method = "GET",
  params = null,
  body = null,
  headers = {},
  other = {},
  hasAuth = false,
}) => {
  var response = {
    status: "pending",
    data: null,
    error: null,
  };
  try {
    var tempHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };
    if (hasAuth) {
      var authToken = LocalStorageHelper.getItem("ver_app_auth");
      tempHeaders.Authorization = `Bearer ${authToken}`;
    }
    var requestOptions = {
      method: method,
      headers: tempHeaders,
      ...other,
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    const queryParams = null;
    if (params) {
      params = new URLSearchParams(params);
    }
    var API_URL = process.env.NEXT_PUBLIC_API_URL;
    const reqResponse = await fetch(
      `${API_URL}${url}${queryParams ? "?" + queryParams : ""}`,
      requestOptions
    );

    var responseData = await reqResponse.json();

    if (responseData?.error?.status === 401) {
      response.status = "error";
      response.error = responseData;
      LocalStorageHelper.removeItem("ver_app_auth");
      LocalStorageHelper.removeItem("ver_app_auth_user");
      window.location.reload(false);
    } else if (!reqResponse.ok) {
      response.status = "error";
      response.error = responseData;
    } else {
      response.status = "success";
      response.data = responseData;
    }
    return response;
  } catch (error) {
    response.status = "error";
    response.error = error;
    return response;
  }
};
export default apiRequest;
