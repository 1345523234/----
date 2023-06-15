<template>
  <div>
    <el-page-header
      @back="$router.back()"
      content="编辑优惠券信息"
    ></el-page-header>
    <el-form ref="form" :model="editData" label-width="100px">
      <el-form-item label="订单编号" size="mini">
        {{ formData.orderNo }}
      </el-form-item>
      <el-form-item label="商品原价" size="mini"> 
          {{formData.singlePriceOld}}
      </el-form-item>
      <el-form-item label="商品售价" size="mini"> 
          {{formData.totalPrice}}
      </el-form-item>
      <el-form-item label="购买数量" size="mini">
        {{formData.num}}
      </el-form-item>
      <el-form-item label="订单金额" size="mini">
        {{formData.totalPrice}}
      </el-form-item>
      <el-form-item label="购买人" size="mini">
        {{formData.nickname}}
      </el-form-item>
      
      <el-form-item label="购买人电话" size="mini">
        {{formData.phone}}
      </el-form-item>
      <el-form-item label="订单状态" size="mini" prop="status">
                  <el-tag v-show="formData.status == 3" type="success">确认收货</el-tag>
                  <el-tag v-show ="formData.status == 2" type="warning">已发货</el-tag>
                  <el-tag v-show="formData.status == 1" type="">已支付</el-tag>
             
      </el-form-item>
      <el-form-item label="订单时间" size="mini" prop="insertTime">
        {{dayjs(formData.insertTime).format('YYYY-MM-DD hh:mm:ss')}}
      </el-form-item>
      <el-form-item  size="mini" label="订单编号">
        {{formData.postCode}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import dayjs from "dayjs";

export default {
  props: ["id"],
  data() {
    return {
      value: "",
      logo: "1",
      formData: {
        address: "",
        goodsId: "",
        id: "",
        insertTime: "",
        name: "",
        nickname: "",
        num: "",
        orderNo: "",
        password: "",
        phone: "",
        postCode: "",
        singlePrice: "",
        singlePriceOld: "",
        status: "",
        totalPrice: "",
        userId: "",
        zheKou: "",
      },
    };
  },
  //页面加载时获取到数据
  async mounted() {
    await this.getFindData(this.id);
    this.formData = this.editData;
  },
  methods: {
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
    ...mapState("order", ["editData"]),
    ...mapState("news", { newsList: "list" }),
  },
  components: {},
};
</script>

<style></style>
