<template>
  <div>
    <el-page-header @back="$router.back()" content="新增订单信息">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" 
    >
         
      <el-form-item label="公司名称" prop="companyName" size="mini">
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="companyAddress" size="mini">
        <el-input v-model.number="form.companyAddress" ></el-input>
      </el-form-item>
      
      <el-form-item label="统一社会信用代码" prop="unifiedSocialCreditCode" size="mini">
        <el-input v-model="form.unifiedSocialCreditCode"></el-input>
      </el-form-item>
      <el-form-item label="法人" size="mini">
        <el-input v-model.number="form.juridicalPerson" ></el-input>
        </el-form-item>

       <el-form-item label="联系人" size="mini">
    <el-input   v-model="form.companyContact"></el-input>
  </el-form-item>
  <el-form-item label="联系人职务" size="mini">
    <el-input v-model.number="form.admissions"></el-input>
  </el-form-item>
  <el-form-item label="联系人电话 " size="mini">
    <el-input v-model="form.contactPhone "></el-input>
  </el-form-item>

       <el-form-item label="邮箱地址 " size="mini">
    <el-input  v-model="form.email" ></el-input>
  </el-form-item>
       <el-form-item label="开户商 " size="mini">
    <el-input    v-model="form.openAccount" ></el-input>
  </el-form-item>
       <el-form-item label="银行账号" size="mini">
    <el-input    v-model="form.bank" ></el-input>
  </el-form-item>
       <el-form-item label="银行联号 " size="mini">
    <el-input    v-model="form.bankAffiliated" ></el-input>
  </el-form-item>
       <el-form-item label="备注 " size="mini">
    <el-input    v-model="form.remark" ></el-input>
  </el-form-item>
  <el-form-item>
    
    <el-button type="primary" @click="submit">立即创建</el-button>
    <el-button type="primary" @click="reset">重置</el-button>
  </el-form-item> 
</el-form>

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import qs from 'qs'
export default {
    name:'company',
  props: ["id"],
  data() {
    let token = sessionStorage.token;
    return {
        goodsTypeval:"",
        value:"",
        goodsval:'',
        form: {
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
  },
  methods: {
    ...mapActions("company", [ "getInsertCompany" ]),
      //提交数据
      async submit(){
         try{
            this.$refs.form.validate(async valid=>{
                if(!valid) return false
                 this.getInsertCompany(this.form)
           if(data.code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:'添加成功',
                
               })
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
    ...mapState("goods", [ "goodsTypeList"]),
    typeIdOrName() {
      let arr = {};
      for (let i = 0; i < this.goodsTypeList.length; i++) {
        arr[this.goodsTypeList[i].Name] = this.goodsTypeList[i].ID;
      }
      return arr;
    },
    petTypeOrPetName(){
        let obj = {}
        for(let i= 0;i<this.petInfo.length;i++){
            obj[this.petInfo[i].PetName] =this.petInfo[i].ID
        }
        return obj
    },
    goodsIdOrName(){
        let obj = {}
        for(let i= 0;i<this.goodsList.length;i++){
            obj[this.goodsList[i].Name] =this.goodsList[i].ID
        }
        return obj
    },
    roleOrRoleId(){
      let obj = {}
        for(let i= 0;i<this.roleType.length;i++){
            obj[this.roleType[i].Name] =this.roleType[i].ID
        }
        return obj
    },
    doctorOrId(){
       let obj = {}
        for(let i= 0;i<this.doctor.length;i++){
            obj[this.doctor[i].Nickname] =this.doctor[i].ID
        }
        return obj
    }
  },
};
</script>

<style></style>
