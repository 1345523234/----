<template>
  <div>
    <p-page-header title="用户管理复习"></p-page-header>
    <el-form
      inline
      :model="queryForm"
      size="small"
      label-width="auto">
      <el-form-item 
        label="用户名">
        <el-input 
          placeholder="请输入用户名"
          clearable
          v-model="queryForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary"
          @click="handleSearch"
          icon="el-icon-search">
          查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="handleAdd"
          type="success"
          icon="el-icon-plus">
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      border 
      size="small"
      :data="list">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column prop="deptName" label="部门">
        <template v-slot="{row}">
          <el-tag>
            {{row.deptName}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="warning" 
            size="small"
            @click="handleEdit(row)">修改</el-button>
          <el-button
            type="danger"
            @click="handleRemove(row)"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryForm.pno"
      :page-size="queryForm.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalElements">
    </el-pagination>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
export default {
  name:'user-fuxi',
  computed:{
    ...mapState('userFuXi',['list','page'])
  },
  data(){
    return {
      queryForm:{
        pno:1,
        psize:10,
        username:''
      }
    }
  },
  methods:{
    ...mapActions('userFuXi',['getListForPage','removeById']),
    async handleSearch(){
      //由于条件变更，还需要将页号初始化成1
      this.queryForm.pno = 1
      //由于点击查询时查询的用户名是和queryForm双向绑定的，所以是自动赋值，直接重新查询即可
      await this.getListForPage(this.queryForm)
    },
    // 每页多少条改变时触发
    async handleSizeChange(psize){
      console.log(psize)
      this.queryForm.pno = 1
       this.queryForm.psize = psize
      await this.getListForPage(this.queryForm)
    },
    //页号改变时触发
    async handleCurrentChange(pno){
      console.log(pno)
      this.queryForm.pno = pno
      await this.getListForPage(this.queryForm)
    },
    handleAdd(){
      this.$router.push('/user-fuxi-add')
    },
    handleEdit(row){
      console.log(row)
      // 跳转到修改页面并且将当前行的数据的id带过去
      this.$router.push({
        path:'/user-fuxi-edit',
        query:{
          id:row.id
        }
      })
    },
    async handleRemove(row){
      console.log(row)
      //弹出询问框
      let r = await this.$confirm('正在删除当前数据，是否继续','提示',{
        type:'warning'
      }).catch(err => err)
      console.log(r)
      //调用删除接口
      await this.removeById(row.id)
      //重新查询
      await this.getListForPage(this.queryForm)
      //判断最后一页的最后一条删除时的bug
      if(this.queryForm.pno>this.page.pCount){
        this.queryForm.pno = this.page.pCount
        await this.getListForPage(this.queryForm)
      }
    }
  },
  //为什么要使用两个生命周期是因为
  //这个项目的二级路由页面都是异步引用的，并且结合了vuex
  //导致了如果用户是直接刷新这个网页的那一次的第一次访问
  //由于keep-alive没有对所有的页面都缓存完毕，导致不会执行activated
  //所以这个页面为了满足所有情况都能正常查询才使用了两个生命周期
  async created() {
    await this.getListForPage(this.queryForm)
  },
  //使用activated生命周期是因为我们在路由中对所有的二级查询页面都进行了
  //keep-alive的缓存，如果以后的项目中没有缓存可以不使用这个生命周期
  async activated() {
    await this.getListForPage(this.queryForm)
  },
  
}
</script>