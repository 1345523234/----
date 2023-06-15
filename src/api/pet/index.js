import api from '@/http'
let {http} = api
import qs from "qs"

export const reqPet = (data)=>http({
    url:'/pet/all',
    method:"POST",
    data:qs.stringify({
        ...data
    })
}) 

export const reqPetInfo  = (id) =>http({
    url:'/pet/petInfo/all',
    method:"POST",
    data:qs.stringify({
        ID:id
    })
})
//编辑宠物信息
export const reqEditPet  = (data) =>http({
    url:'/pet/pet/update',
    method:"POST",
    data:qs.stringify({
        ...data
    })
})
//获取宠所有信息
export const reqPetFindId  = (id) =>http({
    url:'/pet/find/id',
    method:"POST",
    data:qs.stringify({
        id:id
    })
})
//删除宠物信息

export const reqPetDel  = (id) =>http({
    url:'/pet/pet/del',
    method:"POST",
    data:qs.stringify({
        ID:id
    })
})
