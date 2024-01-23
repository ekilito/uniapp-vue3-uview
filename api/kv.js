import Http from "./http";


export const deptKV = (params) => Http.get("/blade-system/dept/tree", params);//所属部门
export const commonKV = (params) => Http.get("/device/kv/byCodeKv", params);//通用字典表
export const getAddressApi = (params) => Http.get("/blade-system/region/lazy-tree", params); //省市区

