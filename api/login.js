import Http from './http'
//登陆
export const loginApi = (params) => 
	Http.post('/blade-auth/oauth/token', {
		grant_type: 'password',
		scope: 'all',
		type: 'account',
		...params,
	})


//获取版本
export const versionApi = (params) => 
	Http.get('http://29w072407s.wicp.vip:8099/api/common/get-version', params)
