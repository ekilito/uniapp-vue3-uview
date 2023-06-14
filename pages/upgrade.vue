<!-- 此页面只作用于app，小程序不支持此页面 -->
<template>
	<uni-popup ref="upDialogRef" type="dialog" :is-mask-click="false">
		<uni-popup-dialog type="warn" cancelText="取消" confirmText="升级" :title="info.title" @confirm="handleConfirm" @close="handleCancel" :before-close="true">
			<view class="update-content">
				<view v-if="!info.downloding" class="up-tips">版本: {{ info.currentVersion }} -> {{ info.version }}</view>
				<view v-else class="up-tips">
					<progress style="width:500rpx" activeColor="#55aa00" :percent="downInfo.percent" stroke-width="10" :active="true" />
					<view>已下载：{{ downInfo.totalBytesWritten + 'M / ' + downInfo.totalBytesExpectedToWrite + 'M' }}</view>
				</view>
			</view>
		</uni-popup-dialog>
	</uni-popup>
</template>

<script setup>
import { onReady } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';
import useStore from '@/stores';
import appConfig from '/config/index.js';

const Store = useStore();
const info = reactive({
	currentVersion: plus.runtime.version,
	version: '',
	title: '发现新版本',
	downloding: false
});
const upDialogRef = ref();

onReady(() => {
	info.version = Store.version;
	upDialogRef.value.open();
});
const downInfo = reactive({
	percent: 0,
	totalBytesWritten: 0,
	totalBytesExpectedToWrite: 0
});

let downloadTask;
//取消更新就强制推出
const handleCancel = () => {
	//有下载先终止下载任务
	if (downloadTask) {
		downloadTask.abort();
	}
	if (uni.getSystemInfoSync().platform == 'ios') {
		//ios关闭程序
		plus.ios.import('UIApplication').sharedApplication().performSelector('exit');
	} else if (uni.getSystemInfoSync().platform == 'android') {
		plus.runtime.quit();
	}
};
//确认更新
const handleConfirm = () => {
	info.downloding = true;
	info.title = '更新中,请不要关闭应用...';
	//整包安装
	downloadTask = uni.downloadFile({
		//执行下载
		url: appConfig.download_path, //下载地址
		success: (downloadResult) => {
			//下载成功
			if (downloadResult.statusCode == 200) {
				plus.runtime.install(
					//安装
					downloadResult.tempFilePath,
					{
						force: true
					},
					function (res) {
						plus.runtime.restart(); //重启
					}
				);
			}
		}
	});

	//下载进度
	downloadTask.onProgressUpdate((res) => {
			downInfo.percent = res.progress;
		downInfo.totalBytesWritten = (res.totalBytesWritten / 1024 / 1024).toFixed(2);
		downInfo.totalBytesExpectedToWrite = (res.totalBytesExpectedToWrite / 1024 / 1024).toFixed(2);
	});
};
</script>

<style scoped lang="scss">
.update-content {
	font-size: 26rpx;
	line-height: 1.7;
	// padding: 30rpx;

	.up-tips {
		width: 100%;
		text-align: center;
	}
}
</style>
