<template>
	<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page.Pno"
			:page-size="page.Psize"
			 :page-sizes="pSizes?pSizes:[1, 5, 10, 20]"
			layout="total, sizes, prev, pager, next, jumper"
			:total="page.TotalElements">
		</el-pagination>
</template>

<script>
	export default{
		name:'Pangtion',
        props:['page','pSizes'],
		
        methods:{
            handleSizeChange(psize){
                this.$emit('sizeChange',psize)
            },
            handleCurrentChange(pno){
                this.$emit('currentChange',pno)
            }
        }
	}
</script>


