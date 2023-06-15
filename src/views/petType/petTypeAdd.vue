<template>
  <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px"
      style="margin-top:10px"
      >
  <el-form-item label="宠物类型名称" prop="name">
    <el-input v-model="form.petName"></el-input>
  </el-form-item>
    <el-form-item label="宠物类型说明">
        <el-input v-model="form.remark"></el-input>
    </el-form-item>
  <!-- <el-form-item label="活动时间">
      <el-date-picker
      v-model="form.insertTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item> -->
  <el-form-item>
    <el-button type="primary" @click="add">立即添加</el-button>
    <el-button @click="$router.back()">取消</el-button>
  </el-form-item>
</el-form>

  </div>
</template>

<script>
import qs from 'qs'
import dayjs from 'dayjs'
export default {
    name:'petTypeAdd',
    data(){
        let now =dayjs().format('YYYY-MM-DD hh:mm:ss')
        return {
            form:{
                petName:'',
                remark:'',
                // insertTime:now
            },
            rules:{
                petName:[
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
               url:'/petType/insert',
               method:'POST',
               data:qs.stringify({
                ...this.form
               })
           })
           if(data.code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:'添加成功',
                   onClose:()=>{
                       this.$router.back()
                   }
               })
           }
            })
          
           
           }catch(e){

           }
       
        }
    }
}
</script>

<style>

</style>