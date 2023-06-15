<template>
  <div>
    <PageHeader title="主人信息" />
    <el-form ref="form" label-width="80px" size="medium">
    
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
    <el-table :data="masterAll" style="width: 100%" border size="medium">
     <el-table-column label="序号" type="index" width="70"></el-table-column>
     <el-table-column prop="MasterName" label="主人姓名"> </el-table-column>
     <el-table-column prop="IdCard" label="身份证信息"> </el-table-column>
     <el-table-column prop="Age" label="年龄"> </el-table-column>
     <el-table-column prop="Sex" label="性别"> </el-table-column>
      <el-table-column prop="PetName" label="宠物名字"> </el-table-column>
      <el-table-column prop="PetVarieties" label="宠物品种">
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
            @click="updateData(row.ID)"
            >修改</el-button
          >
           <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="delData(row.ID)"
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
    <el-form-item label="姓名" >
      <el-input v-model="fromData.MasterName" ></el-input>
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="fromData.IdCard"></el-input>
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="fromData.Age"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="fromData.Sex" placeholder="">
        <el-option key="1" value="男"></el-option>
        <el-option key="2" value="女"></el-option>
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
  name: "master",
  data() {
    return {
        val:'',
      dialogVisible: false,
      pageData: {
        Pno: 1,
        Psize: 10,
        masterName: "",
      },
      fromData:{}
      // list:[]
    };
  },
   computed: {
    ...mapState("master", ["masterAll","page","masterInfo"]),
   idOrGoodsType(){
      let obj = {}
     this.goodsTypes?.forEach(val => {
        obj[val.ID] = val.Name
     });
     return obj
   }
  },
  async created() {
    // await this.getCouponPage(this.pageData);
    await this.getMasterAll(this.pageData)
    // this.list = this.petData

  },
  methods: {
    ...mapActions("master", ['getMasterAll',"getMasterDetail","getMasterUpdate","getMasterDel"]),
    dayjs,
    //改变每页多少条数据
    async handleSizeChange(psize) {
      this.pageData.Psize = psize;
      this.pageData.Pno = 1;
      await this.getMasterAll(this.pageData);
    },
    //当前页是第几页
    async handleCurrentChange(pno) {
      this.pageData.Pno = pno;
      await this.getMasterAll(this.pageData);
    },
    // 查询功能
    async search() {
      await this.getMasterAll(this.pageData);
      this.pageData.masterName = ""
    },
    //删除功能
    async delData(id) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
           await this.getMasterDel(id)
           await this.getMasterAll(this.pageData)
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
    async updateData(id) {
        let res =await this.getMasterDetail(id)
        this.fromData = this.masterInfo
        this.dialogVisible = true
      
    },
     async confirm(){
    let res =  await this.getMasterUpdate(this.fromData)
     if(res){
          await this.getMasterAll(this.pageData)
          this.dialogVisible = false
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
    

          
      },
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
        name: "masterDetails",
        query: {
          id,
        },
      });
    },
 
  },
 
  components: {
    PageHeader,
    VueQr,
    Pangtion
  },
};
</script>

<style></style>