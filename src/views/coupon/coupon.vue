<template>
  <div>
      <PageHeader title="折扣上商品信息" />
      <el-form ref="form" label-width="100px">
          <el-form-item label="优惠券名称" size="mini" style="width:300px;float:left">
              <el-input v-model="pageData.name" 
              placeholder="请输入"
              ></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型" style="width:300px;float:left" size="mini">
              <el-select v-model="pageData.couponTypeId" placeholder="请选择" size="mini">
                  <el-option label="满减券" value="1" size="mini"></el-option>
                  <el-option label="现金券" value="0" size="mini"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item  style="float:left;margin-left:-100px" size="mini">
              <!-- template -->
          <el-button type="primary" size="mini" icon="el-icon-zoom-in" @click="search">查询</el-button>
          <el-button type="success" size="mini" icon="el-icon-plus" @click="newData">新增</el-button>
          <!-- <el-button type="success" plain size="mini" icon="el-icon-plus" @click="mudNewData" >批量新增</el-button> -->
          </el-form-item>
      </el-form>
      <el-table
          :data="list"
          style="width: 100%"
          border
          size="medium">
          <el-table-column type="index" width="100" label="序号" align="center"> </el-table-column>
          <el-table-column
              prop="ID"
              label="打折商品ID">
          </el-table-column>
          <el-table-column
              prop="Name"
              label="商品名称">
          </el-table-column>
          <el-table-column
              prop="Price"
              label="商品价格">
          </el-table-column>
          <el-table-column
              prop="ZheKou"
              label="折扣信息">
              <template slot-scope="{row}">
              <el-tag type="danger">{{row.ZheKou}}折</el-tag>
              </template>
          </el-table-column>
          <el-table-column
              prop="InsertTime"
              label="到期时间">
              <template slot-scope="{row}">
              <el-tag size="mini" >{{dayjs(row.InsertTime * 1000).format('YYYY-MM-DD hh:mm:ss')}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
              prop="Remark"
              label="优惠券备注">
          </el-table-column>
          <el-table-column
              label="操作"
              width="300px">
              <template slot-scope="{row}">
                  <el-button type="warning" plain size='mini' icon="el-icon-edit"
                  @click="dialogVisible = true"
                  >查看二维码</el-button>
                  <el-dialog title="二维码查看" :visible.sync="dialogVisible" 
                 width="20%" center>
                 <vue-qr :text=' JSON.stringify(row)' logoSrc='/images/1.jpg'
                :logoScale='50' :autoColor='false' backgroundColor='red' 
                :size='300' colorDark='green' 
                colorLight='pink' style="margin:0px auto;display:block;"
                 ></vue-qr>

                <span slot="footer" class="dialog-footer">
                </span>
                </el-dialog>
                  <el-button type="warning"   icon="el-icon-edit" size="mini"
                  @click="editData(row.ID)"
                  >
                      修改</el-button>
                  <el-button type="danger" size="mini" icon='el-icon-delete'
                  @click="delData(row.ID)"
                  >删除</el-button>
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
import dayjs from 'dayjs'
import { mapActions, mapState } from 'vuex';
import VueQr from 'vue-qr'
export default {
    name:'coupon',
    data(){
        return{
        dialogVisible:false,
        pageData:{
            pno:1,
            psize:5,
            name:'',
            couponTypeId:''
        }
        }
    },
    async mounted(){
        this.pageData.pno = 1
       await this.getCouponPage(this.pageData)
      
    },
    watch:{
    $route(){
       location.reload();
    }
  },
    methods:{
        ...mapActions('coupon',['getCouponPage','getDelData']),
        dayjs,
        //改变每页多少条数据
        async handleSizeChange(psize){
            this.pageData.psize = psize
            await this.getCouponPage(this.pageData)
        },
        //当前页是第几页
        async handleCurrentChange(pno){
            this.pageData.pno = pno
            await this.getCouponPage(this.pageData)
        },
        // 查询功能
        async search(){
            await this.getCouponPage(this.pageData)
        },
        //删除功能
        async delData(id){
            
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
             await this.getDelData(id)
            this.pageData.pno = 1
            await this.getCouponPage(this.pageData)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
        },
        //修改数据
        async editData(id){
            this.$router.push({
                name:'couponEdit',
                params:{
                    id:id
                }
            })
        },
        //新增数据
        newData(){
            this.$router.push({
                path:'/coupon-add'
            })
        },
        //批量添加
        mudNewData(){
             this.$router.push({
                path:'/coupon-add-mud'
            })
        }
    },
    computed:{
        ...mapState('coupon',['list','page'])
    },
    components: {
    PageHeader,
    VueQr,
    Pangtion
  },
}
</script>

<style>

</style>