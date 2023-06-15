<template>
  <div>
    <PageHeader title="宠物信息" />
    <el-form ref="form" label-width="80px" size="medium">
      <el-form-item
        label="宠物名字"
        size="medium"
        style="width:300px;float:left"
      >
        <el-input v-model="pageData.petName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item
        label="主人姓名"
        size="medium"
        style="width:300px;float:left"
      >
        <el-input v-model="pageData.masterName" placeholder="请输入"></el-input>
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
    <el-table :data="petData" style="width: 100%" border size="medium">
     <el-table-column label="序号" type="index" width="70"></el-table-column>
      <el-table-column prop="PetName" label="宠物名字"> </el-table-column>
      <el-table-column prop="MasterName" label="主人姓名"> </el-table-column>
      <el-table-column prop="PetType" label="宠物类型"> </el-table-column>
      <el-table-column prop="PetVarieties" label="宠物品种">
         </el-table-column>
      <el-table-column prop="PetDisease" label="宠物病情">
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
    <el-form-item label="宠物名字" >
      <el-input v-model="fromData.PetName" ></el-input>
    </el-form-item>
    <el-form-item label="宠物体重(kg)">
      <el-input v-model="fromData.PetInfoWeight"></el-input>
    </el-form-item>
    <el-form-item label="宠物年龄">
      <el-input v-model="fromData.PetInfoAge"></el-input>
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
    <el-form-item label="宠物品种">
      <el-input v-model="fromData.PetVarieties"></el-input>
    </el-form-item>
     <el-form-item label="状态" size="mini">
        <el-select v-model="stauteVal" placeholder="请选择" @change="stautChange">
          <el-option key="3" value="已康复">已康复</el-option>
          <el-option key="2" value="已取消">已取消</el-option>
          <el-option key="1" value="治疗中">治疗中</el-option>
        </el-select>
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
        petName: "",
        masterName: "",
      },
      fromData:{
        petName:"",
        PetTypeId:"",
        petDisease:"",
        petVarieties:"",
        id:""
      },
      petInfo:[],
      value:"",
      stauteVal:""
    };
  },

   computed: {
    ...mapState("pet", ["petData","page","petInfoData"]),
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
    // await this.getCouponPage(this.pageData);
    await this.getPet(this.pageData)
    await this.getPetInfoData()
    // this.list = this.petData

  },
  methods: {
    // ...mapActions("news", ["getList"]),
    // ...mapActions("order", ["getCouponPage", "getDelData",'getUpdateData']),
    ...mapActions("pet", ['getPet',"getEditPet","getPetFindId","getPetUpdate","getPetDel"]),
    dayjs,
    //改变每页多少条数据
    async handleSizeChange(psize) {
      this.pageData.Psize = psize;
      this.pageData.Pno = 1;
      await this.getPet(this.pageData);
    },
    //当前页是第几页
    async handleCurrentChange(pno) {
      this.pageData.Pno = pno;
      await this.getPet(this.pageData);
    },
    // 查询功能
    async search() {
      await this.getPet(this.pageData);
      this.pageData.masterName = ""
      this.pageData.petName = ""
    },
    // 删除功能
    async DelData(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
         await this.getPetDel(id)
         await this.getPet(this.pageData)
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
      this.dialogVisible = true
      this.fromData.id = id
      await this.getPetFindId(id)
      this.fromData = this.petInfoData
      this.value = this.petInfoData.PetInfoType
      switch (this.petInfoData.Status){
        case "1":
          this.stauteVal = "治疗中"
          break;
        case "2":
          this.stauteVal = "已取消"
          break;
        case "3":
          this.stauteVal = "已康复"
          break;
        default:
          break;
      }
      
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
      this.$router.push({
        name: "petInfo",
        query: {
          id,
        },
      });
    },
    //获取宠物类型
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
       petTyeoChange(val){
        this.petInfoData.PetTypeId = this.petTypeOrPetName[val]
        this.petInfoData.PetType = val
        
      },
      async confirm(){
        let res =   await this.getEditPet(this.fromData)
        if(res){
          
          await this.getPet(this.pageData)
          this.dialogVisible = false
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
          
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