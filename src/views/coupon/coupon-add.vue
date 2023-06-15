<template>
  <div>
    <el-page-header
      @back="$router.back()"
      content="编辑折扣商品信息"
    ></el-page-header>
    <el-form ref="form" :model="formData" label-width="260px" :rules="rules">
      <el-form-item label="折扣药品名称:" size="mini" prop="Name">
        <el-input v-model="formData.Name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="折扣商品价格:" size="mini" prop="Price">
       <span style="color:red">{{((this.formData.ZheKou - 0)/10* 1 *(this.formData.Price - 0 )*1).toFixed(1) }}</span>
      </el-form-item>
      <el-form-item label="商品实际价格:" size="mini" prop="Price">
        <el-input v-model="formData.Price" size="mini" @input="hh"></el-input>
      </el-form-item>
       <el-form-item label="商品折扣信息:" size="mini" prop="ZheKou">
        <el-input v-model="formData.ZheKou" size="mini" @input="ss"></el-input>
      </el-form-item>
      <el-form-item label="到期时间:" size="mini">
          <!-- dayjs(formData.target).format('YYYY-MM-DD hh:mm:ss') -->
          <el-date-picker
      v-model="formData.InsertTime "
      type="date"
      placeholder="选择日期"
      
      >
    </el-date-picker>
      </el-form-item>
      
      <el-form-item label="优惠券备注" size="mini" prop="remark">
        <el-input v-model="formData.remark" size="mini"
        type="textarea"
        :rows="2"
        ></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" size="small" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dayjs from 'dayjs'
export default {
  name:"couponAdd",
  props: ["id"],
  data() {
    return {
      formData: {
        Name:"",
       ZheKou:0,
       Price:0,
       InsertTime: dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss'),
       remark:"",
        // ZPrice:(this.editData.ZheKou - 0)* 1 *(this.editData.Price - 0 )*1 
      },
      rules:{
                Name:[
                    {required:true,message:"折扣商品名字不能为空",trigger:'blur'}
                ],
                Price:[
                    {required:true,message:'请输入价格',trigger:'blur'},
                    { type: 'number', message: '价格必须为数字值'}
                ],
                ZheKou:[
                  { type: 'number', message: '折扣信息必须为数字值'}
                ]
            }
      
      
    };
  },
  //页面加载时获取到数据
  async mounted() {
    
    // this.formData.InsertTime = 
    // this.formData.InsertTime = dayjs(new Date()).format('YYYY-MM-DD hh:mm:ss')
    // console.log(dayjs("1670816827000").format('YYYY-MM-DD HH:mm:ss'))
  },
  methods: {
  ...mapActions("coupon",['getInsertData']),
    dayjs,
    hh(val){
      console.log(typeof Number(val));
      if(typeof Number(val) === "number" ){
      this.formData.Price = Number(val)
      }
      
    },
    ss(val){
      if(typeof Number(val) === "number" ){
      this.formData.ZheKou = Number(val)
      }
      },
    //提交数据
    submit(){

        this.$refs.form.validate(async valide=>{
            if(!valide) return false
           let {code,msg}  = await this.getInsertData(this.formData)
             if(code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:msg,
                   onClose:()=>{
                       this.$router.back()
                   }
               })
           }
        })
   
        
    }
    
  },
  computed: {
    ...mapState("coupon", ["editData"]),
  },
};
</script>

<style></style>

