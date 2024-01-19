<script setup>
import { onLaunch } from "@dcloudio/uni-app";
import config from "@/config/index.js";
import useStore from "@/stores/index.js";
let Store = useStore();
import { versionApi, refreshTokenApi } from "@/api/login.js";

onLaunch(() => {
  // #ifdef APP-PLUS
  process.env.NODE_ENV === "development" ? refreshJudge() : getVersion();
  // #endif
});

//判断版本
const getVersion = async () => {
  const res = await versionApi({
    applicationLogo: config.applicationLogo,
  });
  let version = res.version;
  //版本检查
  if (version !== plus.runtime.version) {
    Store.set("version", version);
    uni.reLaunch({
      url: "/pages/upgrade",
    });
  } else {
    this.refreshJudge();
  }
};

//判断是否刷新token
const refreshJudge = () => {
  //初始触发一次
  Store.userInfo.access_token
    ? refreshToken()
    : uni.reLaunch({
        url: "/pages/login/index",
      });
  setInterval(() => {
    Store.userInfo.access_token
      ? refreshToken()
      : uni.reLaunch({
          url: "/pages/login/index",
        });
  }, 1000 * 60 * 30); //30分钟
};

//刷新token值
const refreshToken = async () => {
  let info = {
    grant_type: "refresh_token",
    refresh_token: Store.userInfo.refresh_token,
    tenantId: Store.userInfo.tenant_id,
  };
  let res = await refreshTokenApi(info);
  Store.set("userInfo.access_token", res.access_token);
  Store.set("userInfo.refresh_token", res.refresh_token);
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/style/index.scss";

@import "@/uni_modules/uni-scss/index.scss";

</style>
