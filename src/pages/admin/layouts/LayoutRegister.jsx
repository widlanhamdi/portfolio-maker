import React from "react";
// import AuthAisnet from "../../../utils/AuthAisnet";
import LoginAisnet from "../components/LoginAisnet";
import ListMahasiswa from "../components/ListMahasiswa";
import Cookies from "js-cookie";

export default function LayoutRegister() {
  return <div>{Cookies.get("access_token") ? <ListMahasiswa /> : <LoginAisnet />}</div>;
}
