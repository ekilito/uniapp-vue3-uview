<template>
  <uni-file-picker
    v-model="fileList"
    :limit="props?.field?.componentProps?.limit || 1"
    :file-mediatype="props.type === 'picture-upload' ? 'image' : 'all'"
    @select="afterSelect"
    @delete="deleteItem"
  ></uni-file-picker>
</template>

<script setup>
import useStore from "@/stores/index.js";
import { ref, defineProps, watch } from "vue";
const props = defineProps(["field", "value", "type"]);
const emit = defineEmits(["update:value"]);
const fileList = ref([]);
fileList.value =
  props.value?.split().map((res) => {
    return { url: res };
  }) || [];
const Store = useStore();

watch(
  fileList,
  (value) => {
    emit("update:value", value.length ? value.map((res) => res.url).join(",") : "");
  },
  {
    deep: true,
  },
);

// 删除
const deleteItem = (event) => {
  fileList.value.splice(event.index, 1);
};

// 新增
const afterSelect = async (event) => {
  let lists = [].concat(event.tempFiles);
  const result = await uploadFilePromise(lists?.[0].url);
  fileList.value.push({ url: result });
  // lists.map((item) => {
  //   fileList.value.push({
  //     ...item,
  //     status: "uploading",
  //     message: "上传中",
  //   });
  // });
  // for (let i = 0; i < lists.length; i++) {
  //   const result = await uploadFilePromise(lists[i].url);
  //   let item = fileList.value[fileListLen];
  //   fileList.value.splice(
  //     fileListLen,
  //     1,
  //     Object.assign(item, {
  //       status: "success",
  //       message: "",
  //       url: result,
  //     }),
  //   );
  //   fileListLen++;
  // }
};

const uploadFilePromise = (url) => {
  return new Promise((resolve) => {
    uni.uploadFile({
      url: props.field.componentProps.uploadURL,
      filePath: url,
      name: "file",
      header: {
        ["Blade-Auth"]: Store.userInfo.access_token || "",
      },
      formData: {},
      success: (res) => {
        const data = JSON.parse(res?.data);
        resolve(data?.data?.link || "");
      },
    });
  });
};
</script>

