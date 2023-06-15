<template>
  <div>
    <PageHeader title="进货商信息" />
    <el-form ref="form" label-width="100px" size="medium">
      <el-form-item
        label="联系人姓名"
        size="medium"
        style="width:300px;float:left"
      >
        <el-input v-model.trim="pageData.companyContact" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item
        label="公司名称"
        size="medium"
        style="width:300px;float:left"
      >
        <el-input v-model.trim="pageData.companyName" placeholder="请输入"></el-input>
      </el-form-item>
   
       <el-button
          type="primary"
          size="medium"
          style="margin-left: 12px;"
          icon="el-icon-zoom-in"
          @click="search"
          >查询</el-button
        >
    
    
    </el-form>
    <el-table :data="companyall" style="width: 100%" border size="medium">
     <el-table-column label="序号" type="index" width="70"></el-table-column>
      <el-table-column prop="CompanyName" label="公司名称"> </el-table-column>
      <el-table-column prop="CompanyAddress" label="公司地址"> </el-table-column>
      <el-table-column prop="CompanyContact" label="联系人"> </el-table-column>
      <el-table-column prop="Admissions" label="联系人职务">
         </el-table-column>
      <el-table-column prop="ContactPhone" label="联系人电话">
         </el-table-column>
         
      <el-table-column label="操作" width="300px">
        <template slot-scope="{ row }">
          <el-button
            plain
            size="mini"
            icon="el-icon-zoom-in"
            type="primary"
            @click="details(row.ID)"
            >详情</el-button
          >
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="editData(row.ID)"
            >修改</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="DelData(row.ID)"
            >删除</el-button
          >
          
        </template>
      </el-table-column>
    </el-table>
     <Pangtion :page="page" @sizeChange="handleSizeChange"
			@currentChange="handleCurrentChange" />
       <el-dialog
  title="修改信息"
  :visible.sync="dialogVisible"
  width="40%"
  :before-close="handleClose">
  <el-form ref="fromData" :model="fromData" 
  style="width:500px"
  label-width="180px" size="medium">
    <el-form-item label="公司名称:" >
        <span>{{fromData.CompanyName}}</span>
    </el-form-item>
    <el-form-item label="公司地址:">
       <span>{{fromData.CompanyAddress}}</span>
    </el-form-item>
    <el-form-item label="统一社会信用代码:">
      <span>{{fromData.UnifiedSocialCreditCode}}</span>
    </el-form-item>
    <el-form-item label="法人:" size="mini">
      <span>{{fromData.JuridicalPerson}}</span>
      </el-form-item>
    <el-form-item label="联系人:">
       <span>{{fromData.CompanyContact}}</span>
    </el-form-item>
     <el-form-item label="联系人职务:" size="mini">
      <span>{{fromData.Admissions}}</span>
      </el-form-item>
     <el-form-item label="联系人电话:" size="mini">
       <span>{{fromData.ContactPhone}}</span>
      </el-form-item>
     <el-form-item label="邮箱地址:" size="mini">
      <span>{{fromData.Email}}</span>
      </el-form-item>
     <el-form-item label="开户商:" size="mini">
      <span>{{fromData.OpenAccount}}</span>
      </el-form-item>
     <el-form-item label="银行账号:" size="mini">
      <span>{{fromData.Bank}}</span>
      </el-form-item>
     <el-form-item label="银行联号:" size="mini">
       <span>{{fromData.BankAffiliated}}</span>
      </el-form-item>
     <el-form-item label="备注:" size="mini">
        <span>{{fromData.Remark}}</span>
      </el-form-item>
  </el-form>
 
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import Pangtion from '../../components/Pangtion.vue'
import PageHeader from "@/components/PageHeader.vue";
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
import VueQr from "vue-qr";
export default {
  name: "pet",
  data() {
    return {
        val:'',
      dialogVisible: false,
      pageData: {
        Pno: 1,
        Psize: 10,
        companyContact: "",
        companyName: "",
      },
      fromData:{
        
      },
      petInfo:[],
      value:"",
      stauteVal:""
    };
  },
  watch: {
 
},
   computed: {
    ...mapState("company", ["companyall","page"]),
   idOrGoodsType(){
      let obj = {}
     this.goodsTypes?.forEach(val => {
        obj[val.ID] = val.Name
     });
     return obj
   },
   petTypeOrPetName(){
        let obj = {}
        for(let i= 0;i<this.petInfo.length;i++){
            obj[this.petInfo[i].PetName] =this.petInfo[i].ID
        }
        return obj
    },
  },
  async created() {
    await this.getCompanyAll(this.pageData)
   

  },
  methods: {
    // ...mapActions("news", ["getList"]),
    // ...mapActions("order", ["getCouponPage", "getDelData",'getUpdateData']),
    ...mapActions("company", ["getCompanyAll","getCompanyDelId"]),
    dayjs,
    //改变每页多少条数据
    async handleSizeChange(psize) {
      this.pageData.Psize = psize;
      this.pageData.Pno = 1;
      await this.getCompanyAll(this.pageData);
    },
    //当前页是第几页
    async handleCurrentChange(pno) {
      this.pageData.Pno = pno;
      await this.getCompanyAll(this.pageData);
    },
    // 查询功能
    async search() {
      await this.getCompanyAll(this.pageData);
      this.pageData.companyContac = ""
      this.pageData.companyName = ""
    },
    // 删除功能
    async DelData(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
         await this.getCompanyDelId(id)
         await this.getCompanyAll(this.pageData)
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改数据
    async editData(id) {
    
      this.$router.push({
        name: "updateCompany",
        query: {
         id
        },
      })
      
    },
    stautChange(val){
       switch (val){
        case "治疗中":
          this.petInfoData.Status = 1
          break;
        case "已取消":
          this.petInfoData.Status = 2
          break;
        case "已康复":
          this.petInfoData.Status = 3
          break;
        default:
          break;
      }
    },
    //关闭对话框
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    //详情
    details(id) {
      this.companyall.forEach(val=>{
        if(val.ID == id){
          this.fromData = val
        }
      })
  this.dialogVisible = true
    },
    //获取宠物类型
   
       petTyeoChange(val){
        this.petInfoData.PetTypeId = this.petTypeOrPetName[val]
        this.petInfoData.PetType = val
        
      },
      async confirm(){
       this.dialogVisible = false
      }
  },
 
  components: {
    PageHeader,
    VueQr,
    Pangtion
  },
};
</script>

<style></style>