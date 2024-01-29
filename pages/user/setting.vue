<template>
	<view class="block">
		<uni-forms labelPosition="left" :model="form" :rules="formRules" ref="formRef" :label-width="70" :labelStyle="{ fontSize: '14px' }">
			<uni-forms-item label="昵称" prop="userInfo.name" required>
				<u-input v-model="form.name" placeholder="请输入昵称"></u-input>
			</uni-forms-item>
			<uni-forms-item label="手机号" prop="userInfo.phone" required>
				<u-input v-model="form.phone" placeholder="请输入手机号"></u-input>
			</uni-forms-item>
			<uni-forms-item label="性别" prop="userInfo.sex">
				<uni-data-select v-model="form.sex" :localdata="sexKv" @change="change" placeholder="请选择性别"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item label="所属公司" prop="userInfo.deptName">
				<u-input v-model="form.deptName" disabled></u-input>
			</uni-forms-item>
		</uni-forms>
	</view>
	<u-button size="default" type="primary" @click="handleSubmit">保存</u-button>
</template>
<script setup>
import { ref, reactive, watch } from 'vue';
import validate from '@/utils/validate.js';
import useStore from '@/stores';
import { detailApi, updateInfoApi } from '@/api/user.js';

const Store = useStore();
const formRef = ref();
const form = reactive({});
const info = ref({});

const sexKv = ref([
	{
		text: '男',
		value: 1
	},
	{
		text: '女',
		value: 2
	},
	{
		text: '未知',
		value: -1
	}
]);

async function init() {
	info.value = await detailApi();
	Object.assign(form, info.value);
}

init();

const formRules = reactive({
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
	name: {
		rules: [
			{
				required: true,
				errorMessage: '请输入用户名'
			}
		]
	}
});

//提交
const handleSubmit = async () => {
	let valid = await formRef.value.validate();
	if (!valid) return;
	await updateInfoApi(form);
	uni.showToast({
		title: `修改成功`
	});
	uni.navigateBack();
};
</script>
<style></style>
<style lang="scss" scoped>
page::deep .uni-select__input-placeholder {
	color: rgb(192, 196, 204);
	font-size: 15px;
}
.block {
	background: $uni-white !important;
	margin: $uni-spacing-sm;
	padding: $uni-spacing-sm;
}
</style>
