import Cookies from "js-cookie";

const AuthUser = {
  isAuthorization() {
    if (Cookies.get("token") && Cookies.get("role") === "user") return true;
    return null;
  },
  getAccessToken() {
    return Cookies.get("token");
  },
  signOut(navigate) {
    Cookies.remove("access_token");
    Cookies.remove("token");
    Cookies.remove("uid");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    navigate("/login");
  },
  storeUserInfoToCookie(user, data) {
    if (!user.accessToken) return null;
    Cookies.remove("access_token");
    Cookies.remove("token");
    Cookies.remove("uid");
    Cookies.remove("role");
    Cookies.remove("name");
    Cookies.remove("email");
    const { accessToken } = user;
    const { uid, role, name, email } = data;
    Cookies.set("token", accessToken, { expires: 1 });
    Cookies.set("uid", uid, { expires: 1 });
    Cookies.set("role", role, { expires: 1 });
    Cookies.set("name", name, { expires: 1 });
    Cookies.set("email", email, { expires: 1 });
    return user && data;
  },
};

export default AuthUser;
