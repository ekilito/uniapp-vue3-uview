<template>
	<ListPage @register="registerListPage" :api="listApi" searchName="equipmentName">
		<template #filter>
			<DaDropdown
				ref="DaDropdownRef"
				v-model:dropdownMenu="dropdownMenuList"
				themeColor="#007aff"
				textColor="#333333"
				:duration="300"
				:menuActiveText="false"
			></DaDropdown>
		</template>
		<template #item="{ filed }">
			<uni-card :title="filed.projectName" @click="">
				<view class="filed" v-for="(e, i) in filedColumn" :key="i">
					<text class="filed-label">{{ e.title }}</text>
					<text class="filed-value">{{ filed[e.dataIndex] }}</text>
				</view>
			</uni-card>
		</template>
	</ListPage>
	<floatBut @touch="goAddPage"></floatBut>
</template>

<script setup>
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app';
import DaDropdown from '@/components/da-dropdown/index.vue';
import { ListPage, useListPage } from '@/components/listPage/index.js';
import floatBut from '@/components/floatBut.vue';
import { listApi } from '@/api/repairs.js';
import { byCodeKvApi } from '@/api/kv.js';
import { reactive, ref } from 'vue';

const [registerListPage, { reload }] = useListPage({
	api: listApi
});

const filedColumn = reactive([
	{ title: '状态', dataIndex: 'statusMsg' },
	{ title: '项目名称', dataIndex: 'projectName' },
	{ title: '项目类型', dataIndex: 'projectType' },
	{ title: '所在地址', dataIndex: 'projectAddress' },
	{ title: '区域', dataIndex: 'projectArea' },
	{ title: '设备名称', dataIndex: 'deviceName' },
	{ title: '故障名称', dataIndex: 'malfunctionName' },
	{ title: '故障等级', dataIndex: 'malfunctionLevelMsg' },
	{ title: '故障类型', dataIndex: 'malfunctionTypeMsg' },
	{ title: '报修来源', dataIndex: 'malfunctionSourceMsg' },
	{ title: '报修人', dataIndex: 'malfunctionOwnerName' },
	{ title: '报修时间', dataIndex: 'createTime' }
]);

const dropdownMenuList = ref([
	{
		title: '状态',
		type: 'cell',
		prop: 'status',
		showIcon: true,
		showAll: true,
		options: [
			{
				label: '制单',
				value: 0
			},
			{
				label: '待处理',
				value: 1
			},
			{
				label: '待维修',
				value: 2
			},
			{
				label: '已驳回',
				value: 3
			},
			{
				label: '已完成',
				value: 4
			}
		]
	},
	{
		title: '故障等级',
		type: 'cell',
		prop: 'malfunctionLevel',
		showIcon: true,
		showAll: true,
		options: []
	}
]);

async function init() {
	dropdownMenuList.value[1].options = await byCodeKvApi({ code: 'malfunctionLevel' });
}
init();

onShow(() => {
	console.log(registerListPage)
	if(registerListPage)reload();
});
</script>

<style lang="scss" scoped>
.card-actions {
	border-top: 1px solid #eee;
	display: flex;
	.card-actions-item {
		height: 60rpx;
		width: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>