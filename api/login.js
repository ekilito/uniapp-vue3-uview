import Http from "./http";

let appendUrl = {
	'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
};
//登陆
export const loginApi = (params) =>
  Http.post("/blade-auth/oauth/token", {
    grant_type: "password",
    scope: "all",
    type: "account",
    ...params,
  },appendUrl);

//刷新token
export const refreshTokenApi = (params) =>
  Http.post("/blade-auth/oauth/token", {
    grant_type: "password",
    scope: "all",
    type: "account",
    ...params,
  });

//获取版本
export const versionApi = (params) => Http.get("http://117.71.48.19:8099/api/common/get-version", params);
