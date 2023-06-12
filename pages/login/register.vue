<template>
	<view class="account-form">
		<uni-forms ref="loginFormRef" :rules="formRules" validateTrigger="blur" :model="form">
			<uni-forms-item label="用户名:" name="name">
				<uni-easyinput type="text" v-model="form.name" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item label="手机号:" name="phone">
				<uni-easyinput type="text" v-model="form.phone" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item label="密码:" name="password">
				<uni-easyinput type="password" v-model="form.password" placeholder="请输入6位以上密码" />
			</uni-forms-item>
		</uni-forms>
		<button class="login-btn" size="default" :disabled="isOkLogin" @click="handleSubmit">注册</button>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, watch, defineEmits } from 'vue';
import validate from '@/utils/validate.js';
import { trim } from '@/utils/filter.js';
import useStore from '@/stores';
import { loginApi } from '@/api/login.js';

const emit = defineEmits(['change-login']);
const Store = useStore();
const loginFormRef = ref();
const isOkLogin = ref(true);
const form = reactive({
	tenantId: '000000',
	phone: '',
	password: '',
	name: ''
});
const formRules = {
	name: {
		rules: [
			{
				required: true,
				errorMessage: '请输入用户名'
			}
		]
	},
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
	if (val.name && validate.mobile(val.phone) && validate.rangeLength(val.password, [6, 50])) {
		isOkLogin.value = false;
	} else {
		isOkLogin.value = true;
	}
};
//登陆提交
const handleSubmit = async () => {
	let valid = await loginFormRef.value.validate();
	if (!valid) return;
	const res = await loginApi({
		tenantId: info.tenantId,
		username: info.phone,
		password: info.password,
		name: info.name
	});
	uni.showLoading({
		title: '注册成功，请登陆账号',
		mask: true
	});
	setTimeout(() => {
		uni.hideLoading();
		emit('change-login');
	}, 1500);
};
</script>

<style scoped lang="scss">
.account-form {
	margin-top: 50rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.login-btn {
	width: 100%;
	height: 70rpx;
	line-height: 70rpx;
	margin-top: 40rpx;
}
</style>
