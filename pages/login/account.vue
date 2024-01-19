<template>
	<view class="account-form">
		<uni-forms ref="loginFormRef" label-position="top" :rules="formRules" validateTrigger="blur" :model="form">
			<uni-forms-item label="账号:" name="username">
				<uni-easyinput type="text" v-model="form.username" placeholder="请输入账号" />
			</uni-forms-item>
			<uni-forms-item label="密码:" name="password">
				<uni-easyinput type="password" v-model="form.password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="login-btn" type="primary" size="default" :disabled="isOkLogin" @click="handleSubmit">登录</button>
	</view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, watch } from 'vue';
import md5 from '@/utils/md5.js';
import { deepClone } from '@/utils/object.js';
import validate from '@/utils/validate.js';
import { trim } from '@/utils/filter.js';
import useStore from '@/stores';
import { loginApi } from '@/api/login.js';

const Store = useStore();
const loginFormRef = ref();
const isOkLogin = ref(false);
const form = reactive({
	tenantId: '000000',
	username: '',
	password: ''
});
const formRules = {
	username: {
		rules: [
			{
				required: true,
				errorMessage: '请输入账号'
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '请输入密码'
			}
		]
	}
};
//监听form变化
watch(
	() => form,
	(val) => {
		hanldeJudge(val);
	},
	{
		deep: true
	}
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
	form.password = trim(form.password, 'all');
	form.username = trim(form.username, 'all');
	let valid = await loginFormRef.value.validate();
	if (!valid) return;

	let info = deepClone(form);
	info.password = md5(info.password);
	const res = await loginApi({
		tenantId: info.tenantId,
		username: info.username,
		password: info.password
	});
	Store.set('loginForm', form);
	Store.set('userInfo', res);
	uni.showLoading({
		title: '登录成功',
		mask: true
	});
	setTimeout(() => {
		uni.hideLoading();
		uni.reLaunch({
			url: '/pages/home/index'
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
}
</style>
