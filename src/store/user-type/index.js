import {getList ,addNewsData,getNewsPage,removeData,getUpdateNews,updateNews} from '@/api/user-type'
const actions ={
    async getList({commit},value){
        let {data} = await getList()
        if(data.code == 200){
            commit('GETLIST',data.data.list)
        }
    },
    async addData({commit},value){
        let {data} = await addNewsData(value)
        return data
    },
    async getPageData({commit},{pno,psize,name,remark}){
        let {data:{code,data}} = await getNewsPage(pno,psize,name,remark)
        if(code == 200){
            commit('GETPAGEDATA',data)
        }
    },
    async delData({commit},id){
        console.log(id);
       let {data} =  await removeData(id)
       return data
    },
    async getUpdateData({commit},id){
        let {data:{code,data}}  = await getUpdateNews(id)
        if(code == 200){
            commit('GETUPDATEDATA',data)
        }
    },
    async submitUpdata({commit},value){
        let {data} = await updateNews(value)
        return data
    }
}
const mutations={
    GETLIST(state,data){
       state.list = data
    },
    GETPAGEDATA(state,data){
        state.list = data.list
        state.pageInfo = data.page
    },
    GETUPDATEDATA(state,data){
        state.updateList = data
    }
}
const state ={
    //新闻总数据
    list:[],
    pageList:[],
    pageInfo:[],
    updateList:[]
}
const getters={
    pageListData(state){
        return state.pageList
    },
    
}
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
