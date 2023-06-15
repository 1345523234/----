import api from '@/http'
import qs from "qs"
let {http} = api

export const reqList = ()=>http({
    url:'/loaction/All',
    method:'POST'
})

export const update = (data)=>http({
    url:'/loaction/update',
    method:'POST',
    data:qs.stringify({
       ...data
    })
})