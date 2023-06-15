<template>
   <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="新闻名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="新闻说明">
        <el-input v-model="form.remark"></el-input>
    </el-form-item>
  <el-form-item label="新闻时间">
      <el-date-picker
      v-model="form.insertTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="add">立即添加</el-button>
    <el-button @click="$router.back()">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
export default {
     data(){
        return {
            form:{
                name:'',
                remark:'',
                insertTime:''
            },
            rules:{
                name:[
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
                let {code,msg} = await this.submitUpdata(this.form)
           if(code == 200){
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
       
        },
        ...mapActions('userType',['getUpdateData','submitUpdata']),
  
    },
      async mounted(){
       await this.getUpdateData(this.$route.query.id)
      let {updateList}  =this.$store.state.userType
      this.form = updateList
    },
    
}
</script>

<style>

</style>