import {reqPet,reqPetInfo,reqEditPet,reqPetFindId,reqPetDel}  from '@/api/pet'
const state = {
    petData:[],
    page:{},
    petInfo:{},
    order:{},
    petInfoData:{}
}
const mutations = {
    GETPET(state,data){
        state.petData = data.data
        state.page = JSON.parse(data.page)
    },
    GETPETINFO(state,data){
        state.petInfo = data.data
        state.order = data.order
    },
    GETPETFINDID(state,data){
        state.petInfoData = {...data.data,...data.petInfo}
    }
}
const actions = {
    async getPet({commit},reqData){
        let {data,data:{code}} =  await reqPet(reqData) 
        if(code==200){
            commit("GETPET",data)
        } 
      },
      async getPetInfo({commit},id){
        let {data,data:{code}} =  await reqPetInfo(id) 
        if(code==200){
            commit("GETPETINFO",data)
        } 
      },
      async getEditPet({commit},formData){
        let {data,data:{code}} =  await reqEditPet(formData) 
        if(code==200){
            return true
        } 
      },
      async getPetFindId({commit},id){
        let {data,data:{code}} =  await reqPetFindId(id) 
        if(code==200){
            commit("GETPETFINDID",data)
        } 
      },
     //删除宠物信息
     async getPetDel({commit},id){
        console.log(id);
        let {data,data:{code}} =  await reqPetDel(id) 
        if(code==200){
            return true
        } 
     }
}
export default {
    'namespaced':true,
    actions,
    mutations,
    state
}