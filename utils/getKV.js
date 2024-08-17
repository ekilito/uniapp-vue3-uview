const filterKV = (list, data) => {
  if (list && list.length) {
    return list.map((item) => {
      const newItem = {
        text: item[data.text || "label"],
        value: item[data.value || "value"],
      };
      if (data.otherFields && data.otherFields.length) {
        data.otherFields.forEach((ele) => {
          newItem[ele] = item[ele];
        });
      }
      if (item.children && item.children.length) {
        newItem.children = filterKV(item.children, data);
      }
      return newItem;
    });
  } else {
    return [];
  }
};
const kvList = async (data) => {
  const result = await data.api(data.params);
  return filterKV(result, data);
};
export const getKvs = async (apiList) => {
  const kvs = [];
  apiList.forEach((item) => {
    kvs.push(kvList(item));
  });
  return await Promise.all(kvs);
};
