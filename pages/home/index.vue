<template>
  <view class="main">
    <view style="width: 680rpx; height: 460rpx"><l-echart ref="chartRef"></l-echart></view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { getInsuranceTypeOptions } from "./data";
import * as echarts from "echarts";

const chartRef = ref(null);

const data = ref([
  {
    feeAmount: 4076.52,
    feeYoy: 0.0946,
    staticYear: 2024,
    feeProportion: 0.1754,
    feeTypemsg: "药品",
    id: 11,
    hcsPrePayAmount: 1758.43,
    feeType: "1",
    revision: 1,
  },
  {
    feeAmount: 4664.57,
    feeYoy: 0.2737,
    staticYear: 2024,
    feeProportion: 0.2007,
    feeTypemsg: "检验",
    id: 12,
    hcsPrePayAmount: 2407.89,
    feeType: "2",
    revision: 1,
  },
  {
    feeAmount: 2717.7,
    feeYoy: 0.3811,
    staticYear: 2024,
    feeProportion: 0.117,
    feeTypemsg: "检查",
    id: 13,
    hcsPrePayAmount: 1385.24,
    feeType: "3",
    revision: 1,
  },
  {
    feeAmount: 9842.34,
    feeYoy: 0.2504,
    staticYear: 2024,
    feeProportion: 0.4236,
    feeTypemsg: "医疗服务",
    id: 14,
    hcsPrePayAmount: 4843.92,
    feeType: "4",
    revision: 1,
  },
  {
    feeAmount: 1936.57,
    feeYoy: -0.1816,
    staticYear: 2024,
    feeProportion: 0.0833,
    feeTypemsg: "材料",
    id: 15,
    hcsPrePayAmount: 900.5,
    feeType: "5",
    revision: 1,
  },
]);

onMounted(() => {
  // 组件能被调用必须是组件的节点已经被渲染到页面上
  setTimeout(async () => {
    if (!chartRef.value) return;
    const myChart = await chartRef.value.init(echarts);
    const optionsData = data.value.map((item) => ({
      name: item.feeTypemsg,
      value: item.feeAmount,
    }));
    const options = getInsuranceTypeOptions(optionsData);
    myChart.setOption(options);
  }, 300);
});
</script>

<style lang="scss" scoped></style>

