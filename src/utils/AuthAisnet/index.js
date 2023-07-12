import Cookies from "js-cookie";

const AuthAisnet = {
  isAuthorization() {
    if (Cookies.get("access_token")) return true;
    return null;
  },
  getAccessToken() {
    return Cookies.get("access_token");
  },
  storeUserInfoToCookie(data) {
    if (!data.access_token) return null;
    const { access_token } = data;
    Cookies.set("access_token", access_token, { expires: 1 });
    return data;
  },
};

export default AuthAisnet;
