<template>
  <div>
      <el-upload
  :action="upload.action"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="upload.limit"
  :on-exceed="handleExceed"
  :file-list="upload.fileList"
  :before-upload='beforeUpload'
    :headers="upload.headers">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </div>
</template>

<script>
export default {
    data(){
        	let token = sessionStorage.token;
        return{
            upload:{
                action:'http://localhost:8080/shop-service/v1/file/upload',
                //最大上传数量
                limit:3,
                fileList:[],
                headers: {'Authorization':'Bearer '+token}
            }
        }
    },
    methods:{
        //点击文件列表中已上传的文件时的钩子
        handlePreview(file){
        },
        //文件删除
        handleRemove(file, fileList){
            
        },
        //文件开始删除
        async beforeRemove(file, fileList){
           try{
            let {response:{data:{
                url:path
            }}} = file
           let {data:{code}} = await this.$http({
                url:'/file/delete',
                method:'GET',
                params:{
                    path
                }
            })
            if(code == 200){
                this.$message.success('删除成功')
            }else{
                this.$message.error('删除失败')
                return false
            }
            }catch(e){
            }
        },
        //文件上传超过最大数量
        handleExceed(files, fileList){

        },
        beforeUpload(file){
            let allImgeType = ['image/png','image/jpeg']
            if(!allImgeType.includes(file.type)){
                this.$message.error(`请上传${allImgeType.join('或')}格式图片`)
                return false
            }
            if(file.size > 512000){
                 this.$message.error(`请上传小于500kb的图片`)
                 return false
            }
           
        }
    }
}
</script>

<style>

</style>