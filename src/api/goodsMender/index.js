import api from '@/http'
let {http} = api

export const reqGoodsMemderPage =(
    {pno=1,psize=3,username,phone,freeze,beginTime,endTime,hasCard}
)=>http({
    url:'/shop-user/list/page',
    method:'GET',
    params:{
        pno,psize,username,phone,freeze,beginTime,endTime,hasCard
    }
})