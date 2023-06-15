import api from "../../http";
let {http} = api
import qs from 'qs'

export const reqMasterAll = (data) => http({
    method:"POST",
    url:"/master/all",
    data:qs.stringify({
        ...data
    })
})

export const reqMasterDetail = (id)=>http({
    method:"POST",
    url:'/master/detail/all',
    data:qs.stringify({
        ID:id
    })
})

export const reqMasterUpdate = (data)=>http({
    method:"POST",
    url:'/master/update/id',
    data:qs.stringify({
        ...data
    })
})
export const reqMasterDel = (id)=>http({
    method:"POST",
    url:'/master/del/id',
    data:qs.stringify({
        ID:id
    })
})