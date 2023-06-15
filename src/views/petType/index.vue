<template>
  <div>
    <PageHeader title='宠物类型'></PageHeader>
    <el-button type="primary" icon="el-icon-plus"
    @click="$router.push({path:'/petTypeAdd'})"
     >添加
      
    </el-button>
    <el-table :data="tdata" size="medium"  >
      <el-table-column type="index" width="100" label="序号" align="center"> </el-table-column>
      <el-table-column label="名称" prop="PetName"  align='center'></el-table-column>
      <el-table-column label="说明" prop="Remark" align='center'></el-table-column>
      <el-table-column label="时间" prop="insertTime" align='center'>
        <template slot-scope="{row}">
          {{dayjs(row.InsertTime *1000).format('YYYY-MM-DD hh:mm:ss')}}
        </template>
      </el-table-column>
      
      <el-table-column
          align="center"
          label="操作" >
        <template slot-scope="{row}">
          <el-button type="warning" @click="goodsAlter(row)">修改</el-button>
          <el-button type="danger" @click="goodsDelete(row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import PageHeader from '@/components/PageHeader.vue'
  import dayjs from 'dayjs'
  import qs from "qs"
export default {
    name:"PetType",
    async created() {
    await this.getData()
  },
  data() {
    return {
      tdata: [],
    };
  },
  methods:{
      goodsAlter(row){
          this.$router.push({
            path:'/petTypeEdit',
            query:{id:row.ID}
            })
         
      },
      async getData(){
      let result = await this.$http({
      url: "/petType/all",
      method: "POST",
    });
    let data = result.data;
    if (data.code == 200) {
      this.tdata = data.data;
    }else{
      this.$message.error(data.msg)
    }
      },
      goodsDelete(row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async value=>{
          
        let {data} = await this.$http({
            method:'POST',
            url:`/petType/del`,
            data:qs.stringify({
              ID:row.ID
            })
          })
          if(data.code == 200){
            this.$message.success(data.msg)
            this.getData()
          }else{
            this.$message.error(data.msg)
          }
        }).catch(()=>{
          // return new error('出错了')
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