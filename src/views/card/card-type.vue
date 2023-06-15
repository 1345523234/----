<template>
<div>
    <PageHeader title="卡片管理"></PageHeader>
    <el-button type="primary" icon="el-icon-plus"
    @click="addData"
    >添加</el-button>
     <el-table
    :data="list"
    style="width: 100%">
    <el-table-column
      prop="bm"
      label="bm"
      >
    </el-table-column>
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
              path:'/card-type-edit',
              query:{
                  id:row.id
              }
          })"
          >修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small"
          @click="delData(row,$index)"
          >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
  
</template>

<script>
import dayjs from 'dayjs'
import PageHeader from '@/components/PageHeader.vue'
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.getData()
    },
    methods:{
       async getData(){
         let {data:{data,code}} =  await this.$http({
               url:'card-type/list/all',
               method:'GET'
           })
           if(code == 200){
               this.list = data.list
           }
        },
       async  delData(row){
           let {data} = await this.$http({
                url:`/card-type/delete/id/${row.id}`,
                method:'DELETE'
            })
            if(data.code == 200){
                this.$message.success('删除成功')
                this.getData()
            }else{
                this.$message.error(data.msg)
            }
     },
     addData(){
         this.$router.push({
             path:'/card-type-add'
         })
     },
     dayjs
    },
    components:{
        PageHeader
    }
}
</script>

<style>

</style>