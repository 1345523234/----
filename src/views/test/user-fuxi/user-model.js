import {getUserList,addUser,findUserById,updateUser,removeUserById } from '@/api/user-api'
import {getAllRoleList} from '@/api/role-api'
export default {
  namespaced:true,
  //存储数据的，用来在vue视图文件中使用mapState关联到computed中
  state:{
    list:[],
    page:{
      pno:1,
      psize:10,
      pCount:1,
      totalElements:1
    },
    roleList:[]
  },
  // 用来对state中的属性设置值的
  mutations:{
    setList(state,list){
      state.list = list
    },
    setPage(state,page){
      state.page = page
    },
    setRoleList(state,roleList){
      state.roleList = roleList
    }
  },
  // 用来调用接口处理业务的函数
  actions:{
    async getListForPage({commit},queryForm){
      //调用查询接口
      let res = await getUserList(queryForm)
      //判断返回结果
      if(res.data.code == 200){
        //成功就将返回数据中的list和page放到我们state中
        commit('setList',res.data.data.list)
        commit('setPage',res.data.data.page)
      }
    },
    //查询当前系统的所有角色
    async getRoleList({commit}){
      let res = await getAllRoleList()
      if(res.data.code == 200){
        commit('setRoleList',res.data.data.list)
      }
    },
    //新增用户数据
    async insert({commit},addForm){
      await addUser(addForm)
    },
    //修改数据
    async update({commit},addForm){
      await updateUser(addForm)
    },
    //删除数据
    async removeById({commit},id){
      await removeUserById(id)
    },
    async findById({commit},id){
      // 调用接口
      let res = await findUserById(id)
      //将成功和失败的返回值分别返回去
      console.log(res.data)
      if(res.data.code == 200){
        return res.data.data
      }else{
        return {}
      }
    }
  }
}