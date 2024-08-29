<template>
  <view class="login">
    <view class="login-head">
      <image style="height: 90rpx; width: 90rpx" src="/static/images/logo.png" mode="aspectFit"></image>
      <view class="title">3h1基础模板</view>
      <view class="wecome" v-if="activeName != 'register'">欢迎登录</view>
      <view class="wecome" v-else>欢迎注册</view>
    </view>
    <view style="width: 100%">
      <account v-if="activeName == 'account'"></account>
      <codeLogin v-else-if="activeName == 'code'"></codeLogin>
      <register
        v-else-if="activeName == 'register'"
        @change-login="activeName = 'account'"
        @changeFormType="handleChangeType('account')"
      ></register>
      <view class="tip u-margin-top-30 u-font-24">
        <!-- #ifdef MP-WEIXIN -->
        <u-icon name="info-circle-fill"></u-icon>
        <text>仅三禾一用户登陆</text>
        <!-- #endif -->
      </view>
    </view>
    <view class="change-type">
      <text class="type-item" v-if="activeName == 'code'" @click="handleChangeType('account')">账户密码登录</text>
      <text class="type-item" v-else @click="handleChangeType('code')">短信登录</text>
      <text class="type-split">|</text>
      <view>
        <text v-if="activeName != 'register'">
          还没账号？
          <text class="type-item" @click="handleChangeType('register')">去注册</text>
        </text>
        <text v-else>
          已有账号？
          <text class="type-item" @click="handleChangeType('code')">去登录</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import account from "./account.vue";
import codeLogin from "./code.vue";
import register from "./register.vue";
import { ref } from "vue";
const activeName = ref("account");

//改变登陆方式
const handleChangeType = (playload) => {
  activeName.value = playload;
};
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #fff;
  padding: 54rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 100rpx;
  box-sizing: border-box;
}

.login-head {
  margin-top: 60rpx;
  height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .title {
    font-size: 50rpx;
    font-weight: bold;
    color: #000;
  }

  .wecome {
    color: #000;
    font-size: 40rpx;
  }
}

.change-type {
  width: 100%;
  margin-top: 60rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;

  .type-split {
    color: #eee;
    padding: 0 10px;
  }

  .type-item {
    color: $uni-success;
  }
}

.tip {
  color: #333;
  text-align: center;
}
</style>

