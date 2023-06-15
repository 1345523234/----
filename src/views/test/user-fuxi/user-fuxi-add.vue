<template>
  <div>
    <el-page-header @back="goBack" content="新增用户">
    </el-page-header>
    <el-form
      size="small"
      label-width="auto"
      :model="addForm"
      :rules="rules"
      ref="addForm">
      <el-form-item prop="username" label="账号">
        <el-input v-model="addForm.username"
          clearable></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="addForm.password"
          clearable></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="昵称">
        <el-input v-model="addForm.nickname"
          clearable></el-input>
      </el-form-item>
      <el-form-item prop="roleId" label="角色">
        <el-select v-model="addForm.roleId">
          <el-option v-for="item in roleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="handleSubmit">提交</el-button>
        <el-button @click="handleClick" >重置</el-button>
      </el-form-item>
    </el-form>
    {{addForm}}
    <br>
    {{roleList}}
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  name:'user-fuxi-add',
  async created(){
    await this.getRoleList()
  },
  computed:{
    ...mapState('userFuXi',['roleList'])
  },
  methods:{
    ...mapActions('userFuXi',['getRoleList','insert']),
    goBack(){
      this.$router.history.go(-1)
    },
    handleClick(){
      // 重置表单数据，到初始化状态
      // console.log(this.$refs.addForm)
      this.$refs.addForm.resetFields()
    },
    async handleSubmit(){
      //做表单的校验
      let r = await this.$refs.addForm.validate().catch(err => err)
      console.log(r)
      if(r){
        //打印要提交的数据查看是否正确
        console.log(this.addForm)
        //提交当前的数据调用接口执行添加
        await this.insert(this.addForm)
        //返回上一页
        this.goBack()
      }
    }
  },
  data(){
    return {
      addForm:{
        username:'',
        password:'',
        roleId:'',
        nickname:''
      },
      rules:{
        username:[
          {required:true,message:'用户名不可以为空'}
        ],
        password:[
          {required:true,message:'密码可以为空'}
        ],
        roleId:[
          {required:true,message:'角色不可以为空'}
        ],
        nickname:[
          {required:true,message:'昵称不可以为空'}
        ],
      }
    }
  }
}
</script>