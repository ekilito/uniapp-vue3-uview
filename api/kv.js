import Http from "./http";

//所属部门
export const deptKV = (params) => Http.get("/blade-system/dept/tree", params);
//通用字典表
export const commonKV = (params) => Http.get("/device/kv/byCodeKv", params);

//备件类别
export const categoryTree = (params) => Http.get("/accessory/category/categoryTree", params);

//获取用户kv
export const userKv = (params) => Http.get("/business/userkv/userKv", params);

//生产厂家kv
export const factoryKv = (params) => Http.get("/device/kv/factoryKv", params);
export const byCodeKvApi = (params) => Http.get("/device/kv/byCodeKv", params); //业务字典表
export const getAddressApi = (params) => Http.get("/blade-system/region/lazy-tree", params); //省市区
export const projectKVApi = (params) => Http.get("/business/monitoring/project/projectKV", params); //项目kv
export const equipmentKVApi = (params) => Http.get("/business/monitoring/equipment/equipmentKV", params); //设备kv
export const alarmLevelKvApi = (params) => Http.get("/device/kv/alarmLevelKv", params); //报警等级kv
export const userKvApi = (params) => Http.get("/blade-user/user-list", params); //用户kv
export const trainersKV = (params) => Http.get("/business/training/trainersKV", params); //培训人kv

