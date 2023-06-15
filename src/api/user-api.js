import api from '../http'
import qs from 'qs'
// 初步定义login函数，通过api中的http功能将登录实现
export const login = (username,password) => {
	return api.http({
		url:'/login',
		method:'post',
		data:qs.stringify({
			username,
			password
			}),
		// Headers{
		// 	"Content-Type": "Multipart/Related; boundary=MIME_boundary; type=text/xml"
		// },
		
	})
}
// 获取用户列表接口参数为接口的参数
export const getUserList = (queryForm) => {
	let{Username,Pno,Psize} = queryForm

	return api.http({
		url:'/user/list',
		// params:queryForm,
		method:'POST',
		data:qs.stringify({
			Username,Pno,Psize
		})
	})
}

export const removeUserById = (ID) => {
	return api.http({
		url:`/user/del`,
		method:'POST',
		data:qs.stringify({
			ID
		})
	})
}

export const addUser = (user) => {
	let {nickname,username,roleId,password} = user
	return api.http({
		url:`/user/insert`,
		method:'POST',
		data:qs.stringify({
			username,
			nickname,
			roleId,
			password
			}),
	})
}

export const findUserById = (id) => {
	return api.http({
		url:`/user/find/id`,
		data:qs.stringify({
			id
		}),
		method:'POST',
	})
}

export const updateUser = (user) => {
	let {DeptId,ID,Nickname,Password,RoleId,Username} = user
	return api.http({
		url:`/user/update`,
		method:'POST',
		data:qs.stringify({
			ID,DeptId,Nickname,Password,RoleId,Username
		}),
	})
}