<template>
	<view class="application-center">
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" @confirm="handleSearch" v-model="searchValue"></uni-search-bar>
			<slot name="filter"></slot>
		</view>
		<scroll-view scroll-y class="scroll-main" @scrolltolower="touchBottom">
			<view class="scroll-list" v-if="list.length > 0">
				<template v-for="(item, i) in list" :key="i">
					<slot name="item" :filed="item"></slot>
				</template>
			</view>

			<view v-else class="list-empty">暂无列表内容</view>
			<uni-load-more  :status="loadStatus"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, reactive, defineEmits } from 'vue';

const emits = defineEmits(['register']);

const listPage = reactive({
	api: null,
	searchName: 'keyword'
});

function setProps(props) {
	Object.assign(listPage, props);
}

const searchValue = ref('');
const list = ref([]);
const loadStatus = ref('more');
const query = reactive({
	size: 10,
	current: 1
});

async function getHttp(params = query) {
	if (!listPage.api) return;
	if (loadStatus.value == 'more') {
		loadStatus.value = 'loading';
		const res = await listPage.api(params);
		const newList = res.records;
		list.value = list.value.concat(newList);
		if (newList.length == 10) {
			loadStatus.value = 'more';
		} else {
			loadStatus.value = 'no-more';
		}
	}
}

function handleSearch() {
	reload({ [listPage.searchName]: searchValue.value });
}

//触底刷新
function touchBottom() {
	if (loadStatus.value == 'more') {
		query.current++;
		getHttp();
	}
}
//重置列表
function reload(params = {}) {
	loadStatus.value = 'more';
	list.value = [];
	Object.assign(query, { current: 1, ...params });
	getHttp(query);
}

emits('register', { reload, setProps, getHttp });
</script>

<style lang="scss" scoped>
.application-center {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	.search-box {
		width: 100%;
		background-color: #fff;
		z-index: 9;
	}
}
.scroll-main {
	width: 100%;
	flex: 1 1 auto;
	overflow: hidden;
	.scroll-list {
	}
	.list-empty {
		width: 100%;
		height: 200rpx;
	}
}
</style>
