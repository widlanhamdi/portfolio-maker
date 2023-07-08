import Cookies from "js-cookie";

const AuthCDC = {
  isAuthorization() {
    if (Cookies.get("token") && Cookies.get("role") === "cdc") return true;
    return null;
  },
  getAccessToken() {
    return Cookies.get("token") && Cookies.get("role") === "cdc";
  },
  signOut(navigate) {
    Cookies.remove("token");
    Cookies.remove("uid");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    navigate("/cdc/login");
  },
  storeCDCInfoToCookie(user, data) {
    if (!user.accessToken) return null;
    Cookies.remove("token");
    Cookies.remove("uid");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    const { accessToken } = user;
    const { role } = data;
    Cookies.set("token", accessToken, { expires: 1 });
    Cookies.set("role", role, { expires: 1 });
    return user && data;
  },
};

export default AuthCDC;
