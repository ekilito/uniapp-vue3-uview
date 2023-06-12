let online = {
	baseUrl: 'https://wx.3h1china.com/wms-api',
	action: 'https://wx.3h1china.com/wms-api/business/file/upload',
	img_path: 'https://wx.3h1china.com/wms-minio/',
	applicationLogo: '212052e317304c218a68087a50b8fcd3',
	download_path: 'https://3h1-wms.oss-cn-hangzhou.aliyuncs.com/apk/212052e317304c218a68087a50b8fcd3/app-release.apk',
	version: '正式版本'
};

let dev = {
	baseUrl: 'http://192.168.1.240:38800/api',
	action: 'http://29w072407s.wicp.vip:8091/blade-wms/business/file/upload',
	img_path: 'http://29w072407s.wicp.vip:9100/wms/',
	applicationLogo: 'be5594c53b4343b7898ad7c306693e74',
	download_path: 'https://3h1-wms.oss-cn-hangzhou.aliyuncs.com/apk/be5594c53b4343b7898ad7c306693e74/app-release.apk',
	version: '测试版本'
};

let config = process.env.NODE_ENV === 'development' ? dev : online;
export default config;
