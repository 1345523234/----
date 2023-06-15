import api from '../http'
import qs from 'qs'

export const getAllRoleList = ({Psize,Pno,Username}={Psize:10,Pno:1,Username:""}) => {
	return api.http({
		url:'/role/list/all',
		method:'POST',
		data:qs.stringify({
			Pno,Psize,Username
		})
	})
}
//暂时废弃了
export const findRoleListForPage = (params) => {
	return api.http({
		url:`/role/list/page`,
		method:'get',
		params
	})
}

export const deleteRoleById = (id) => {
	return api.http({
		url:`/role/delete`,
		method:'POST',
		data:qs.stringify({
			id
		})
	})
}

export const insertRole = ({name}) => {
	console.log(name);
	return  api.http({
		url:`/role/insert`,
		method:'POST',
		data:qs.stringify({
			Name:name
		})
	})
}

export const updateRole = ({Name,ID}) => {
	return  api.http({
		url:`/role/update`,
		method:'POST',
		data:qs.stringify({
			Name,ID
		})
	})
}

export const findRoleById = (id) => {
	return  api.http({
		url:`/role/find/id`,
		method:'POST',
		data:qs.stringify({
			id
		})
	})
}