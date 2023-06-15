<template>
  <div>
    <el-page-header @back="$router.back()" content="编辑药品信息">
    </el-page-header>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称" prop="name" size="mini">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="name" size="mini">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品折扣" prop="name" size="mini">
        <el-input v-model="form.zheKou"></el-input>
      </el-form-item>
      <el-form-item label="商品库存" prop="name" size="mini">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="name" size="mini">
        <el-select v-model="value" placeholder="请选择" @change="selValue">
          <el-option
            v-for="item in goodsTypeList"
            :key="item.ID"
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
        <el-form-item label="仓库剩余存量" prop="name" size="mini">
          <span>{{sum}}</span>
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
        >
          <!-- :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove" -->
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="商品状态">
         <el-radio-group v-model="form.isOnSale">
      <el-radio-button label="1">在架</el-radio-button>
      <el-radio-button label="0">下架</el-radio-button>
    </el-radio-group>
      </el-form-item>
      <el-form-item label="商品备注">
        <el-input v-model="form.remark"></el-input>
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
      sum:0,
        form: {
          name:'',
          price:'',
          zheKou:'',
          goodsTypeId:'',
          count:'',
          isOnSale:'0',
          logo:"",
          pics:[],
          description:'',
          remark:'',
          warehouseInfo:"",
          warehouseInfoID:""
      },
      dialogVisible: false,
      url: "http://localhost:8080/shop-service/v1/file/upload",
      value: "",
      logo: [],
      imageList: [],
      headers: { Authorization: "Bearer " + token },
    };
  },
  async mounted() {
    await this.getGoodsType();
     await this.getWarehouseInfoAll()
    let arr = this.warehouseAll.filter(val =>val.WarehouseTypeStockIng - val.WarehouseTypeStock < 0)
    this.warehouseAll.length = 0
    arr.forEach((val,index)=>{
      
      this.$set(this.warehouseAll,index,val)
    })
  },
  methods: {
    ...mapActions("goods", [ "getGoodsType", "getGoodsInsert"]),
      ...mapActions("warehouseInfo", ["getWarehouseInfoAll"]),
      selWarehouse(val){
        this.form.warehouseInfo = val
        this.form.warehouseInfoID=this.warehouseNameOrID[val]
      
        this.warehouseAll.forEach(val => {
          if(val.ID == this.form.warehouseInfoID ){
            this.sum = val.WarehouseTypeStock - val.WarehouseTypeStockIng
          }
        });
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
        });
        this.form.pics.splice(fileList.indexOf(file),1)
      });
      return false;
    },
    selValue() {
      this.form.goodsTypeId = this.typeIdOrName[this.value];
    },
    onSuccess(response, file, fileList) {
        let {data:{url}} = response
        console.log(url);
        this.form.pics.push(url)
    },
    onRem(file, fileList) {
    //   this.form.pics = fileList;

    },
    onRem1() {
      this.logo = [];
    },
    onSuccess1(response, file, fileList) {
      let {
        data: { url },
      } = response;
      console.log(url);
      this.form.logo = url;
    console.log(response);
    },
    async submitData() {
        console.log(this.form);
        let { msg, code } = await this.getGoodsInsert(this.form)
        if (code == 200) {
        this.$message.success(msg);
        this.$router.back();
      } else {
        this.$message.error(msg);
     }
     },
  },
  computed: {
    ...mapState("goods", [ "goodsTypeList"]),
     ...mapState("warehouseInfo", ["warehouseAll"]),
    typeIdOrName() {
      let arr = {};
      for (let i = 0; i < this.goodsTypeList.length; i++) {
        arr[this.goodsTypeList[i].Name] = this.goodsTypeList[i].ID;
      }
      return arr;
    },
    warehouseNameOrID() {
      let arr = {};
      for (let i = 0; i < this.warehouseAll.length; i++) {
        arr[this.warehouseAll[i].WarehouseName] = this.warehouseAll[i].ID;
      }
      return arr;
    },
  },
};
</script>

<style></style>
