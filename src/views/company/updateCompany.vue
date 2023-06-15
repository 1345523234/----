<template>
  <div>
    <el-page-header @back="$router.back()" content="新增订单信息">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" 
    >
         
      <el-form-item label="公司名称" prop="CompanyName" size="mini">
        <el-input v-model="form.CompanyName"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress" size="mini">
        <el-input v-model.number="form.CompanyAddress" ></el-input>
      </el-form-item>
      
      <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode" size="mini">
        <el-input v-model="form.UnifiedSocialCreditCode"></el-input>
      </el-form-item>
      <el-form-item label="法人" size="mini">
        <el-input v-model.number="form.JuridicalPerson" ></el-input>
        </el-form-item>

       <el-form-item label="联系人" size="mini">
    <el-input   v-model="form.CompanyContact"></el-input>
  </el-form-item>
  <el-form-item label="联系人职务" size="mini">
    <el-input v-model.number="form.Admissions"></el-input>
  </el-form-item>
  <el-form-item label="联系人电话 " size="mini">
    <el-input v-model="form.ContactPhone "></el-input>
  </el-form-item>

       <el-form-item label="邮箱地址 " size="mini">
    <el-input  v-model="form.Email" ></el-input>
  </el-form-item>
       <el-form-item label="开户商 " size="mini">
    <el-input    v-model="form.OpenAccount" ></el-input>
  </el-form-item>
       <el-form-item label="银行账号" size="mini">
    <el-input    v-model="form.Bank" ></el-input>
  </el-form-item>
       <el-form-item label="银行联号 " size="mini">
    <el-input    v-model="form.BankAffiliated" ></el-input>
  </el-form-item>
       <el-form-item label="备注 " size="mini">
    <el-input    v-model="form.Remark" ></el-input>
  </el-form-item>
  <el-form-item>
    
    <el-button type="primary" @click="submit">立即修改</el-button>
    <el-button type="primary" @click="$router.push('/companyAll')">取消</el-button>
  </el-form-item> 
</el-form>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import qs from 'qs'
export default {
    name:'updateCompany',
  props: ["id"],
  data() {
    let token = sessionStorage.token;
    return {
        goodsTypeval:"",
        value:"",
        goodsval:'',
        form: {
         
      },
      docval:'',
      roleval:"",
      doctor:[],
        petInfo:[],
        goodsList:[],
        roleType:[],
         rules:{
                name:[
                    {required:true,message:'请输入名字',trigger:'blur'}
                ],
                phone:[
               {required:true,message:'请输入名字',trigger:'blur'},
                {pattern:/(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/,message: '输入的手机号码格式不正确，请重新输入',trigger:'blur'}
                ],
                idCard:[
                    {required:true,message:'请输入名字',trigger:'blur'}
                ],
            }
    };
  },
  async created() {
   
    await this.getCompanyFindId(this.$route.query.id)
   this.form = this.companyFind
   console.log(this.from );
  },
  methods: {
    ...mapActions("company", [ "getCompanyUpdate","getCompanyFindId" ]),
      //提交数据
      async submit(){
         try{
            this.$refs.form.validate(async valid=>{
                if(!valid) return false
              let res =    this.getCompanyUpdate(this.form)
           if(res){
               this.$message({
                   type:'success',
                   duration:500,
                   message:'修改成功',
                
               })
               this.$router.push('/WarehouseInfo')
             this.form = {
        companyName:"", 
          companyAddress:"", 
          unifiedSocialCreditCode:""   ,
          juridicalPerson:"",
	        companyContact:"", 
          admissions:"" ,
          contactPhone:"" ,
          openAccount:"",
          bank:"",
          bankAffiliated:"",
          email:"",
          remark:""
      }
      this.goodsval = ''
      this.value = ''
      this.roleval = ''
      this.goodsTypeval = ''
      this.docval = ""
          }
            })
          
           }catch(e){

           }
      },
      //重置
      reset(){
        this.form = {
          companyName:"", 
          companyAddress:"", 
          unifiedSocialCreditCode:""   ,
          juridicalPerson:"",
	        companyContact:"", 
          admissions:"" ,
          contactPhone:"" ,
          openAccount:"",
          bank:"",
          bankAffiliated:"",
          email:"",
          remark:""
      }
      this.goodsval = ''
      this.value = ''
      this.roleval = ''
      this.goodsTypeval = ''
      this.docval = ""
      }

  },
  computed: {
  ...mapState("company",["companyFind"])
   
  },
};
</script>

<style></style>
