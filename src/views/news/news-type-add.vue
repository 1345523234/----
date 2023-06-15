<template>
  <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="新闻名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="新闻备注">
        <el-input v-model="form.remark"></el-input>
    </el-form-item>
  <el-form-item label="活动时间">
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
export default {
    data(){
        let now =dayjs().format('YYYY-MM-DD hh:mm:ss')
        return {
            form:{
                name:'',
                remark:'',
                insertTime:now
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
           this.$refs.form.validate(async valide=>{
               if(!valide) return
               let {code,msg} = await this.$store.dispatch('news/addData',this.form)
                if(code == 200){
                    this.$message.success(msg)
                    this.$router.back()
                }else{
                    this.$message.error(msg)
                }
            })
           
        }
        }
}
</script>

<style>

</style>