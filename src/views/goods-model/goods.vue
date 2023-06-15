<template>
  <div>
    <PageHeader title="药品" />
    <el-form ref="form" label-width="80px">
      <el-form-item label="药品名称:" style="width:280px;float:left">
        <el-input
          placeholder="请输入"
          size="mini"
          v-model="pageList.Name"
          style="width:200px;"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="药品类型:"
        label-width="80px"
        style="width:280px;float:left"
      >
        <el-select
          v-model="value"
          placeholder="请选择"
          size="mini"
          @change="hadler"
        >
          <el-option
            v-for="(item, index) in typeIdOrName"
            :key="index"
            :value="index"
          >
          {{item}}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="药品状态:" style="width:280px;float:left">
        <el-select v-model="sel" placeholder="请选择" size="mini" 
        @change="handsel">
          <el-option value="在架">上架</el-option>
          <el-option value="下架">下架</el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:-70px;float:left ">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-zoom-in"
          @click="search"
          >查询</el-button
        >
        <el-button type="success" icon="el-icon-plus" size="mini"
        @click="$
        
        
        
        
        
        
        
        r.push({
            path:'/goods-add'
        })"  >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="list" border size="medium" >
      <el-table-column prop="Name" label="药品名称"> </el-table-column>
      <el-table-column prop="Price" label="药品价格"> </el-table-column>
      <el-table-column prop="WarehouseInfo" label="所属仓库"> </el-table-column>
      <!-- <el-table-column prop="Logo" label="药品logo">
        <template slot-scope="{ row }">
          <el-image
            style="width: 80px; height: 80px"
            :src="row.Logo"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column> -->
      <el-table-column prop="Price" label="药品状态">
        <template slot-scope="{ row }">
          <el-tag
            size="mini"
            :type="row.IsOnSale == 1 ? 'success' : 'danger'"
            >{{ row.IsOnSale == 1 ? "上架" : "下架" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="药品类型">
        <template slot-scope="{ row }">
          <el-tag size="mini">{{ typeIdOrName[row.GoodsTypeId] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Count" label="药品库存"> </el-table-column>
      <el-table-column prop="Remark" label="药品说明" show-overflow-tooltip> </el-table-column>
      <el-table-column width="260px" label="操作">
        <template slot-scope="{ row }">
          <el-button
            :type="row.IsOnSale == 1 ? 'danger' : 'success'"
            plain
            size="mini"
            @click="onSale(row)"
          >
            <!--  -->
            {{ row.IsOnSale == 1 ? "下架" : "上架" }}
          </el-button>
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="
              $router.push({
                path: '/goods-edit',
                query: {
                  id: row.ID,
                },
              })
            "
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-remove"
            :style="{ display: row.IsOnSale == 1 ? 'none' : 'inline-block' }"
            @click="delGoodsId(row.ID)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pangtion :page="pageInfo" @sizeChange="handleSizeChange"
			@currentChange="handleCurrentChange" />
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import Pangtion from '../../components/Pangtion.vue'
import { mapActions, mapState } from "vuex";
import LoginVue from '../Login.vue';
export default {
  name: "goods",
   
  data() {
    return {
      sel: "",
      value: "",
      pageList: {
        Pno: 1,
        Psize: 5,
        //下面三个是搜索用的
        Name: "",
        IsOnSale:"",
        GoodsTypeId: "",
      },
    };
  },
  
  async created() {
    await this.getPageInfo();
    await this.getGoodsType();
    
  },
  
  methods: {
    ...mapActions("goods", ["getPageList", "getOnSale", "getGoodsType","delGoods"]),
   
    async getPageInfo() {
      await this.getPageList(this.pageList);
    },
    handleSizeChange(pageSize) {
      this.pageList.Psize = pageSize;
      this.getPageInfo();
    },
    handleCurrentChange(page) {
      this.pageList.Pno = page;
      this.getPageInfo();
    },
    search() {
      this.getPageInfo();
      this.del = "";
      this.pageList.Name = "";
      this.pageList.GoodsTypeId = "";
      this.value =""
    },
    async onSale(row) {
      console.log(row);
      this.$confirm(
        `此操作将${row.isOnSale == "0" ? "上架" : "下架"}该文件, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let isOnSale = row.IsOnSale == 1 ? 0 : 1;
          await this.getOnSale({ id: row.ID, isOnSale });
          await this.getPageInfo();
          this.$message({
            type: "success",
            message: row.isOnSale == "0" ? "上架成功" : "下架成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
    hadler(id) {
      this.pageList.GoodsTypeId = id;
    },
    handsel(value){
      this.pageList.IsOnSale = value =="在架"?1:0 
    },
    async delGoodsId(id){
     
      let confirm =await  this.$confirm('正在删除','提示',{
					type:'warning'
				}).catch(err => err)
        
				if(confirm == 'confirm'){
					 await this.delGoods(id)
      await this.getPageInfo()
				}
    }
  },
  computed: {
    ...mapState("goods", ["list", "pageInfo", "goodsTypeList"]),
    
    typeIdOrName() {
      let arr = {};
      for (let i = 0; i < this.goodsTypeList.length; i++) {
        arr[this.goodsTypeList[i].ID] = this.goodsTypeList[i].Name;
      }
      return arr;
    },
  },
  components: {
    PageHeader,
    Pangtion
  },
};
</script>

<style></style>
