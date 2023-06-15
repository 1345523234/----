<template>
<div>
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="bm">
    <el-input v-model="form.bm"></el-input>
  </el-form-item>
 <el-form-item label="备注">
    <el-input v-model="form.remark"></el-input>
  </el-form-item>
  <el-form-item label="日期">
      <el-date-picker
      v-model="form.insertTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" @click="addData">添加</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    data(){

        return{
            form:{
                name:'',
                bm:'',
                remark:'',
                insertTime:''
            },
            rules:{
                name:[
                    {required:true,message:'卡片名不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        addData(){
            try{
            this.$refs.form.validate(async vaild=>{
                if(!vaild) return
                let {data} = await this.$http({
                    url:'/card-type/update',
                    method:'PUT',
                    data:this.form
                })
               if(data.code == 200){
                   this.$message.success(data.msg)
                   this.$router.push({
                       path:'card-type'
                   })
               }else{
                   this.$message.error(data.msg)
               }
               
            })
            }catch(e){

            }
           
        },
        async getData(){
           let {data}  = await this.$http({
                url:`/card-type/find/id/${this.$route.query.id}`
            })
            if(data.code == 200){
                this.form = {...this.form,...data.data}
                this.form.insertTime = dayjs(this.form.insertTime).format('YYYY-MM-DD hh:mm:ss')
            }
        }
    },
    mounted(){
        this.getData()
    }
}
</script>

<style>

</style>