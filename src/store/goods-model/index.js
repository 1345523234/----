import {reqPageList,reqOnSale,reqIdShop,reqGoodsType,reqUpdate,
    reqGoodsInsert,reqGoodsDel,reqGoodsAboutGoodsType} 
from '@/api/goods-model'
const actions ={
    //删除上商品信息
    async delGoods({commit},id){
        console.log(id);
        await reqGoodsDel(id)
    },
    //根据商品类型id获取商品信息
    async getGoodsAboutGoodstype({commit},goodsTypeId){
        let res = await reqGoodsAboutGoodsType(goodsTypeId)
        return res.data
    },
     async getPageList({commit},{Pno=1,Psize=3,Name,IsOnSale,GoodsTypeId}){
       let {data:{code},data} = await reqPageList(Pno,Psize,Name,IsOnSale,GoodsTypeId)
       if(code == 200){
        commit('GETPAGELIST',data)
       }
    },
    async getOnSale({commit},{id,isOnSale}){
        let result =  await reqOnSale(id,isOnSale)
    },
    async getIdShop({commit},id){
        console.log("id===",id);
        let {data:{data,code}} = await reqIdShop(id)
        if(code == 200){
            commit('GETIDSHOP',data)
        }
    },
    async getGoodsType({commit},query={Pno:"",Psize:""}){
        let {data} = await reqGoodsType(query)
        commit('GETGOODSTYPE',data)
    },
    async getUpDate({commit},data){
        let {data:{msg,code}} = await reqUpdate(data)
        return {msg:msg,code:code}
    },
    async getGoodsInsert({commit},data){
      let {data:{code,msg}} = await reqGoodsInsert(data)
      return{code,msg}
    }
}
const mutations ={
    GETPAGELIST(state,data){
        state.list = data.data
        state.pageInfo = JSON.parse(data.page)
    },
    GETIDSHOP(state,data){
        state.goodsEditList = data
    },
    GETGOODSTYPE(state,data){
        state.goodsTypeList = data.data
    }
}
const state ={
    list:[],
    pageInfo:{},
    goodsEditList:{},
    goodsTypeList:[]
}
export default{
    'namespaced':true,
    actions,
    mutations,
    state,

}