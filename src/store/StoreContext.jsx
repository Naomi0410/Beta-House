import { userService } from "@/api";
import { usePersist } from "@/hooks";
import { createContext, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const ContextStore = createContext({});

export const StoreProvider = ({ children }) => {
  const [token, setToken] = usePersist("clientToken", null);
  const [loggedInUser, setLoggedInUser] = usePersist("sellerDetails", null);

  function isTokenValid(checkToken) {
    if (typeof checkToken !== "string") {
      console.error("Invalid token specified: must be a string");
      return false;
    }
    try {
      const decoded = jwtDecode(checkToken);
      const now = Date.now() / 1000;
      return decoded.exp > now;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  const logout = useCallback(() => {
    toast.info("You are logged out", { toastId: "logout" });
    setLoggedInUser(null);
    setToken(null);
  }, [setLoggedInUser, setToken]);

  const getUser = useCallback(async () => {
    if (!isTokenValid(token)) return;
    try {
      const { data } = await userService.authUser(token);
      setLoggedInUser(data);
    } catch (error) {
      console.error(error);
    }
  }, [setLoggedInUser, token]);

  const refreshUserToken = useCallback(async () => {
    try {
      const refreshTokenResponse = await userService.getRefreshToken(
        loggedInUser?._id
      );
      const accessTokenResponse = await userService.refreshToken({
        refreshToken: refreshTokenResponse.data.refreshToken,
      });
      setToken(accessTokenResponse.data.accessToken);
      getUser();
    } catch (error) {
      console.error(error);
      setToken(null);
    }
  }, [loggedInUser?._id, setToken, getUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (!token) return;

    const refresh = async () => {
      const tokenExp = new Date(jwtDecode(token).exp * 1000);
      if (tokenExp - new Date() < 60 * 1000) {
        try {
          await refreshUserToken();
        } catch (error) {
          console.error(error);
          setToken(null);
        }
      }
    };

    const interval = setInterval(() => {
      refreshUserToken();
      refresh();
    }, 6 * 60 * 1000);

    refresh();
    return () => clearInterval(interval);
  }, [refreshUserToken, setToken, token]);

  const contextData = {
    token,
    setToken,
    loggedInUser,
    logout,
    setLoggedInUser,
    getUser,
  };

  return (
    <ContextStore.Provider value={contextData}>
      {children}
    </ContextStore.Provider>
  );
};
