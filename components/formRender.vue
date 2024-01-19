<template>
	<view class="form-render" v-if="filterWidgetList.length > 0">
		<uni-forms ref="formRef" :modelValue="formData" :label-width="maxWidth">
			<uni-forms-item :label="item.label + ':'" :name="item.field" :required="item.required" :rules="getRule(item)" v-for="(item, index) in filterWidgetList" :key="index">
				<template v-if="'slot' in item">
					<slot name="projectId-device" :column="item" :filed="formData"></slot>
					<slot name="projectId-repairs" :column="item" :filed="formData"></slot>
				</template>
				<uni-easyinput
					v-else-if="['Input', 'InputTextArea'].includes(item.component)"
					v-model="formData[item.field]"
					:type="item.component == 'InputTextArea' ? 'textarea' : 'text'"
					:placeholder="item.placeholder || '请输入' + item.label"
					:disabled="item.dynamicDisabled"
				/>
				<uni-number-box
					v-else-if="item.component == 'InputNumber'"
					:min="item?.componentProps?.min"
					:max="item?.componentProps?.max"
					v-model="formData[item.field]"
					:disabled="item.dynamicDisabled"
				/>
				<uni-data-checkbox
					v-else-if="['Checkbox', 'Radio'].includes(item.component)"
					v-model="formData[item.field]"
					:multiple="item.component == 'checkbox'"
					:disabled="item.dynamicDisabled"
					:map="{ text: 'label', value: 'value' }"
					:localdata="item.optionItems"
				/>
				<UploadPicker
					v-else-if="['picture-upload', 'file-upload'].includes(item.component)"
					:type="item.component"
					v-model:value="formData[item.field]"
					:field="item"
				></UploadPicker>
				<uni-datetime-picker
					v-else-if="['date-range', 'DatePicker'].includes(item.component)"
					v-model="formData[item.field]"
					:type="item.component == 'date-range' ? 'datetimerange' : 'datetime'"
					:disabled="item.dynamicDisabled"
				/>
				<zxz-uni-data-select
					v-else-if="['Select', 'ApiSelect'].includes(item.component)"
					:placeholder="item.placeholder || '请选择' + item.label"
					v-model="formData[item.field]"
					:disabled="item.dynamicDisabled"
					:localdata="item.componentProps.options"
					:multiple="item.componentProps.multiple"
					:clear="item.clearable"
				></zxz-uni-data-select>
				<uni-data-picker
					v-else-if="['ApiTree','Tree'].includes(item.component)"
					:placeholder="item.placeholder || '请选择' + item.label"
					:localdata="item.componentProps.options"
					:map="item.componentProps.fieldNames"
					v-model="formData[item.field]"
					@change="(e) => TreeChange(e, item.field)"
				></uni-data-picker>

				<uni-rate v-else-if="item.component == 'Rate'" v-model="formData[item.field]" :disabled="item.dynamicDisabled" />
				<switch v-else-if="item.component == 'Switch'" :checked="formData[item.field]" :disabled="item.dynamicDisabled" style="transform: scale(0.7)" />
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script setup>
import { ref, defineProps, watch, defineExpose } from 'vue';
import UploadPicker from '@/components/upload-picker.vue';

const formData = ref({});
const formRef = ref();

const filterWidgetList = ref([]);

const props = defineProps({
	formSchema: {
		type: Array
	},
	maxWidth: {
		type: Number,
		default: 80
	}
});

function getRule(item) {
	if (item.rules) {
		return item.rules;
	} else if (item.required) {
		return [
			{
				required: true,
				errorMessage: `${item.label}不能为空`
			}
		];
	} else {
		return [];
	}
}

//处理组件默认不获取全部节点
function TreeChange(e, prop) {
	const arr = e.detail.value.map((e) => {
		return e.value;
	});
	formData.value[prop] = arr;
}

watch(
	() => props.formSchema,
	async (val) => {
		const allPromise = [];
		const newFormSchema = val.map((item) => {
			if ('component' in item) {
				if (item.component == 'ApiSelect') {
					const itemPromise = new Promise(async (resolve) => {
						item.componentProps.options = (await item.componentProps.api(item.componentProps.params)).map((e) => {
							return {
								text: e[item.componentProps?.fieldNames?.label || 'label'],
								value: e[item.componentProps?.fieldNames?.value || 'value']
							};
						});
						resolve(item);
					});
					allPromise.push(itemPromise);
				} else if (item.component == 'ApiTree') {
					const itemPromise = new Promise(async (resolve) => {
						item.componentProps.options = await item.componentProps.api(item.componentProps.params);
						resolve(item);
					});
					allPromise.push(itemPromise);
				}
			}
			return item;
		});
		await Promise.all(allPromise);
		filterWidgetList.value = newFormSchema;
	},
	{
		immediate: true
	}
);

const validateForm = async () => {
	return formRef.value.validate();
};
defineExpose({
	formRef,
	formData,
	validateForm
});
</script>

<style lang="scss" scoped>
.form-render {
	padding: 10rpx;
	box-sizing: border-box;
	background: #fff;
	.uni-forms-item {
		.uni-forms-item__content {
			display: flex;
			align-items: center;
		}
	}
}
</style>
