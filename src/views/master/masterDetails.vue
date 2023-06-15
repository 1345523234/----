<template>
  <div>
    <el-page-header
      @back="$router.back()"
      :content="list.MasterName?`${list.MasterName}的信息`:'宠物信息'"
    ></el-page-header>
    <el-form ref="form" :model="list" label-width="100px">
      <el-form-item label="姓名:" size="mini">
        {{ list.MasterName?list.MasterName:"无" }}
      </el-form-item>
      <el-form-item label="身份证信息:" size="mini">
        {{ list.IdCard?list.IdCard:"无" }}
      </el-form-item>
      <el-form-item label="年龄:" size="mini">
        {{ list.Age?list.Age:"无" }}
      </el-form-item>
      <el-form-item label="性别:" size="mini">
        {{ list.Sex?list.Sex:"" }}kg
      </el-form-item>
      <el-form-item label="订单总数:" size="mini">
        <template> 
            {{orderInfo.length?orderInfo.length:"无"}}
        </template>
      </el-form-item>
     <el-form-item label="订单总价:" size="mini">
        <template> 
            {{totalAmount?totalAmount:0}}元
        </template>
      </el-form-item>
     
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";

export default {
    name:'masterDetails',
  data() {
    return {
      value: "",
      logo: "1",
      
    };
  },
  //页面加载时获取到数据
  async created() {
    await this.getMasterDetail(this.$route.query.id)
    // this.formData = this.editData;
    // console.log(this.list);
  },
  methods: {
    ...mapActions("master", ["getMasterDetail"]),
    ...mapActions("news", ["getList"]),
    ...mapActions("order", ["getFindData", "getUpdateData"]),
    dayjs,
    async imagesUpload(blobInfo, press) {
      let filename = blobInfo.filename;
      let blob = blobInfo.blob();
      let formData = new FormData();
      formData.append("file", blob, filename);
      formData.set("folder", dayjs().format("YYYY-MM-DD"));
      let {
        data: {
          code,
          data: { url },
          msg,
        },
      } = await this.$http({
        url: "file/upload",
        method: "post",
        data: formData,
      });
      if (code == 200) {
        press(url);
      }
    },
    //提交数据
    submit() {
      this.$refs.form.validate(async (valide) => {
        if (!valide) return false;
        let { code, msg } = await this.getUpdateData(this.formData);
        if (code == 200) {
          this.$message({
            type: "success",
            duration: 500,
            message: msg,
            onClose: () => {
              this.$router.back();
            },
          });
        }
      });
    },
  },
  computed: {
    ...mapState("master", ["orderInfo","masterInfo"]),
    list:function(){
        return this.masterInfo
    },
    totalAmount(){
        let sum = 0
        this.orderInfo?.forEach(val => {
            sum+=val.SinglePrice
        });
        return sum
    }
  },
  components: {},
};
</script>

<style></style>
