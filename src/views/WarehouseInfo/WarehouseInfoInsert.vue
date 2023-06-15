<template>
  <div>
    <el-page-header @back="$router.back()" content="新增订单信息">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="180px" :rules="rules" 
    >
         
      <el-form-item label="仓库名称" prop="CompanyName" size="mini">
        <el-input v-model="form.WarehouseName"></el-input>
      </el-form-item>
      <el-form-item label="仓库地址" prop="WarehouseAddress:" size="mini">
        <el-input v-model="form.WarehouseAddress"></el-input>
      </el-form-item>
      <el-form-item label="库房科目" prop="WarehouseType" size="mini">
        <el-input v-model="form.WarehouseType"></el-input>
      </el-form-item>
      <el-form-item label="库房存量" prop="WarehouseTypeStock" size="mini">
        <el-input v-model="form.WarehouseTypeStock"></el-input>
      </el-form-item>
      <el-form-item label="进货商" prop="WarehouseTypeStock" size="mini">
       <el-select v-model="value" placeholder="请选择" @change="compangChange">
        <el-option
            v-for="item in companyall"
            :key="item.ID"
            :label="item.CompanyName"
            :value="item.CompanyName">
        </el-option>
       </el-select>
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
    name:'WarehouseInfoInsert',
  props: ["id"],
  data() {
    return {
        // goodsTypeval:"",
        value:"",
        goodsval:'',
        form: {
         WarehouseAddress:"",
         CompanyName:"",
         WarehouseName:"",
         WarehouseType:"",
         CompanyID:"",
         WarehouseTypeStock:""
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
   
    
    await this.getCompanyAll()
    
    this.value = this.form.CompanyName
 
  },
  methods: {
    ...mapActions("warehouseInfo", [ "getWarehouseInsert" ]),
    ...mapActions("company", ["getCompanyAll"]),
    compangChange(val){
    
        this.form.CompanyID = this.companyOrID[val]
        this.form.CompanyName = val
        console.log(this.form);
    },
      //提交数据
      async submit(){
         try{
            this.$refs.form.validate(async valid=>{
                if(!valid) return false
              let data =  await  this.getWarehouseInsert(this.form)
           if(data){
               this.$message({
                   type:'success',
                   duration:500,
                   message:'修改成功',
                
               })
               this.$router.push('/WarehouseInfo')
             this.form = {
       
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
         
      }
      this.goodsval = ''
      this.value = ''
      this.roleval = ''
      this.goodsTypeval = ''
      this.docval = ""
      }

  },
  computed: {
    ...mapState("warehouseInfo",["warehouseAFind"]),
    ...mapState("company",["companyall"]),
    companyOrID(){
        let obj = {}
        this.companyall.forEach(val => {
            obj[val.CompanyName] = val.ID
        });
        return obj
    }
  
   
  },
};
</script>

<style></style>
