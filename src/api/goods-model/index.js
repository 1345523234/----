import api from '@/http'
let {http} = api
import qs from 'qs'

export const reqPageList = (Pno,Psize,Name,IsOnSale,GoodsTypeId)=>http({
    url:'/goods/list/page',
    method:'POST',
    data:qs.stringify({
        Pno,Psize,Name,IsOnSale,GoodsTypeId
    })
})
export const reqGoodsAboutGoodsType = (goodTypeID)=>http({
    url:'/goods/goods-type/find',
    method:'POST',
    data:qs.stringify({
        goodTypeID
    })
})
export const reqOnSale = (id,isOnSale)=>http({
    url:'/goods/set/onsale',
    method:'POST',
    data:qs.stringify({
        ID:id,
        IsOnSale:isOnSale
    })
})
export const reqIdShop = (id) => http({
    url:`/goods/find/id`,
    method:'POST',
    data:qs.stringify({
        id
    })

})
export const reqGoodsType = ({Pno,Psize})=>http({
    url:'/goods-type/list/page',
    method:"POST",
    data:qs.stringify({
        Pno,Psize
    })
})
//修改商品
export const reqUpdate=(data)=>http({
    url:'/goods/list/update',
    method:'POST',
    data:qs.stringify({
        ...data
    })
})
//添加商品
export const reqGoodsInsert= ( data ) =>http({
    url:'/goods/list/insert',
    method:'POST',
    data:qs.stringify({
        ...data
    })
})
//删除商品
export const reqGoodsDel = (id)=>http({
    url:"/goods/list/del",
    method:'POST',
    data:qs.stringify({
        ID:id
    })
})