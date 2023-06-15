<template>
	<div class="page">
		<p-page-header title="角色管理"></p-page-header>
		<el-form inline :model="queryForm">
			<el-form-item size="small " label="用户名：">
			<el-input v-model="queryForm.Username" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item size="small ">
				<el-button type="primary" :loading="queryLoading" @click="handleClick" icon="el-icon-search">查询</el-button>
			</el-form-item>
			<el-form-item size="small ">
				<el-button type="success" :loading="queryLoading" @click="handleAdd" icon="el-icon-plus">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table
			border
			size="medium"
			:data="list">
			<el-table-column label="序号" type="index" width="70"></el-table-column>
			<el-table-column label="角色id" prop="ID" width="200"></el-table-column>
			<el-table-column label="角色名称" prop="Name"></el-table-column>
			<el-table-column label="创建时间" prop="InsertTime">
				<template v-slot="{row}">
					{{formatTime(row.InsertTime)}}
				</template>
			</el-table-column>
			<el-table-column label="操作"
				width="300">
				<template v-slot="{row}">
					<el-button size="mini" icon="el-icon-menu" @click="handleMenu(row.ID)">绑定菜单</el-button>
					<el-button size="mini" icon="el-icon-edit" @click="handleEdit(row.ID)" type="warning">修改</el-button>
					<el-button size="mini" @click="handleRemove(row.ID)" icon="el-icon-remove" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<Pangtion :page="page" @sizeChange="handleSizeChange"
			@currentChange="handleCurrentChange" />
	</div>

</template>

<script>
	import { mapState,mapActions } from 'vuex'
	import Pangtion from '../../../components/Pangtion.vue'
	export default{
		name:'role',
		components:{
			Pangtion
		},
		data(){
			return {
				queryForm:{
					Pno:1,
					Psize:10,
					Username:""
				},
				queryLoading:false
			}
		},
		computed:{
			...mapState('roleModel',['list','page']),
			formatTime(){
				return function(time){
					let d = new Date(time * 1000);
					return time?
					`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
					:""
				}
			}
		},
		async created(){
			await this.getListForPage(this.queryForm)
		},
		async activated(){
			await this.getListForPage(this.queryForm)
		},
		methods:{
			...mapActions('roleModel',['getListForPage','deleteById']),
			async handleClick(){
				this.queryLoading = true;
				this.queryForm.Pno = 1;
				await this.getListForPage(this.queryForm)
				this.queryLoading = false;
			},
			async handleSizeChange(psize){
				console.log("psize+++++++++++",psize);
				this.queryForm.Psize = psize
				this.queryForm.Pno = 1;
				await this.getListForPage(this.queryForm)
			},
			async handleCurrentChange(pno){
				console.log("pon----------",pno);
				this.queryForm.Pno = pno
				await this.getListForPage(this.queryForm)
			},
			handleAdd(){
				this.$router.push('/role-add')
			},
			async handleRemove(id){
				let confirm =await  this.$confirm('正在删除','提示',{
					type:'warning'
				}).catch(err => err)
				if(confirm == 'confirm'){
					await this.deleteById(id)
					await this.getListForPage(this.queryForm)
				}
			},
			handleEdit(id){
				this.$router.push({path:'/role-edit',query:{id}})
			},
			handleMenu(id){
				this.$router.push({path:'/role-menu',query:{id}})
			}
		}
	}
</script>

<style>
</style>
