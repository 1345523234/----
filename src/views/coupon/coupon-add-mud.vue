<template>
  <div>
    <el-page-header
      @back="$router.back()"
      content="新增优惠券信息"
    ></el-page-header>
    <el-form ref="form" :model="formData" label-width="260px" :rules="rules">
        <el-form-item label="数量" size="mini" prop="count">
        <el-input v-model="formData.count" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="优惠券名称" size="mini" prop="name">
        <el-input v-model="formData.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="优惠券价格(满减券为减免金额)" size="mini" prop="Price">
        <el-input v-model="formData.price" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="优惠券实际价值(满减券为门槛价格)" size="mini" prop="totalPrice">
        <el-input v-model="formData.totalPrice" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="到期时间" size="mini">
          <!-- dayjs(formData.target).format('YYYY-MM-DD hh:mm:ss') -->
          <el-date-picker
      v-model="formData.targetTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
      </el-form-item>
      <el-form-item label="优惠券类型" size="mini" prop="couponTypeId">
       <el-select v-model="formData.couponTypeId" placeholder="">
           <el-option value="1" label="满减券"></el-option>
           <el-option value="0" label="现金券">
           </el-option>
       </el-select>
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
      let now = dayjs(new Date()).format('YYYY-MM-DD')
    return {
      formData: {
        count:'',
        name: "",
        price: '',
        targetTime: "",
        totalPrice: '',
        couponTypeId: "1",
        status: '',
        insertTime: now,
        remark: '',
      },
      rules:{
                name:[
                    {required:true,message:'请输入优惠券名称',trigger:'blur'}
                ],
                price:[
                    {required:true,message:'请输入优惠券价格',trigger:'blur'}
                ],
               totalPrice:[
                    {required:true,message:'请输入优惠券价格',trigger:'blur'}
                ],
               count:[
                    {required:true,message:'请输入优惠券数量',trigger:'blur'}
                ],
            }
    };
  },
  async mounted() {
    
  
  },
  methods: {
    ...mapActions("coupon", ["getInsertMultiple"]),
    dayjs,
     submit(){
        this.$refs.form.validate(async valide=>{
            if(!valide) return false
           let {code,msg}  = await this.getInsertMultiple(this.formData)
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
    
  },
};
</script>

<style></style>
