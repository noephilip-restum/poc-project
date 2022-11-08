import axios from "axios";

export const apiCall = async (url: String, method: String, data?: any) => {
  let response = [];
  let token = getCookie("token");
  let baseUrl = "http://localhost:3000";
  let options: any = {
    method: method,
    url: baseUrl + url,
    data: data,
    headers: {},
  };
  if (token) {
    options.headers = { Authorization: `Bearer ${token}` };
  }
  let request: any = await axios(options);
  response = request;
  return response;
};

export const validateEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? true
    : false;
};

export const padTo2Digits = (num: Number) => {
  return num.toString().padStart(2, "0");
};

/**
 * Used for formatting the date and time
 * @param {date}
 * @return
 */
export const formatDate = (date: any) => {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
};

/**
 * Setting the cookie to the browser
 * @param {name, value, days}
 * @return
 */
export const setCookie = (name: String, value: String, days: any) => {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

/**
 * Parsing the token from JWT
 * @param {token}
 * @return
 */
export const parseJwt = (token: any) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

/**
 * Getting the cookie from the browser
 * @param {name}
 * @return
 */
export const getCookie = (name: String) => {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Deletion of cookie from the browser
 * @param {email}
 * @return
 */
export const deleteCookie = (name: String) => {
  localStorage.removeItem("loggedIn");
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
