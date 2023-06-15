<template>
  <div>
    <el-page-header
      @back="$router.back()"
      content="编辑优惠券信息"
    ></el-page-header>
    <el-form ref="form" :model="editData" label-width="100px" :rules="rules">
      <el-form-item label="新闻名称" size="mini" prop="name">
        <el-input v-model="formData.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="新闻类型"  size="mini">
              <el-select v-model="formData.newsTypeId" placeholder="请选择">
                <el-option
                  v-for="item in newsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
      <el-form-item label="新闻logo" size="mini">
        <Upload :limit='3'
          :fileList='[{url:formData.logo}]'
        ></Upload>
      </el-form-item>
      <el-form-item label="新闻描述" size="mini">
         <el-input v-model="formData.description" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容"  prop="remark">
        
<editor
        api-key='3cr6x1lr3nfdban9i3sbnst900n3lgszueiuc9fbz204dxlc'
        :init="{
        plugins: 'lists link image table code help wordcount',
        language:'zh-Hans',
        language_url: '/tinymce/langs/zh-Hans.js',
         selector: 'textarea',
         height:'500px',
         images_upload_handler:this.imagesUpload,
         relative_urls:false,
		      remove_script_host:true
      }"
      v-model="formData.content"
       />
      </el-form-item>
      <el-form-item>
          <el-button type="primary" size="small" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { mapActions, mapState } from "vuex";
import dayjs from 'dayjs'
import Upload from '@/components/upload.vue'
export default {
  props: ["id"],
  data() {
    return {
      value:'',
      logo:'1',
      formData: {
         name: "",
        content: "",
        logo: "",
        description: "",
        newsTypeId: '',
      },
      rules:{
                name:[
                    {required:true,message:'请输入优惠券名称',trigger:'blur'}
                ],
                price:[
                    {required:true,message:'请输入优惠券名称',trigger:'blur'}
                ],
            }
    };
  },
  //页面加载时获取到数据
  async mounted() {
    await this.getFindData(this.id);
    this.formData = this.editData
    this.formData.targetTime = dayjs(this.formData.targetTime * 1).format('YYYY-MM-DD hh:mm:ss')
    await this.getList()
    this.$bus.$on('msg',(data)=>{
      if(data.length > 0){
        this.formData.logo = data[0].url
      }else{
          this.formData.logo =''
        }
        })
  },
  methods: {
     ...mapActions('news',['getList']),
    ...mapActions("newsModel", ["getFindData",'getUpdateData']),
    dayjs,
    async imagesUpload(blobInfo,press){
     
      let filename = blobInfo.filename
      let blob = blobInfo.blob()
      let formData = new FormData()
      formData.append('file',blob,filename)
      formData.set('folder',dayjs().format('YYYY-MM-DD'))
      let {data:{code,data:{url},msg}} = await this.$http({
        url:'file/upload',
        method:'post',
        data:formData
      })
      if(code == 200){
        press(url)
      }
    },
    //提交数据
    submit(){
        this.$refs.form.validate(async valide=>{
            if(!valide) return false
           let {code,msg}  = await this.getUpdateData(this.formData)
             if(code == 200){
               this.$message({
                   type:'success',
                   duration:500,
                   message:msg,
                   onClose:()=>{
                       this.$router.back()
                   }
               })
           }
        })
        
    }
  },
  computed: {
    ...mapState("newsModel", ["editData"]),
     ...mapState('news',{newsList:'list'}),
  },
  components:{
    Upload,
     'editor': Editor
  }
};
</script>

<style></style>
