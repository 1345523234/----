<template>
  <div>
    <PageHeader title="订单管理" />
    <el-form ref="form" label-width="100px" size="medium">
      <el-form-item
        label="联系人手机号"
        size="medium"
        style="width:300px;float:left"
      >
        <el-input v-model="pageData.phone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" style="width:300px;float:left" size="medium">
        <el-select v-model="pageData.status" placeholder="请选择">
          <el-option label="已支付" value="1"></el-option>
          <el-option label="已取消" value="2"></el-option>
          <el-option label="已完成" value="3"></el-option>
        </el-select>
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
    <el-table :data="list" style="width: 100%" border size="medium">
      <el-table-column prop="PostCode" label="订单编号" width="150px"> </el-table-column>
      <el-table-column prop="Phone" label="联系人手机号" width="150px"> </el-table-column>
      <el-table-column prop="Name" label="联系人姓名"> </el-table-column>
      <el-table-column label="主治医生" prop="Doctor">
				<!-- 
					这个是el-table-column
				 中通过slot插槽来实现自定义插入数据的写法，
				 通过template嵌套之后可以在v-slot="{row}"拿到每一行的数据
				 row存的就是list中每一行的json对象
				 -->
				<template v-slot="{row}">
					<el-tag size="medium" :type="row.Doctor?'success':'danger'">
						{{row.Doctor?row.Doctor:"已离职"}}
					</el-tag>
				</template>
			</el-table-column>
       <el-table-column prop="RoleType" label="医生职称"> </el-table-column>
      <el-table-column prop="SinglePrice" label="订单金额"> </el-table-column>
      
      <el-table-column prop="postCode" label="药品类型">
        <template slot-scope="{row}">
            {{idOrGoodsType[row.GoodTypeID]}}
        </template>
         </el-table-column>
         <el-table-column prop="DrugName" label="药品名称"> </el-table-column>
         <el-table-column prop="OutpatientCare" label="门诊费用" width="100px"> 
         </el-table-column>
      <el-table-column prop="Status" label="订单状态" width="100px">
        <template slot-scope="{ row }">
          <el-tag v-if="row.Status == 3" type="success">已完成</el-tag>
          <el-tag v-if="row.Status == 2" type="warning">已取消</el-tag>
          <el-tag v-if="row.Status == ''" type="warning">已取消</el-tag>
          <el-tag v-if="row.Status == 1" type="">已支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="insertTime" label="订单时间" width="162px">
        <template slot-scope="{ row }">
          {{ dayjs(row.InsertTime*1000).format("YYYY-MM-DD hh:mm:ss") }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="350px">
        <template slot-scope="{ row }">
          <el-button
            plain
            size="mini"
            icon="el-icon-zoom-in"
            type="success"
            v-if="row.Status == 1 "
            @click="details(row.ID)"
            >完成订单</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            v-if="row.Status != 1 "
            @click="delData(row.ID)"
            >删除订单</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
             v-if="row.Status == 1 "
            v-show="!row.postCode"
            @click="cencal(row.ID)"
          >
            取消订单</el-button
          >
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
          >
             
            <p>请输入物流编号</p>
            <el-input v-model="val"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editData(row.id)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
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
  name: "order",
  data() {
    return {
        val:'',
      dialogVisible: false,
      pageData: {
        pno: 1,
        psize: 10,
        phone: "",
        status: "",
      },
    };
  },
   computed: {
    ...mapState("order", ["list", "page","goodsTypes",]),
   idOrGoodsType(){
      let obj = {}
     this.goodsTypes?.forEach(val => {
        obj[val.ID] = val.Name
     });
     return obj
   }
  },
  async created() {
    console.log(111);
    
    await this.getCouponPage(this.pageData);
   
  },
 
watch: {
  //  $route(to, from) {
  //      window.location.reload(); //监测到路由发生跳转时刷新一次页面
  //  },
},
  methods: {
    ...mapActions("order", ["getCouponPage","getCompleteOrder", "getDelData",'getUpdateData',"getOrderCencal"]),
    dayjs,
    //取消订单
    async cencal(id){
     let boo =  await this.getOrderCencal(id)
      await this.getCouponPage(this.pageData);
      if(boo){
          this.$message({
            type: "success",
            message: "取消成功!",
          });
      }
    },
    //改变每页多少条数据
    async handleSizeChange(psize) {
      this.pageData.psize = psize;
      await this.getCouponPage(this.pageData);
    },
    //当前页是第几页
    async handleCurrentChange(pno) {
      this.pageData.pno = pno;
      await this.getCouponPage(this.pageData);
    },
    // 查询功能
    async search() {
      await this.getCouponPage(this.pageData);
    },
    //删除功能
    async delData(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.getDelData(id);
          await this.getCouponPage(this.pageData);
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
        let value = {id,postCode:this.val}
      // if(this.val){
      //   await this.getUpdateData(value)
      // this.dialogVisible = false
      // }else{
      //     this.$message.error('请输入物流编号')
      // }
      
    },
    //详情
    async details(id) {
       let boo =  await this.getCompleteOrder(id)
       await this.getCouponPage(this.pageData);
      if(boo){
          this.$message({
            type: "success",
            message: "已完成!",
          });
      }
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
