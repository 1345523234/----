<template>
  <div>
      <PageHeader title="新闻" />
      <el-form ref="form" label-width="100px">
          <el-form-item label="新闻名称" size="mini" style="width:300px;float:left">
              <el-input v-model="pageData.name" 
              placeholder="请输入"
              ></el-input>
          </el-form-item>
          <el-form-item label="新闻类型" style="width:300px;float:left" size="mini">
              <el-select v-model="pageData.newsTypeId" placeholder="请选择" size="mini">
                  <el-option :label="item.name" :value="item.id" size="mini"
                  v-for="item in newsList"
                  :key="item.id"
                  ></el-option>
                 
              </el-select>
          </el-form-item>
          <el-form-item  style="float:left;margin-left:-100px" size="mini">
              <!-- template -->
          <el-button type="primary" size="mini" icon="el-icon-zoom-in" @click="search">查询</el-button>
          
          <el-button type="success" size="mini" icon="el-icon-plus" @click="newData">新增</el-button>
          <el-button type="success" plain size="mini" icon="el-icon-plus" @click="mudNewData" >批量新增</el-button>
          </el-form-item>
      </el-form>
      <el-table
          :data="list"
          style="width: 100%"
          border
          size='mini'>
          <el-table-column
              prop="name"
              label="新闻名称">
          </el-table-column>
          <el-table-column
              prop="logo"
              label="新闻logo">
              <template slot-scope="{row}">
                         <el-image
      style="width: 100px; height: 100px" :src="row.logo"></el-image>
              </template>
      
          </el-table-column>
          <el-table-column
              prop="newsTypeName"
              label="新闻类型">
              <template slot-scope="{row}">
              <el-tag >{{row.newsTypeName}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
              prop="description"
              label="新闻摘要">
          </el-table-column>
          <el-table-column
              prop="author"
              label="新闻作者">
          </el-table-column>
          <el-table-column
              label="操作"
              width="300px">
              <template slot-scope="{row}">
                  <el-button type="warning" plain size='mini' icon="el-icon-edit"
                @click="dialogVisible =true"  >预览</el-button>
              <el-dialog title="" :visible.sync="dialogVisible" 
                 width="50%" >
                 <span v-html="row.content">
                        {{row.content}}
                 </span>
                     
                

                <span slot="footer" class="dialog-footer">
                </span>
                </el-dialog>
                  <el-button type="warning"   icon="el-icon-edit" size="mini"
                  @click="editData(row.id)"
                  >
                      修改</el-button>
                  <el-button type="danger" size="mini" icon='el-icon-delete'
                  @click="delData(row.id)"
                  >删除</el-button>
              </template>
          </el-table-column>
      </el-table>
     <el-pagination
      style="margin-top: 20px; text-align:center"
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="pageData.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalElements">
    </el-pagination>
  </div>
</template>

<script>
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
            psize:10,
            name:'',
            newsTypeId:''
        }
        }
    },
    async mounted(){
       await this.getCouponPage(this.pageData)
        await this.getList()
    },
    methods:{
        ...mapActions('news',['getList']),
        ...mapActions('newsModel',['getCouponPage','getDelData']),
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
                name:'newsModelEdit',
                params:{
                    id:id
                }
            })
        },
        //新增数据
        newData(){
            this.$router.push({
                path:'/newsModel-add'
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
        ...mapState('newsModel',['list','page']),
        ...mapState('news',{newsList:'list'}),
    },
    components: {
    PageHeader,
    VueQr
  },
}
</script>

<style>

</style>