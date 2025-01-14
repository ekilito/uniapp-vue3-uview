import { defineStore } from "pinia";

let lifeData;
try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = uni.getStorageSync("lifeData");
} catch (e) {
  console.log(e);
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ["userInfo", "loginForm"];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = uni.getStorageSync("lifeData");
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    uni.setStorageSync("lifeData", tmp);
  }
};

const useStore = defineStore("store", {
  state: () => {
    return {
      userInfo: lifeData.userInfo || {},
      loginForm: lifeData.loginForm || {},
      version: "",
    };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    set(prop, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = prop.split(".");
      let saveKey = "";
      let len = nameArr.length;
      if (nameArr.length >= 2) {
        let obj = this[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        this[prop] = payload;
      }
      // 保存变量到本地，见顶部函数定义
      saveLifeData(prop, this[prop]);
    },
  },
});

export default useStore;
