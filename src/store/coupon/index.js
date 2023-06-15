import {reqCouponPage,reqDeleteData,reqFindData,reqUpdateData,reqInsertData,
    reqInsertMultiple} from '@/api/coupon'

const actions={
    //获取每页数据和查询功能
    async getCouponPage({commit},value){
       let res =  await reqCouponPage(value)
       let{data:{code},data} = res   
       if(code == 200){
        commit('GETCOUPONPAGE',data)
       }
    },
    //根据id删除该数据
    async getDelData({commit},id){
       
       let res =  await reqDeleteData(id)
       console.log(res);
    },
    //根据id查询对应的数据
    async getFindData({commit},id){
        let {data:{code},data} = await reqFindData(id)
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
    async getInsertMultiple({commit},value){
      let {data:{msg,code}} = await reqInsertMultiple(value)
      return {msg,code}
    }
}
const mutations={
    GETCOUPONPAGE(state,data){
        state.list = data.data
        state.page = JSON.parse(data.page)

    },
    GETFINDDATA(state,data){
        console.log(data.data);
        state.editData = data.data
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
    namespaced:true,
    actions,
    mutations,
    state
}