import Http from "./http";

let urlencoded = {
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
};
export const detailApi = (params) => Http.get("/blade-user/info", params);
export const updatePasswordApi = (params) => Http.post("/blade-user/update-password", params, urlencoded); //更新密码
export const updateInfoApi = (params) => Http.post("/blade-user/update-info", params); //更新信息
export const proposalApi = (params) => Http.post("/blade-user/xxxx", params); //建议