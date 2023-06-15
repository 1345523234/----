<template>
  <div>
    <el-page-header
      @back="$router.back()"
      content="编辑折扣商品信息"
    ></el-page-header>
    <el-form ref="form" :model="editData" label-width="260px" :rules="rules">
      <el-form-item label="折扣药品名称:" size="mini" prop="Name">
        <el-input v-model="formData.Name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="折扣商品价格:" size="mini" prop="Price">
       <span style="color:red">{{((this.editData.ZheKou - 0)/10* 1 *(this.editData.Price - 0 )*1).toFixed(1) }}</span>
      </el-form-item>
      <el-form-item label="商品实际价格:" size="mini" prop="Price">
        <el-input v-model="formData.Price" size="mini"></el-input>
      </el-form-item>
       <el-form-item label="商品折扣信息:" size="mini" prop="ZheKou">
        <el-input v-model="formData.ZheKou" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="到期时间:" size="mini">
          <!-- dayjs(formData.target).format('YYYY-MM-DD hh:mm:ss') -->
          <el-date-picker
      v-model="formData.InsertTime "
      type="date"
      placeholder="选择日期"
      @change="timeData"
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
  props: ["id"],
  data() {
    return {
      formData: {
       
        // ZPrice:(this.editData.ZheKou - 0)* 1 *(this.editData.Price - 0 )*1 
      },
      rules:{
                name:[
                    {required:true,message:'请输入优惠券名称',trigger:'blur'}
                ],
                price:[
                    {required:true,message:'请输入优惠券名称',trigger:'blur'}
                ],
               totalPrice:[
                    {required:true,message:'请输入优惠券名称',trigger:'blur'}
                ],
            }
    };
  },
  //页面加载时获取到数据
  async mounted() {
    console.log(this.id);
    await this.getFindData(this.id);
    console.log(this.editData);
    this.formData = this.editData
    // this.formData.InsertTime = 
    this.formData.InsertTime = dayjs((this.formData.InsertTime - 0) * 1000).format('YYYY-MM-DD hh:mm:ss')
    // console.log(dayjs("1670816827000").format('YYYY-MM-DD HH:mm:ss'))
  },
  methods: {
    ...mapActions("coupon", ["getFindData",'getUpdateData']),
    dayjs,
    timeData(time){
      console.log(time);
this.formData.InsertTime = dayjs(time * 1).format('YYYY-MM-DD hh:mm:ss')

    },
    //提交数据
    submit(){
        this.$refs.form.validate(async valide=>{
            if(!valide) return false
           let {code,msg}  = await this.getUpdateData(this.formData)
             if(code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:msg,
                   onClose:()=>{
                       this.$router.push("/coupon")
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
