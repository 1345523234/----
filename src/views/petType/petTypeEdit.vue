<template>
   <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="商品名称" prop="name">
    <el-input v-model="form.PetName"></el-input>
  </el-form-item>
    <el-form-item label="商品说明">
        <el-input v-model="form.Remark"></el-input>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="add">立即修改</el-button>
    <el-button @click="$router.back()">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import qs from "qs"
export default {
     data(){
        return {
            form:{
                PetName:'',
                PetName:'',

            },
            rules:{
                PetName:[
                    {required:true,message:'请输入商品名称',trigger:'blur'}
                ]
                
            }
        }
    },
    methods:{
      add(){
           try{
            this.$refs.form.validate(async valid=>{
                if(!valid) return false
                  let {data} =  await this.$http({
               url:'/petType/update',
               method:'POST',
               data:qs.stringify({
                ...this.form
               })
           })
           if(data.code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:'修改成功',
                   onClose:()=>{
                       this.$router.push("/petType")
                   }
               })
           }
            })
          
           
           }catch(e){

           }
       
        },
       async getData(){
         let {data} = await this.$http({
           url:`/petType/find/id`,
           method:'POST',
           data:qs.stringify({
            id:this.$route.query.id
           })
         })
        if(data.code == 200){
          this.form = {...data.data,...this.from}
        }
       }
    },
    async created(){
      await this.getData()
    }
}
</script>

<style>

</style>