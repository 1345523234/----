import api from '@/http'
let {http} = api
export const reqPage = ({pno=1,psize=10,name,newsTypeId})=> http({
    
    url:'/news/list/page',
    method:"GET",
    params:{
        pno,psize,name,newsTypeId
    }
})
//删除
export const reqDeleteData = (id)=>http({
    url:`/news/delete/id/${id}`,
    method:'DELETE'
})
//查询
export const reqFindData = (id)=>http({
    url:`/news/find/id/${id}`,
    method:'GET'
})
//修改  
export const reqUpdateData = (data)=>http({
    url:`/news/update`,
    method:'put',
    data
})
//新增
export const reqInsertData = (data)=>http({
    url:`/news/insert`,
    method:'put',
    data
})
