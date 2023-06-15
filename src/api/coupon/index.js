import api from '@/http'
let {http} = api
import qs from "qs"

export const reqCouponPage = ({pno=1,psize=10,name,couponTypeId})=> http({
    url:'/goods/goodsDiscount/all',
    method:"POST",
   data:qs.stringify({
    Pno:pno,Psize:psize
   })
})
export const reqDeleteData = (id)=>{
    console.log(id);
   return http({
    url:`goods/goodsDiscount/del/id`,
    method:'POST',
    data:qs.stringify({
        id
    })
})
}
export const reqFindData = (id)=>http({
    url:`/goods/goodsDiscount/find/id`,
    method:'POST',
    data:qs.stringify({
        id
    })
})
export const reqUpdateData = (data)=>http({
    url:`/goods/goodsDiscount/updata`,
    method:'POST',
    data:qs.stringify({
        ...data
    })
})
export const reqInsertData = (data)=>http({
    url:`/goods/goodsDiscount/insert`,
    method:'POST',
    data:qs.stringify({
        ...data
    })
})

export const reqInsertMultiple =(data)=>http({
    url:`/coupon/insert/multiple`,
    method:'put',
    data
})