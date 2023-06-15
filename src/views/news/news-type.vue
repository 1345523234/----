<template>
  <div>
    <PageHeader title="新闻管理"></PageHeader>
    <el-input v-model="page.name" placeholder="根据内容搜索"
    style="width:200px"
    ></el-input>
    <el-input v-model="page.remark" placeholder="根据说明搜索"
    style="width:200px;margin:0 10px"></el-input>
    <el-button type="success" @click="search">搜索</el-button>
    <el-button type="primary" icon="el-icon-plus"
    @click="$router.push('/news-type-add')"
    >添加</el-button>
     <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      >
    </el-table-column>
    <el-table-column
      prop="insertTime"
      label="日期"
      >
      <template slot-scope="{row,$index}">
          {{dayjs(row.insertTime).format('YYYY-MM-DD hh:mm:ss')}}
      </template>
    </el-table-column>
    <el-table-column
        prop="name"
        label="名字"
      >
    </el-table-column>
    <el-table-column
      prop="remark"
      label="备注"
      >
    </el-table-column>
    <el-table-column
      label="操作"
      >
      <template slot-scope="{row,$index}">
          <el-button type="primary" icon="el-icon-edit" size="small"
          @click="$router.push({
              path:'/news-type-edit',
              query:{
                  id:row.id
              }
          })"
          >修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small"
          @click="reData(row.id)"
          >删除</el-button>
      </template> -->
      {{list}}
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  style="margin-top: 20px; text-align: center"
  :page-size="page.psize"
  :page-sizes="[3, 5, 10]"
   @next-click ='getPageData(1)'
   @prev-click ='getPageData(-1)'
   @current-change='getPageData'
  :total="total">
</el-pagination>
</div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader.vue'
export default {
    name:'newsType',
    data(){
        return{
            total:0,
            page:{
              psize:3,
              pno:1,
              name:'',
              remark:''
            },
            
        }
    },
    methods:{
        ...mapActions('news',['getList','delData']),
        // async getList(){
        // let res = await this.$store.dispatch('news',['getList'])   
        // let res = await this.$store.dispatch('news/getList')   
        //   this.list = this.$store.state.news.list
        // },
        dayjs,
       async getPageData(num){
         num>=1?this.page.pno = num:this.page.pno+=num
        await this.$store.dispatch('news/getPageData',this.page)
        this.total = this.pageInfo.totalElements
       },
      reData(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          console.log(id);
         let {code,msg}= await this.delData(id)
          code==200?
          this.$message({type: 'success',message:msg})
          :this.$message.error(msg)
          this.getPageData(this.page.pno)
          // this.getData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });          
   
        
      },
      async search(){
        await this.getPageData(this.page.pno)
       console.log(this.list);
      }
    },
    mounted(){
        this.getPageData(0)
    },
    computed:{
        ...mapState('news',['list','pageInfo']),
        ...mapGetters('news',['pageListData'])
    },
    components:{
        PageHeader
    }
}
</script>

<style>

</style>