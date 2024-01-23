const online = {
	version: '正式版本',
	baseUrl: 'https://xxx/api', //接口地址
	action: 'https://xxx/business/file/upload',//文件上传地址
	img_path: 'https://xxx/minio/',//静态文件前缀
	applicationLogo: 'xxx',//当前app在移动端管理平台的唯一索引
	download_path: 'https://3h1-wms.oss-cn-hangzhou.aliyuncs.com/apk/xxx/app-release.apk',//更新下载地址
};

const dev = {
	version: '测试版本',
	baseUrl: 'http://xxx',
	action: 'http://xxx/blade-resource/oss/endpoint/put-file-attach',
	img_path: 'http://xxx/',
	applicationLogo: 'xxxx',
	download_path: 'https://3h1-wms.oss-cn-hangzhou.aliyuncs.com/apk/xxxxx/app-release.apk',
};

const proxy = {
	version: '接口代理',
	baseUrl: '/xxx',
};

//根据要打的app包注释不同的ip
// export default online;
export default dev;
