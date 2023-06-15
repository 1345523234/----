import api from '@/http'
let {http} = api
import qs from "qs"

export const reqInsertCompany = (data)=> http({
    url:'/cpmpany/insert',
    method:"POST",
    data:qs.stringify({
        ...data
    })
})

export const reqCompanyAll = (data)=>http({
    url:"/cpmpany/all",
    method:"POST",
    data:qs.stringify({
        ...data
    })
})

export const reqCompanyUpdate = (data)=>http({
    url:"/cpmpay/update/id",
    method:"POST",
    data:qs.stringify({
        ...data
    })
})
export const reqCompanyFindId = (id)=>http({
    url:"/cpmpay/find/id",
    method:"POST",
    data:qs.stringify({
        id:id
    })
})
export const reqCompanyDelId = (id)=>http({
    url:"/cpmpay/del/id",
    method:"POST",
    data:qs.stringify({
        id:id
    })
})