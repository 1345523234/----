import {getAllRoleList,deleteRoleById,insertRole,updateRole,findRoleById} from '../../../api/role-api.js'
import {getMenuList,getMenuByRoleId,insertMenuRole} from '../../../api/menu-api.js'
export default {
	namespaced:true,
	state:{
		list:[],
		page:{
			Pno:1,
			Psize:10,
			PCount:0,
			TotalElements:0
		},
		menuList:[],
		checkMenuList:[]
	},
	mutations:{
		setList(state,list){

			state.list = list;
		},
		setPage(state,page){
			state.page = page
		},
		setMenuList(state,menuList){
			state.menuList = menuList
		},
		setChekMenuList(state,checkMenuList){
			state.checkMenuList = checkMenuList
		}
	},
	actions:{
		async getListForPage({commit},params){
			console.log(1111);
			let res = await getAllRoleList(params);
		
			if(res.data.code == 200){
				commit('setList',res.data.data)
				if(res.data.page)
				commit('setPage',JSON.parse(res.data.page))
			}
		},
		async deleteById({},id){
			await deleteRoleById(id)
		},
		async insert({},role){
			await insertRole(role)
		},
		async update({},role){
			await updateRole(role)
		},
		async findById({},id){
			let res = await findRoleById(id);
			if(res.data.code == 200){
				return res.data.data
			}else{
				return {}
			}
		},
		async findAllMenu({commit}){
			let res = await getMenuList()
			if(res.data.code == 200){
				commit('setMenuList',res.data.data.list)
			}
		},
		async findMenuByRoleId({commit},roleId){
			let res = await getMenuByRoleId(roleId)
			if(res.data.code == 200){
				commit('setChekMenuList',res.data.data)
			}
		},
		async saveMenuRole({},data){
			await insertMenuRole(data)
		}
	}
}