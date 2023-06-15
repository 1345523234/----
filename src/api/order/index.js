import api from '@/http'
let {http} = api
import qs from "qs"
export const reqPage = ({pno=1,psize=10,phone,status})=> http({
    
    url:'/order/all',
    method:"POST",
    data:qs.stringify({
        Pno:pno
        ,Psize:psize,phone,status
    })
})
export const reqOrderCencal = (id)=> http({
    url:'/order/cencal/id',
    method:"POST",
    data:qs.stringify({
        id
    })
})
//完成订单
export const reqCompleteOrder = (id)=> http({
    url:'/order/Complete/id',
    method:"POST",
    data:qs.stringify({
        id
    })
})
//删除
export const reqDeleteData = (id)=>http({
    url:`/order/del/id`,
    method:'POST',
    data:qs.stringify({
        ID:id
    })
})
//查询
export const reqFindData = (id)=>http({
    url:`/order/find/id/${id}`,
    method:'GET'
})
//添加物流编号  
export const reqUpdateData = ({id,postCode})=>http({
    url:`/order/send`,
    method:'GET',
    params:{
        id,postCode
    }
})
//新增
export const reqInsertData = (data)=>http({
    url:`/order/insert`,
    method:'put',
    data
})
//确认收货
export const reqrecive= (id,postCode)=>http({
    url:`/order/recive`,
    method:'GET',
    params:{
        id,postCode
    }
})