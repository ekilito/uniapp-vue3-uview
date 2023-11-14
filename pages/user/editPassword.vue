<template>
	<view class="block">
		<u-form labelPosition="left" :model="form" :rules="formRules" ref="formRef" labelWidth="70"
			:labelStyle="{'fontSize':'14px'}">
			<u-form-item label="旧密码" prop="oldPassword" ref="item1">
				<u-input type="password" v-model="form.oldPassword" placeholder="请输入旧密码"></u-input>
			</u-form-item>
			<u-form-item label="新密码" prop="newPassword" ref="item1">
				<u-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></u-input>
			</u-form-item>
			<u-form-item label="确认密码" prop="newPassword1" ref="item1">
				<u-input type="password" v-model="form.newPassword1" placeholder="请输入确认密码"></u-input>
			</u-form-item>
		</u-form>
		<view class="submit">
			<u-button size="default" type="primary" @click="handleSubmit">提交</u-button>
		</view>
	</view>
	<u-text text="密码长度为6～20个字符，而且同时包含字母和数字" type="info" size="13" class="tips"></u-text>
</template>
<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ref,
		reactive,
		watch
	} from 'vue';
	import useStore from '@/stores';
	import {
		updatePasswordApi
	} from '@/api/user.js';
	import md5 from '@/utils/md5.js';

	const Store = useStore();
	const formRef = ref();
	const form = reactive({
		oldPassword: '',
		newPassword: '',
		newPassword1: ''
	});
	const formRules = {
		oldPassword: {
			rules: [{
				required: true,
				errorMessage: '请输入旧密码'
			}]
		},
		newPassword: {
			rules: [{
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
			rules: [{
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

<style scoped lang="scss">
	.block {
		background: $uni-white !important;
		margin: $uni-spacing-sm;
		padding: $uni-spacing-sm;
	}
	
	.submit {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.tips{
		padding-left:10px;
	}
</style>