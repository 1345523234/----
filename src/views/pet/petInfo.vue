<template>
  <div>
    <el-page-header
      @back="$router.back()"
      :content="list.PetName?`${list.PetName}的信息`:'宠物信息'"
    ></el-page-header>
    <el-form ref="form" :model="list" label-width="100px">
      <el-form-item label="宠物名字：" size="mini">
        {{ list.PetName?list.PetName:"无" }}
      </el-form-item>
      <el-form-item label="宠物类型：" size="mini">
        {{ list.PetInfoType?list.PetInfoType:"无" }}
      </el-form-item>
      <el-form-item label="品种：" size="mini">
        {{ list.PetVarieties?list.PetVarieties:"无" }}
      </el-form-item>
      <el-form-item label="宠物体重：" size="mini">
        {{ list.PetInfoWeight?list.PetInfoWeight:0 }}kg
      </el-form-item>
      <el-form-item label="宠物年龄：" size="mini">
        {{ list.PetInfoAge?list.PetInfoAge:0 }}岁
      </el-form-item>
      <el-form-item label="病情明细：" size="mini">
        {{ list.PetInfoDisease?list.PetInfoDisease:"无" }}
      </el-form-item>
      <el-form-item label="用药类型：" size="mini">
        {{ list.GoodType?list.GoodType:"无" }}
      </el-form-item>
      <el-form-item label="用药信息：" size="mini">
        {{ list.DrugName?list.DrugName:"无" }}
      </el-form-item>
       <el-form-item label="主治医师" size="mini">
        {{ list.Doctor?list.Doctor:"已离职" }}
      </el-form-item>
      <el-form-item label="医师职务" size="mini">
        {{ list.RoleType?list.RoleType:"无" }}
      </el-form-item>
     
     
      <el-form-item label="挂号时间：" size="mini" prop="InsertTime">
        {{dayjs(order.InsertTime * 1000).format('YYYY-MM-DD hh:mm:ss')}}
      </el-form-item>
     
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";

export default {
    name:'petInfo',
  data() {
    return {
      value: "",
      logo: "1",
      
    };
  },
  //页面加载时获取到数据
  async created() {
    await this.getPetInfo(this.$route.query.id)
    this.formData = this.editData;
    console.log(this.list);
  },
  methods: {
    ...mapActions("pet", ["getPetInfo"]),
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
    ...mapState("pet", ["order","petInfo"]),
    list(){
      return {...this.order,...this.petInfo}
    }
  },
  components: {},
};
</script>

<style></style>
