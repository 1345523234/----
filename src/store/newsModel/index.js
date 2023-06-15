import {reqPage,reqDeleteData,reqFindData,reqUpdateData,reqInsertData,} from '@/api/newsModel'

const actions={
    //获取每页数据和查询功能
    async getCouponPage({commit},value){
       let res =  await reqPage(value)
       let{data:{code,data}} = res   
       if(code == 200){
        commit('GETCOUPONPAGE',data)
       }
    },
    //根据id删除该数据
    async getDelData({commit},id){
       let res =  await reqDeleteData(id)
     
    },
    //根据id查询对应的数据
    async getFindData({commit},id){
        let {data:{data,code}} = await reqFindData(id)
        if(code == 200){
            commit('GETFINDDATA',data)
        }
    },
    //修改后添加
    async getUpdateData({commit},value){
       let {data:{msg,code}} = await reqUpdateData(value)
       return {msg,code}
    },
    //新增数据
    async getInsertData({commit},value){
      let {data:{msg,code}} = await reqInsertData(value)
      return {msg,code}
    },
}
const mutations={
    GETCOUPONPAGE(state,data){
        state.list = data.list
        state.page = data.page

    },
    GETFINDDATA(state,data){
        state.editData = data
    }
}
const state={
    //分页信息
    page:{},
    //主页面信息
    list:[],
    //编辑页面的数据
    editData:{}
}
export default {
    'namespaced':true,
    actions,
    mutations,
    state
}