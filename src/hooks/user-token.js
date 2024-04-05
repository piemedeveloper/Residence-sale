import { useState } from "react";
import { jwtDecode } from "jwt-decode";

var CryptoJS = require("crypto-js");

const storedToken = () => {
  const tokenString = localStorage.getItem("token");

  if (tokenString == null) {
    return "";
  }
  return decrypt(tokenString);
};

const encKey =
  "3518b24be3e5366233465eee7672d222bf3cf4f64760772a66d20bc595886b089d765985e06976774ae4218b4bbc5c081f13938289f3b5bc671e3b99cf994a4e";

function decrypt(cipherText) {
  try {
    var bytes = CryptoJS.AES.decrypt(cipherText, encKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    localStorage.removeItem("token");
    return "";
  }
}

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");

    if (tokenString == null) {
      return "";
    }
    if (decrypt(tokenString).length < 10) return undefined;
    return decrypt(tokenString);
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    const enc = encrypt(userToken);
    localStorage.setItem("token", enc);
    setToken(enc);
  };

  const removeToken = () => {
    // localStorage.setItem("token", null);
    localStorage.removeItem("token");
    setToken(null);
  };

  return {
    setToken: saveToken,
    removeToken: removeToken,
    token,
  };
}

export const getToken = () => {
  try {
    return storedToken();
  } catch (e) {
    return "";
  }
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

function encrypt(text) {
  return CryptoJS.AES.encrypt(text, encKey).toString();
}

export const getUser = () => {
  const tokenString = storedToken();
  try {
    return jwtDecode(decrypt(tokenString));
  } catch (e) {
    return jwtDecode(tokenString);
  }
};
