import {reqList,update} from '@/api/check-scope'

const actions ={
    async getList({commit}){
       let res = await reqList()
       let{data:{code,data}} = res
       if(code == 200){
           commit('GETLIST',data)
       }
    },
    async update({commit},value){
       let res = await update(value)
       let{data:{code,msg}} = res
        return {code,msg}
    }
}
const mutations = {
    GETLIST(state,data){
        state.list = data
    }
}
const state ={
    list:[]
}
export default{
    'namespaced':true,
    actions,
    mutations,
    state
}