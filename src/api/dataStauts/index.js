import api from '@/http'
let {http} = api
import qs from "qs"
export const reqDataStauts = ()=>{

   return http({
    url:`/DataStauts/index`,
    method:'POST',
})
}