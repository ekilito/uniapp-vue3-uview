<template>
	<view class="account-form">
		<uni-forms ref="loginFormRef" :rules="formRules" validateTrigger="blur" :model="form">
			<uni-forms-item label="账号:" name="phone">
				<uni-easyinput type="text" v-model="form.phone" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item label="密码:" name="password">
				<uni-easyinput type="password" v-model="form.password" placeholder="请输入6位以上密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="login-btn" size="default" :disabled="isOkLogin" @click="handleSubmit">登录</button>
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
const isOkLogin = ref(true);
const form = reactive({
	tenantId: '000000',
	phone: '',
	password: ''
});
const formRules = {
	phone: {
		rules: [
			{
				required: true,
				errorMessage: '请输入手机号'
			},
			{
				validateFunction: (rule, value) => {
					return validate.mobile(value);
				},
				errorMessage: '手机号码格式不正确'
			}
		]
	},
	password: {
		rules: [
			{
				required: true,
				errorMessage: '请输入密码'
			},
			{
				minLength: 6,
				errorMessage: '密码长度不少于6位数'
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
const hanldeJudge = (val) => {
	if (validate.mobile(val.phone) && validate.rangeLength(val.password, [6, 50])) {
		isOkLogin.value = false;
	} else {
		isOkLogin.value = true;
	}
};
//登陆提交
const handleSubmit = async () => {
	form.password = trim(form.password, 'all');
	form.phone = trim(form.phone, 'all');
	let valid = await loginFormRef.value.validate();
	if (!valid) return;
	let info = deepClone(form);
	info.password = md5(info.password);
	// const res = await loginApi({
	// 	tenantId: info.tenantId,
	// 	username: info.phone,
	// 	password: info.password
	// });
	Store.set('loginForm', form);
	// Store.set('userInfo', res);
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
};
onLoad(() => {
	//判断是否有历史登录信息
	if ('tenantId' in Store.loginForm) {
		Object.assign(form, Store.loginForm);
		hanldeJudge(form);
	}
});
</script>

<style scoped lang="scss">
.account-form {
	margin-top: 100rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.login-btn {
	width: 100%;
}
</style>
