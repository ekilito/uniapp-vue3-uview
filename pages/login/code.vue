<!-- <template>
	<view class="code-form">
		<uni-forms ref="loginFormRef" label-position="top"  :label-width="80" :rules="formRules" validateTrigger="blur" :model="form">
			<uni-forms-item label="手机号码:" name="phone" >
				<uni-easyinput type="text" v-model="form.phone" placeholder="请输入手机号码" />
			</uni-forms-item>
			<uni-forms-item  label="验证码:" name="code">
<view style="display: flex;">
	<uni-easyinput type="code" v-model="form.code" placeholder="请输入验证码" />
	<button class="code-btn" size="mini" :disabled="isCountDown" @click="handleGetCode">{{ isCountDown ? countDown + 's' : '验证码' }}</button>
</view>
			
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

const Store = useStore();
const loginFormRef = ref();
const isCountDown = ref(false);
const countDown = ref(0);
const isOkLogin = ref(true);
const form = reactive({
	tenantId: '000000',
	phone: '',
	code: ''
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
	code: {
		rules: [
			{
				required: true,
				errorMessage: '请输入验证码'
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
	if (validate.mobile(val.phone) && val.code) {
		isOkLogin.value = false;
	} else {
		isOkLogin.value = true;
	}
};
//登陆提交
const handleSubmit = async () => {
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

//获取验证码
const handleGetCode = async () => {
	const flag = await loginFormRef.value.validateField('phone')
	if(!form.phone)return
	countDown.value = 60;
	isCountDown.value = true;
	const timer = setInterval(() => {
		if (countDown.value <= 0) {
			isCountDown.value = false;
			clearInterval(timer);
		} else {
			countDown.value--;
		}
	}, 1000);
};
</script>

<style scoped lang="scss">
.code-form {
	margin-top: 100rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.code-btn {
	width: 160rpx;
	color: $uni-white;
	background-color: $uni-success;
	font-size: 20rpx;
	line-height: 70rpx;
}

.login-btn {
	width: 100%;
	margin-top: 40rpx;
}
</style> -->

<template>123</template>
