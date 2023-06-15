<template>
  <div>
    <el-page-header @back="$router.back()" content="编辑药品信息">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称" prop="name" size="mini">
        <el-input v-model="form.Name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="name" size="mini">
        <el-input v-model="form.Price"></el-input>
      </el-form-item>
      <el-form-item label="商品折扣" prop="name" size="mini">
        <el-input v-model="form.ZheKou"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="name" size="mini">
        <el-input v-model="form.Count"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="name" size="mini">
        <el-select v-model="value" placeholder="请选择" @change="selValue">
          <el-option
            v-for="item in goodsTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.Name"
          >
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="仓库名称" prop="name" size="mini">
        <el-select v-model="warehouse" placeholder="请选择" @change="selWarehouse">
          <el-option
            v-for="item in warehouseAll"
            :key="item.ID"
            :value="item.WarehouseName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品Logo" prop="name" size="mini">
        <el-upload
          :action="url"
          list-type="picture-card"
          :limit="1"
          :file-list="logo"
          :on-remove="onRem1"
          :on-success="onSuccess1"
          :headers="headers"
          :on-progress='onProgress'
          :on-exceed = 'onExceed'
        >
          <!-- :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" -->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          :action="url"
          list-type="picture-card"
          :headers="headers"
          :limit="3"
          :file-list="imageList"
          :on-remove="onRem"
          :before-remove="beforeRemove"
          :on-success="onSuccess"
          :on-preview ='onPreview'
          
        >
          <!-- :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" -->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.Description"></el-input>
      </el-form-item>
      <el-form-item label="商品状态">
         <el-radio-group v-model="form.IsOnSale">
      <el-radio-button label="1">在架</el-radio-button>
      <el-radio-button label="0">下架</el-radio-button>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="商品备注">
        <el-input v-model="form.Remark"></el-input>
      </el-form-item>
      <el-form-item>
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="submitData"
            >提交</el-button
          >
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["id"],
  data() {
    let token = sessionStorage.token;
    
    return {
       warehouse:"",
      form: {},
      dialogVisible: false,
      url: "http://localhost:8080/shop-service/v1/file/upload",
      value: "",
      logo: [],
      logos :[],
      imageList: [],
      imageListZui:[],
      headers: { Authorization: "Bearer " + token },

    };
  },
  async created() {
    await this.getIdShop(this.$route.query.id);
    await this.getGoodsType();
    this.form = this.goodsEditList;
    await this.getWarehouseInfoAll()
    this.value = this.goodsTypeList.GoodsTypeName
    try {
      this.form.pics.forEach((value) => {
        this.imageList.push({ url: value });
      });
      this.imageListZui = this.imageList
    } catch (e) {}
    if(!this.form.logo) this.logo = []
    else this.logo = [{ url: this.form.logo }];
    
  },
  methods: {
    ...mapActions("goods", ["getIdShop", "getGoodsType", "getUpDate"]),
      ...mapActions("warehouseInfo", ["getWarehouseInfoAll"]),
     selWarehouse(val){
        console.log(this.warehouseNameOrID[val]);
        this.form.WarehouseInfo = val
        this.form.WarehouseInfoID=this.warehouseNameOrID[val]
      },
    async beforeRemove(file, fileList) {
      let res = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        let res = await this.$http({
          url: "/file/delete",
          method: "GET",
          params: {
            path: file.url,
          },
        })
       
      })
       this.imageListZui = this.imageListZui.filter(url=> file!=url)
      return false;
    },
    selValue() {
      this.form.goodsTypeId = this.typeIdOrName[this.value];
    },
    onPreview(file){
        console.log(file);
    },
    onProgress(event,file,fileList){
       
    },
    onExceed(file,fileList){
    },
    async onSuccess(response, file, fileList) {
        let {data:{url}} = response
        this.imageListZui.push({url})
    },
    onRem(file, fileList) {
      this.imageListZui = fileList;
    },
    onRem1() {
      this.logos = [];
    },
    onSuccess1(response, file, fileList) {
        console.log(response);
      let {
        data: { url },
      } = response;
      console.log(url);
      this.logos.push({url})
    },
    async submitData() {
      let data = this.form;
      data.pics = [];
      this.imageListZui.forEach((value) => {
        data.pics.push(value.url);
      });
      if(this.logos.length)
      data.logo = this.logos[0].url || ''
      else data.logo = this.logo.url || ''
      console.log(data);
      let { msg, code } = await this.getUpDate(data);
      if (code == 200) {
        this.$message.success(msg);
        this.$router.push('goods');
      } else {
        this.$message.error(msg);
      }
    },
  },
  computed: {
    ...mapState("goods", ["goodsEditList", "goodsTypeList"]),
     ...mapState("warehouseInfo", ["warehouseAll"]),
    typeIdOrName() {
      let arr = {};
      for (let i = 0; i < this.goodsTypeList.length; i++) {
        arr[this.goodsTypeList[i].name] = this.goodsTypeList[i].id;
      }
      return arr;
    },
  },
};
</script>

<style></style>
