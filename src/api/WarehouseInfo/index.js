import api from '@/http'
let {http} = api
import qs from "qs"

export const reqWarehouseInfoAll = (data) => http({
    url:"/WarehouseInfo/all",
    method:"POST",
    data:qs.stringify({
        ...data
    })
})

export const reqWarehouseInsert = (data) => http({
    url:"/WarehouseInfo/insert",
    method:"POST",
    data:qs.stringify({
        ...data
    })
})
export const reqWarehouseInfoFindId = (id) => http({
    url:"/WarehouseInfo/find/id",
    method:"POST",
    data:qs.stringify({
        id:id
    })
})
export const reqWarehouseInfoUpdate = (data) => http({
    url:"/WarehouseInfo/update/id",
    method:"POST",
    data:qs.stringify({
        ...data
    })
})
export const reqWarehouseInfoDel = (id) => http({
    url:"/WarehouseInfo/del/id",
    method:"POST",
    data:qs.stringify({
        id
    })
})