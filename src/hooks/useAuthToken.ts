import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const TOKEN_KEY = "authToken";

interface UseAuthToken {
    token: string | null;
    saveToken: (token: string) => void;
    removeToken: () => void;
  }

export const useAuthToken = (): UseAuthToken => {
  const [token, setToken] = useState<string | null>(() => Cookies.get(TOKEN_KEY) || null);

  // Function to store token
  const saveToken = (newToken: string) => {
    setToken(newToken);
    Cookies.set(TOKEN_KEY, newToken, {
      expires: 1, // 1 days
      secure: true, // Ensures HTTPS only
      sameSite: "Strict", // Protects against CSRF
      path: "/",
    });
  };

  // Function to remove token
  const removeToken = () => {
    setToken(null);
    Cookies.remove(TOKEN_KEY);
  };

  // Sync token state with cookies
  useEffect(() => {
    const cookieToken = Cookies.get(TOKEN_KEY);
    if (cookieToken !== token) {
      setToken(cookieToken || null);
    }
  }, [token]);

  return { token, saveToken, removeToken };
};
