import Http from './uniHttp.js';
import config from '@/config/index.js';
import useStore from '@/stores/index.js';
import { createPinia } from 'pinia';
const pinia = createPinia();
const Store = useStore(pinia);

//请求配置项
Http.setConfig({
	baseUrl: config.baseUrl,
	method: 'POST',
	dataType: 'json', // 设置为json，返回后会对数据进行一次JSON.parse()
	showLoading: true, // 是否显示请求中的loading
	loadingText: '请求中...', // 请求loading中的文字提示
	loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
	originalData: true, // 是否在拦截器中返回服务端的原始数据
	loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	// 配置请求头信息
	header: {
		'content-type': 'application/json;charset=UTF-8',
		Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
		'Blade-Auth': ''
	}
});

//请求前
Http.interceptor.request = (config) => {
	config.header['Blade-Auth'] = Store.userInfo.access_token || '';
	return config;
};
//响应后
Http.interceptor.response = (res) => {
	// 如果把originalData设置为了true，这里得到将会是服务器返回的所有的原始数据
	// 判断可能变成了res.statueCode，或者res.data.code之类的，请打印查看结果
	if (res.statusCode == 200) {
		const data = res.data.data;
		return res.data.code == 200 ? data : res.data;
	} else if (res.statusCode == 401) {
		Store.set('userInfo', {});
		uni.showToast({
			title: '用户信息已失效，请重新登录',
			mask: true,
			icon:'error'
		});
		uni.reLaunch({
			url: '/pages/login/index'
		});
		throw res.data
	} else {
		uni.showToast({
			title: '当前网络不稳定，请稍后再试!',
			mask: true,
			icon:'none',
			duration:2000
		});
		throw res.data
	}
};

export default Http;
