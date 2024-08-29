<template>
  <view class="user">
    <view class="user-info">
      <image :src="info.avator" style="width: 100rpx; height: 100rpx" mode="widthFix"></image>
      <view class="base-info">
        {{ info.name }}
      </view>
    </view>
    <uni-list>
      <uni-list-item title="个人信息" showArrow clickable link="navigateTo" to="/pages/user/setting"></uni-list-item>
      <uni-list-item title="修改密码" showArrow clickable link="navigateTo" to="/pages/user/editPassword"></uni-list-item>
      <uni-list-item title="关于我们" showArrow clickable link="navigateTo" to="/pages/user/about"></uni-list-item>
    </uni-list>
    <button class="login-out-btn" size="primary" @click="handleLoginOut">退出登录</button>
  </view>
</template>

<script setup>
import config from '@/config/index.js';
import useStore from '@/stores/index.js';
import { reactive } from 'vue';
const Store = useStore();
const info = reactive({
  avator: '/static/images/logo.png',
  phone: '',
  name: ';'
});
const getInfo = () => {
  info.name = Store.$state.userInfo.nick_name;
  info.avator = Store.$state.userInfo.avatar;
};
getInfo();

//退出登陆
const handleLoginOut = () => {
  Store.set('userInfo', {});
  uni.showToast({
    title: '退出登录成功',
    mask: true
  });
  setTimeout(() => {
    uni.reLaunch({
      url: '/pages/login/index'
    });
  }, 1000);
};
</script>

<style scoped lang="scss">
.user-info {
  padding: 80rpx 60rpx;
  background-color: $uni-main-color;
  display: flex;
  align-items: center;
  .base-info {
    margin-left: 40rpx;
    color: $uni-white;
  }
}

.login-out-btn {
  margin-top: 80rpx;
  width: 700rpx;
}
</style>
