import {reqWarehouseInfoDel,reqWarehouseInfoUpdate,
    reqWarehouseInfoFindId,reqWarehouseInsert,reqWarehouseInfoAll} from "@/api/WarehouseInfo/index.js"
    const actions={
        async getWarehouseInsert({commit},reqData){
            let res =  await reqWarehouseInsert(reqData) 
            return true
        },
        async getWarehouseInfoAll({commit},reqData){
            let {data} =  await reqWarehouseInfoAll(reqData)
            commit("GETWAREHOUSEINFOALL",data)
        },
        async getWarehouseInfoUpdate({commit},reqData){
            let {data} =  await reqWarehouseInfoUpdate(reqData)
            return true
          
        },
        async getWarehouseInfoFindId({commit},reqData){
            let {data} =  await reqWarehouseInfoFindId(reqData)
            
           return data.data
        },
        async getWarehouseInfoDel({commit},reqData){``
            let {data} =  await reqWarehouseInfoDel(reqData)
        },
       
    }
    const mutations ={
        GETWAREHOUSEINFOALL(state,data){
            state.warehouseAll = data.data
            if(data.page)
            state.page = JSON.parse(data.page)
        },
        GETWAREHOUSEFINDID(state,data){
            state.warehouseFind = data.data
        
        }
    }
    const state = {
        page:{},
        warehouseAll:[],
        warehouseAFind:{}
    }
    
    export default {
        namespaced:true,
        actions,
        mutations,
        state
    }
