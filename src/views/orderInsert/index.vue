<template>
  <div>
    <el-page-header @back="$router.back()" content="新增订单信息">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
         
      <el-form-item label="主人姓名" prop="name" size="mini">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" size="mini"
      >
        <el-input v-model.number="form.phone" 
        ></el-input>
        
      </el-form-item>
      
      <el-form-item label="身份证" prop="idCard" size="mini">
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="年龄" size="mini"
      >
        <el-input v-model.number="form.age" 
        ></el-input>
        
      </el-form-item>
      <el-form-item label="性别"  size="mini"
      >
        <el-select   v-model="form.sex" placeholder="请选择" >
          <el-option  value="男"></el-option>
          <el-option  value="女"></el-option>
        </el-select>
        
      </el-form-item>
       <el-form-item label="选择医师" size="mini" >
        <el-select  style="margin-right:16px" v-model="roleval" placeholder="请选择" @change="chageRoleType">
          <el-option
            v-for="item in roleType"
            :key="item.ID"
            :value="item.Name"
          >
          </el-option>
        </el-select>
        <el-select v-model="docval" placeholder="请选择"  @change="chageDoctor">
          <el-option
            v-for="item in doctor"
            :key="item.ID"
            :value="item.Nickname"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="药品信息" size="mini">
        <el-select v-model="goodsTypeval" placeholder="请选择" 
        @change="goodsTyepChange"
        style="margin-right:16px">
          <el-option
            v-for="item in goodsTypeList"
            :key="item.ID"
            :value="item.Name"
          >
          </el-option>
        </el-select>
        <el-select v-model="goodsval" placeholder="请选择" @change="goodsChange">
          <el-option
            v-for="item in goodsList"
            :key="item.ID"
            :value="item.Name"
          >
         
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="门诊费用" size="mini" >
    <el-select v-model="form.outpatientCare" placeholder="请选择" @change="outpatientCare">
          <el-option value="30"></el-option>
          <el-option value="50"></el-option>
          <el-option value="100"></el-option>
        </el-select>
  </el-form-item>
  <el-form-item label="总费用" size="mini">
    <span>{{form.singlePrice}}</span>
  </el-form-item>
  <el-form-item label="宠物名称" size="mini">
    <el-input v-model="form.petName "></el-input>
  </el-form-item>
 <el-form-item label="宠物类型" size="mini">
        <el-select v-model="value" placeholder="请选择" @change="petTyeoChange">
          <el-option
            v-for="item in petInfo"
            :key="item.ID"
            :value="item.PetName">
          </el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="宠物品种" size="mini">
    <el-input   v-model="form.petVarieties"></el-input>
  </el-form-item>
  <el-form-item label="宠物年龄" size="mini">
    <el-input v-model.number="form.petInfoAge"></el-input>
  </el-form-item>
  <el-form-item label="宠物体重（kg） " size="mini">
    <el-input v-model="form.petInfoWeight "></el-input>
  </el-form-item>
   <!-- <el-form-item label="宠物状态" prop="name" size="mini">
        <el-select v-model="value" placeholder="请选择" >
         <el-option value="3">已康复</el-option>
         <el-option value="1">治疗中</el-option>
        </el-select>
      </el-form-item> -->
       <el-form-item label="宠物病情 ">
    <el-input  type="textarea" v-model="form.petDisease"></el-input>
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
    name:'orderInsert',
  props: ["id"],
  data() {
    let token = sessionStorage.token;
    return {
        goodsTypeval:"",
        value:"",
        goodsval:'',
        form: {
          name:"", 
          phone:"", 
          singlePrice:0,
          goodTypeID:"",
	        petName:"", 
          petTypeId:"" ,
          petInfoAge:"" ,
          petInfoWeight:"",
          status:1,
          petVarieties:"",
          idCard:"",
          outpatientCare:30,
          goodsID:"",
          petDisease:"",
          roleId:"",
          doctorId:"",
          age:"",
          sex:""
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
    await this.getGoodsType();
    await this.getPetInfoData()
    await this.getRoleType()
  },
  methods: {
    ...mapActions("goods", [ "getGoodsType","getGoodsAboutGoodstype" ]),
    async chageRoleType(val){
      this.form.roleId = this.roleOrRoleId[val]
      this.getDoctor(this.form.roleId)
      this.docval = ""
    },
    async getRoleType(){
        let {data:{data}} = await this.$http({
        method:"POST",
        url:"/role/list/all",
        data:qs.stringify({
        })
      })
      this.roleType = data
     
    },
    async getDoctor(id){
      let {data:{data}} = await this.$http({
        method:"POST",
        url:"/roleType/role/id",
        data:qs.stringify({
          ID:id
        })
      })
      console.log(data);
      this.doctor = data
    },
    chageDoctor(val){
      this.form.doctorId = this.doctorOrId[val]
      
    },
    hh(){
        
        this.form.phone = Number.parseInt(this.form.phone)

    },
    async getPetInfoData(){
      let result = await this.$http({
      url: "/petType/all",
      method: "POST",
    });
    let data = result.data;
    if (data.code == 200) {
      this.petInfo = data.data;
    }else{
      this.$message.error(data.msg)
    }
      },
      outpatientCare(val){
  let price = val - 0
        for(let i = 0;i<this.goodsList.length;i++){
            if(this.goodsList[i].ID == this.form.goodsID){
                price = this.goodsList[i].Price - 0 + price
            }
        }
        this.form.singlePrice = price
      },
      async goodsTyepChange(val){
        this.form.goodTypeID = this.typeIdOrName[val]
       let data =  await this.getGoodsAboutGoodstype(this.form.goodTypeID)
       this.goodsList = data.data
       this.goodsval = ''
      },
      petTyeoChange(val){
        this.form.petTypeId = this.petTypeOrPetName[val]
        
      },
      goodsChange(val){
       this.form.goodsID =  this.goodsIdOrName[val]
       let price = this.form.outpatientCare
        for(let i = 0;i<this.goodsList.length;i++){
            if(this.goodsList[i].ID == this.form.goodsID){
                price = this.goodsList[i].Price - 0 + price
            }
        }
        this.form.singlePrice = price
      },
      //提交数据
      async submit(){
         try{
            this.$refs.form.validate(async valid=>{
                if(!valid) return false
                  let {data} =  await this.$http({
            url:"/petOrmaster/Petdeng/Insert",
            method:"POST",
            data:qs.stringify({
                ...this.form
            })
           })
           if(data.code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:'添加成功',
                
               })
             this.form = {
          name:"", 
          phone:"", 
          singlePrice:0,
          goodTypeID:"",
	        petName:"", 
          petTypeId:"" ,
          petInfoAge:"" ,
          petInfoWeight:"",
          status:1,
          petVarieties:"",
          idCard:"",
          outpatientCare:30,
          goodsID:"",
          roleId:"",
          doctorId:""
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
          name:"", 
          phone:"", 
          singlePrice:0,
          goodTypeID:"",
	      petName:"", 
          petTypeId:"" ,
          petInfoAge:"" ,
          petInfoWeight:"",
          status:1,
          petVarieties:"",
          idCard:"",
          outpatientCare:30,
          goodsID:"",
          roleId:"",
          doctorId:""
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
