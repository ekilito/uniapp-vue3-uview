import echarts from "@/utils/echarts";

import {
  unref,
  nextTick
} from "vue";

export function useECharts(elRef) {
  let chartInstance = null;

  function initCharts() {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts.init(el);
  }

  function getInstance() {
    if (!chartInstance) {
      initCharts();
    }
    return chartInstance;
  }

  function setOptions(options, clear = true) {
    nextTick(() => {
      setTimeout(() => {
        if (!chartInstance) {
          initCharts();

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();
        chartInstance?.setOption(options);
      }, 30);
    });
  }

  return {
    setOptions,
    getInstance,
  };
}