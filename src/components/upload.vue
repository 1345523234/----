<template>
  <div>
    <el-upload
    :action="url"
    :headers="headers"
  list-type="picture-card"
  :file-list="imageList"
  :limit="limit"
  :on-success='onSuccess'
  :on-remove='onRemove'
  :before-remove='beforeRemove'
  
  >
  <i class="el-icon-plus"></i>
</el-upload>

<!-- <el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog> -->
  </div>
</template>

<script>
export default {
    name:'upload',
    props:['limit','fileList'],
    data(){
        let token = sessionStorage.token;
        return{
            url: "http://localhost:8080/shop-service/v1/file/upload",
            headers: { Authorization: "Bearer " + token },
            imageList:[],
            updateImageList:[]
        }
    },
    async mounted(){
    },
    methods:{
        //上传成功
        onSuccess(response, file, fileList){
            let {data:{url}} = response
            this.updateImageList.push({url})
            this.$bus.$emit('msg',this.updateImageList)
        },
        //删除成功
        onRemove(file, fileList){
            let url=''
            if(file.response){
                url = file.response.data.url
            }else{
                 url = file.url
            }
           
          this.updateImageList = this.updateImageList.filter(value=>value.url!=url)
            this.$bus.$emit('msg',this.updateImageList)

        },
        //删除之前
          async beforeRemove(file, fileList) {
          let url=''
            if(file.response){
                url = file.response.data.url
            }else{
                 url = file.url
            }
      let res = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        await this.$http({
          url: "/file/delete",
          method: "GET",
          params: {
            path:url,
          },
        })
        this.$message.success('删除成功')
      })
    },
   
    },
    watch:{
        fileList:function(newval,oldval){
            if(newval[0].url&&oldval[0].url &&this.imageList.length == 0&&this.updateImageList.length ==0){
                 this.imageList = newval
                 this.updateImageList = newval
                 this.$bus.$emit('msg',this.updateImageList)
            }
            
            
        }
    }
}
</script>

<style>

</style>