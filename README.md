## uniapp 基础框架

### 注意事项

- 采用 vue3 和官网原生组件编译

- 内置浏览器内部处理过跨域问题，把/api 去掉就能直接访问接口

- 使用外部浏览器，通过切换抛出 config 文件夹内 proxy 即可

- 发布的时候注意切换回正确接口地址

## 自定义组件

### FormRender

```js
import { useFormRender, FormRender } from "@/components/FormRender/index.js";
const [register, { validateForm, getFormData, setFormData, updateColumns }] = useFormRender({
  maxWidth: "",
  columns: [],
});
```

### ListPage

```js
import { useListPage, ListPage } from "@/components/ListPage/index.js";
const [register, { reload, setProps, getHttp }] = useListPage({
  searchName: "",
  api: () => {},
});
```
