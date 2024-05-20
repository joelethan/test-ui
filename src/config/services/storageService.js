import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function getAccessToken() {
  const accessToken = cookies.get("auth_access");
  return accessToken?.token;
}

export function clearToken() {
  cookies.remove("auth_access");
}
