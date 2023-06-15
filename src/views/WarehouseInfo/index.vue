<template>
  <div>
    <PageHeader title="仓库信息" />
    <el-form ref="form" label-width="100px" size="medium">
      <el-form-item
        label="仓库名称"
        size="medium"
        style="width:300px;float:left"
      >
        <el-input v-model.trim="pageData.WarehouseName" placeholder="请输入"></el-input>
      </el-form-item>
       <el-button
          type="primary"
          size="medium"
          style="margin-left: 12px;"
          icon="el-icon-zoom-in"
          @click="search"
          >查询</el-button
        >
         <el-button
          type="primary"
          size="medium"
          style="margin-left: 12px;"
          icon="el-icon-circle-plus-outline"
          @click="add"
          >新增</el-button
        >
     
    </el-form>
    <el-table :data="warehouseAll" style="width: 100%" border size="medium">
     <el-table-column label="序号" type="index" width="70"></el-table-column>
     <el-table-column prop="WarehouseName" label="仓库名称"> </el-table-column>
     <el-table-column prop="WarehouseAddress" label="仓库地址"> </el-table-column>
     <el-table-column prop="WarehouseType" label="仓库科目"> </el-table-column>
     <el-table-column prop="WarehouseTypeStock" label="总库存量"> </el-table-column>
     <el-table-column prop="WarehouseTypeStockIng" label="现存量"> </el-table-column>
      <el-table-column prop="CompanyName" label="进货商"> </el-table-column>
      
         
      <el-table-column label="操作" width="300px">
        <template slot-scope="{ row }">

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
      
  </div>
</template>

<script>
import Pangtion from '../../components/Pangtion.vue'
import PageHeader from "@/components/PageHeader.vue";
import dayjs from "dayjs";
import { mapActions, mapState } from "vuex";
import VueQr from "vue-qr";
export default {
  name: "WarehouseInfo",
  data() {
    return {
        val:'',
      dialogVisible: false,
      pageData: {
        Pno: 1,
        Psize: 10,
        WarehouseName:""
      },
      fromData:{
        
      },
      petInfo:[],
      value:"",
      stauteVal:""
    };
  },
 
   computed: {
    ...mapState("warehouseInfo", ["warehouseAll","page"]),
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
    await this.getWarehouseInfoAll(this.pageData)
   

  },
  methods: {
    // ...mapActions("news", ["getList"]),
    // ...mapActions("order", ["getCouponPage", "getDelData",'getUpdateData']),
    ...mapActions("warehouseInfo", ["getWarehouseInfoAll","getWarehouseInfoDel"]),
    dayjs,
    add(){
      this.$router.push({
        name: "WarehouseInfoInsert",
      })
    },
    //改变每页多少条数据
    async handleSizeChange(psize) {
      this.pageData.Psize = psize;
      this.pageData.Pno = 1;search
      await this.getWarehouseInfoAll(this.pageData);
    },
    //当前页是第几页
    async handleCurrentChange(pno) {
      this.pageData.Pno = pno;
      await this.getWarehouseInfoAll(this.pageData);
    },
    // 查询功能
    async search() {
      await this.getWarehouseInfoAll(this.pageData);
      this.pageData.WarehouseName = ""
    },
    // 删除功能
    async DelData(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
         await this.getWarehouseInfoDel(id)
         await this.getWarehouseInfoAll(this.pageData)
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
        name: "WarehouseInfoUpdate",
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
      this.warehouseAll.forEach(val=>{
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