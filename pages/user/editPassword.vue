<template>
	<uni-card>
		<uni-forms class="from" ref="formRef" :label-width="72" :rules="formRules" validateTrigger="blur" :model="form">
			<uni-forms-item label="旧密码:" name="oldPassword">
				<uni-easyinput type="password" v-model="form.oldPassword" placeholder="请输入旧密码" />
			</uni-forms-item>
			<uni-forms-item label="新密码:" name="newPassword">
				<uni-easyinput type="password" v-model="form.newPassword" placeholder="请输入6位以上新密码" />
			</uni-forms-item>
			<uni-forms-item label="确认密码:" name="newPassword1">
				<uni-easyinput type="password" v-model="form.newPassword1" placeholder="请输入确认密码" />
			</uni-forms-item>
		</uni-forms>
	</uni-card>
	<button size="default" @click="handleSubmit">保存</button>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, watch } from 'vue';
import useStore from '@/stores';
import { updatePasswordApi } from '@/api/user.js';
import md5 from '@/utils/md5.js';

const Store = useStore();
const formRef = ref();
const form = reactive({ oldPassword: '', newPassword: '', newPassword1: '' });
const formRules = {
	oldPassword: {
		rules: [
			{
				required: true,
				errorMessage: '请输入旧密码'
			}
		]
	},
	newPassword: {
		rules: [
			{
				required: true,
				errorMessage: '请输入密码'
			},
			{
				minLength: 6,
				errorMessage: '新密码长度至少6个字符'
			}
		]
	},
	newPassword1: {
		rules: [
			{
				required: true,
				errorMessage: '请输入确认密码'
			},
			{
				validateFunction: (rule, value) => {
					return form.newPassword === value;
				},
				errorMessage: '两次输入的密码不相等'
			}
		]
	}
};

//提交
const handleSubmit = async () => {
	let valid = await formRef.value.validate();
	if (!valid) return;
	await updatePasswordApi({
		oldPassword: md5(form.oldPassword),
		newPassword: md5(form.newPassword),
		newPassword1: md5(form.newPassword1)
	});
	Store.set('loginForm', {});
	uni.showLoading({
		title: '密码修改成功,请重新登录',
		mask: true
	});
	uni.reLaunch({
		url: '/pages/login/index'
	});
};
</script>

<style scoped lang="scss"></style>
