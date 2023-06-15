import http1 from '@/http'
let {http} = http1
//获取所有新闻类型
export const getList = ()=>http({url:'news-type/list/all',method:'GET'})
//分页
export const getNewsPage = (pno,psize,name,remark)=>http({url:'/news-type/list/page',method:'GET',params:{
pno,psize,name,remark                      
}})
//添加
export const addNewsData = (data)=>http({url:'/news-type/insert',method:'PUT',data:data})
//删除
export const removeData = (id)=>http({url:`/news-type/delete/id/${id}`,method:'DELETE'})
//修改查询
export const getUpdateNews = (id)=>http({url:`/news-type/find/id/${id}`,method:'GET'})
//修改新闻类型
export const updateNews = (data)=>http({url:'/news-type/update',method:"PUT",data})