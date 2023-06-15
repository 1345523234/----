import {reqMasterAll,reqMasterDetail,reqMasterUpdate,reqMasterDel} from "@/api/master/index.js"
const state ={
    masterAll:[],
    page:{},
    masterInfo:{},
    orderInfo:[]
}

const actions = {
    async getMasterAll({commit},reqData){
       let {data:{code},data} =  await reqMasterAll(reqData)
        commit("GETMASTERALL",data)
    },
    //获取详细信息
    async getMasterDetail({commit},id){
    
        let {data:{code},data} = await reqMasterDetail(id)
        if(code == 200)
        commit("GETMASTERDETAIL",data)
    },
    //修改信息
    async getMasterUpdate({commit},reqData){
        console.log(reqData);
        let {data:{code},data} = await reqMasterUpdate(reqData)
        if(code == 200)
        return true
    },
    //删除主人信息
    async getMasterDel({commit},id){
        console.log(id);
        let {data:{code},data} = await reqMasterDel(id)
        if(code == 200)
        return true
    },
}
const mutations = {
    async GETMASTERALL(state,data){
        state.masterAll = data.data
        state.page = JSON.parse(data.page)
    },
    GETMASTERDETAIL(state,data){
        state.masterInfo = data.data
        state.orderInfo = data.order
    }
}
export default {
    'namespaced':true,
    actions,
    mutations,
    state
}