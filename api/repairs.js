import Http from "@/api/http";
let urlencoded = {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
}



export const listApi = (params) => Http.get("/RepairsInfo/page", params);
export const detailApi = (params) => Http.get("/RepairsInfo/detail", params);
export const saveApi = (params) => Http.post("/RepairsInfo/save", params);
export const updateApi = (params) => Http.post("/RepairsInfo/update", params);
export const submitApi = (params) => Http.post("/RepairsInfo/submit", params);
export const rejectApi = (params) => Http.post("/RepairsInfo/reject", params);
export const completeApi = (params) => Http.post("/RepairsInfo/complete", params,urlencoded);

