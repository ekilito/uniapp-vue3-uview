<template>
	<view >
		<view class="image-block">
			<u-image width="100px" height="100px"></u-image>
		</view>
		<u-cell-group class="block">
			<u-cell title="基本信息" value="立式磨"></u-cell>
			<u-cell title="版本号" value="V1.1.2"></u-cell>
			<u-cell title="版本所有" value="立式磨"></u-cell>
		</u-cell-group>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
	.image-block{
		display: flex;
		justify-content: center;
		height: 180px;
		align-items: center;
	}
	.block {
		background: $uni-white !important;
		padding: $uni-spacing-sm;
		margin: $uni-spacing-sm;
	}
</style>