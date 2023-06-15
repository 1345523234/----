import {reqGoodsMemderPage} from '@/api/goodsMender'
const actions ={
    async getGoodsMemderPage({commit},data){
       let {data:{code,data:{list}}} =  await reqGoodsMemderPage(data)
       if(code == 200){
           commit('GOODMEMDERPAGE',list)
       }
    }
}
const mutations ={
    GOODMEMDERPAGE(state,data){
        state.list = data
    }
}
const state = {
    list:[]
}
export default{
    'namespaced':true,
    actions,
    mutations,
    state
}