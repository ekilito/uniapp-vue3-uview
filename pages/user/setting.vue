<template>
		<uni-card>
			<uni-forms class="from" ref="formRef" :label-width="72" :rules="formRules" validateTrigger="blur" :model="form">
				<uni-forms-item label="手机号码:" name="phone">
					<uni-easyinput type="text" v-model="form.phone" :disabled="true" placeholder="请输入手机号码" />
				</uni-forms-item>
				<uni-forms-item label="用户名:" name="realName">
					<uni-easyinput type="text" v-model="form.realName" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="邮箱:" name="email">
					<uni-easyinput type="text" v-model="form.email" placeholder="请输入邮箱" />
				</uni-forms-item>
			</uni-forms>
		</uni-card>
		<button size="default" @click="handleSubmit">保存</button>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive, watch } from 'vue';
import validate from '@/utils/validate.js';
import useStore from '@/stores';
import { loginApi } from '@/api/login.js';

const Store = useStore();
const formRef = ref();
const isOkLogin = ref(true);
const form = reactive({ ...Store.userInfo });
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
	realName: {
		rules: [
			{
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

<style scoped lang="scss">
</style>
