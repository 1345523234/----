import {reqInsertCompany,reqCompanyAll,reqCompanyUpdate,reqCompanyFindId,reqCompanyDelId} from "@/api/company"

const actions={
    async getInsertCompany({commit},reqData){
        let res =  await reqInsertCompany(reqData) 
    },
    async getCompanyAll({commit},reqData){
        let {data} =  await reqCompanyAll(reqData)
        commit("GETCOMPANYALL",data)
    },
    async getCompanyUpdate({commit},reqData){
        let {data} =  await reqCompanyUpdate(reqData)
        return true
      
    },
    async getCompanyFindId({commit},reqData){
        let {data} =  await reqCompanyFindId(reqData)
       
        commit("GETCOMPANYFINDID",data)
    },
    async getCompanyDelId({commit},reqData){``
        let {data} =  await reqCompanyDelId(reqData)
       
        commit("GETCOMPANYFINDID",data)
    },
   
}
const mutations ={
    GETCOMPANYALL(state,data){
        state.companyall = data.data
        if(data.page != "")
        state.page = JSON.parse(data.page)
    },
    GETCOMPANYFINDID(state,data){
        state.companyFind = data.data
    }
}
const state = {
    page:{},
    companyall:[],
    companyFind:{}
}

export default {
    namespaced:true,
    actions,
    mutations,
    state
}