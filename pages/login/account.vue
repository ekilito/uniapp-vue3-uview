<template>
  <view class="account-form">
    <uni-forms ref="loginFormRef" label-position="top" :rules="formRules" validateTrigger="blur" :model="form">
      <uni-forms-item label="账号:" name="username" class="no-label">
        <uni-easyinput type="text" v-model="form.username" placeholder="请输入账号">
          <template #left>
            <image src="/static/images/login/username.png" alt="icon" class="user_icon" />
          </template>
        </uni-easyinput>
      </uni-forms-item>
      <uni-forms-item label="密码:" name="password" class="no-label">
        <uni-easyinput type="password" v-model="form.password" placeholder="请输入密码">
          <template #left>
            <image src="/static/images/login/password.png" alt="icon" class="user_icon" />
          </template>
        </uni-easyinput>
      </uni-forms-item>
      <uni-forms-item name="remember" class="no-label pwCheckbox">
        <uni-data-checkbox
          @click="handleClick"
          v-model="form.remember"
          :localdata="[{ text: '记住密码', value: 0 }]"
          selectedColor="#a0a2ab"
        ></uni-data-checkbox>
      </uni-forms-item>
    </uni-forms>
    <button class="login-btn" type="primary" size="default" :disabled="isOkLogin" @click="handleSubmit">登录</button>
  </view>
</template>
<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, watch } from "vue";
import md5 from "@/utils/md5.js";
import { deepClone } from "@/utils/object.js";
import validate from "@/utils/validate.js";
import { trim } from "@/utils/filter.js";
import useStore from "@/stores";
import { loginApi } from "@/api/login.js";

const Store = useStore();
const loginFormRef = ref();
const isOkLogin = ref(false);
const form = reactive({
  tenantId: "000000",
  username: "",
  password: "",
  remember: 1,
});
const formRules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: "请输入账号",
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: "请输入密码",
      },
    ],
  },
};

onLoad(() => {
  const loginForm = Store.$state.loginForm;
  if (loginForm) {
    form.username = loginForm.username;
    form.password = loginForm.password;
    form.remember = loginForm.remember;
  }
});

const handleClick = () => {
  form.remember = 1;
};

//监听form变化
watch(
  () => form,
  (val) => {
    hanldeJudge(val);
  },
  {
    deep: true,
  },
);
//判断信息格式取消按钮状态
async function hanldeJudge(val) {
  if (val.username && val.password) {
    isOkLogin.value = false;
  } else {
    isOkLogin.value = true;
  }
}
//登陆提交
async function handleSubmit() {
  form.password = trim(form.password, "all");
  form.username = trim(form.username, "all");
  let valid = await loginFormRef.value.validate();
  if (!valid) return;

  let info = deepClone(form);

  // 如果用户选择记住密码，存储登录表单信息
  if (form.remember === 0) {
    Store.set("loginForm", {
      username: info.username,
      password: info.password,
      remember: 0,
    });
  }

  if (form.remember === 1) {
    // 如果用户取消记住密码，清除之前保存的登录表单信息
    Store.set("loginForm", {
      username: "",
      password: "",
      remember: 1,
    });
  }

  info.password = md5(info.password);

  const res = await loginApi({
    tenantId: info.tenantId,
    username: info.username,
    password: info.password,
  });
  // Store.set("loginForm", form);
  Store.set("userInfo", res);

  // #ifdef MP-WEIXIN
  uni.login({
    provider: "weixin", //使用微信登录
    success: async function (loginRes) {
      console.log("loginRes", loginRes);
      // await setWXCodeApi({ code: loginRes.code });
    },
  });
  // #endif
  uni.showLoading({
    title: "登录成功",
    mask: true,
  });
  setTimeout(() => {
    uni.hideLoading();
    uni.reLaunch({
      url: "/pages/home/index",
    });
  }, 1500);
}
</script>

<style scoped lang="scss">
.account-form {
  margin-top: 60rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
  background: #2991ff;
}

.user_icon {
  width: 66rpx;
  height: 38rpx;
  padding-left: 22rpx;
}

.pwCheckbox {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-label ::v-deep .uni-forms-item__label {
  display: none;
}

:deep(.uni-data-checklist .checklist-group .checklist-box .radio__inner) {
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.uni-data-checklist .checklist-group .checklist-box .checklist-content .checklist-text) {
  font-size: 24rpx;
  font-weight: 400;
  color: #4b4b4b !important;
}

:deep(.uni-data-checklist .checklist-group .checklist-box .radio__inner .radio__inner-icon) {
  width: 70%;
  height: 70%;
  border-radius: 50%;
}

:deep(.uni-data-checklist .checklist-group .checklist-box) {
  margin: 0;
}
</style>

