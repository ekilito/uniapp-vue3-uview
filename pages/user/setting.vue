<template>
	<view class="block">
		<u-form labelPosition="left" :model="form" :rules="formRules" ref="form1" labelWidth="70"
			:labelStyle="{'fontSize':'14px'}">
			<u-form-item label="昵称" prop="userInfo.sex" ref="item1">
				<u-input v-model="form.sex" placeholder="请输入昵称"></u-input>
			</u-form-item>
			<u-form-item label="手机号" prop="userInfo.sex" ref="item1">
				<u-input v-model="form.sex" placeholder="请输入手机号"></u-input>
			</u-form-item>
			<u-form-item label="性别" prop="userInfo.sex" ref="item1">
				<uni-data-select v-model="form.sex" :localdata="range" @change="change" placeholder="请选择性别"></uni-data-select>
			</u-form-item>
			<u-form-item label="所属厂家" prop="userInfo.sex" ref="item1">
				<u-input v-model="form.factory" disabled></u-input>
			</u-form-item>
		</u-form>
		<view class="submit">
			<u-button size="default" type="primary" @click="handleSubmit">保存</u-button>
		</view>
	</view>

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
	import validate from '@/utils/validate.js';
	import useStore from '@/stores';
	import {
		loginApi
	} from '@/api/login.js';

	const Store = useStore();
	const formRef = ref();
	const isOkLogin = ref(true);
	const form = reactive({
		...Store.userInfo,
		factory: '立式磨'
	});
	const formRules = {
		phone: {
			rules: [{
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
		realName: {
			rules: [{
					required: true,
					errorMessage: '请输入用户名'
				},
				{
					minLength: 2,
					maxLength: 6,
					errorMessage: '用户名长度2-6个字符'
				}
			]
		}
	};

	//登陆提交
	const handleSubmit = async () => {
		let valid = await formRef.value.validate();
		if (!valid) return;
		uni.showLoading({
			title: '修改成功',
			mask: true
		});
	};
</script>
<style>
	
</style>
<style lang="scss" scoped>
	page::deep .uni-select__input-placeholder{
		color:rgb(192, 196, 204);
		font-size: 15px;
	}
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
</style>