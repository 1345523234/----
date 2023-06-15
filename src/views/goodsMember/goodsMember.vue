<template>
  <div>
    <PageHeader title="商品" />
    <el-form ref="form" label-width="80px">
      <el-form-item label="商品名称:" style="width:280px;float:left">
        <el-input
          placeholder="请输入"
          size="mini"
          v-model="pageList.username"
          style="width:200px;"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="商品名称:"
        label-width="80px"
        style="width:280px;float:left"
      >
        <el-select
          v-model="value"
          placeholder="请选择"
          size="mini"
        >
          <el-option
          
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称:" style="width:280px;float:left">
        <el-select  placeholder="请选择" size="mini">
          <el-option value="在架">在架</el-option>
          <el-option value="下架">下架</el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left:-70px;float:left ">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-zoom-in"
          >查询</el-button
        >
        <el-button type="success" icon="el-icon-plus" size="mini"
        @click="$router.push({
            path:'/goods-add'
        })"  >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-table :data="list" border>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="face" label="头像">
        <template slot-scope="{ row }">
          <el-image
            style="width: 80px; height: 80px"
            :src="row.face"
            fit="fill"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="userTypeName" label="会员类型">
          <template slot-scope="{row}">
          <el-tag size="mini">{{row.userTypeName}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="prop" label="会员状态">
        <template slot-scope="{ row }">
          <el-tag size="mini"
          :type="row.freeze == '0'?'success':'danger'"
          >{{row.freeze == '0'?'正常':'冻结'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日"> 
          <template slot-scope="{row}">
              <!-- {{dayjs().format()}} -->
          </template>
      </el-table-column>
      <el-table-column prop="remark" label="商品说明"> </el-table-column>
      <el-table-column width="260px" label="操作">
        <template slot-scope="{ row }">
          <el-button
            :type="row.isOnSale == 1 ? 'danger' : 'success'"
            plain
            size="mini"
          >
            <!--  -->
            {{ row.isOnSale == 1 ? "下架" : "上架" }}
          </el-button>
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-remove"
            :style="{ display: row.isOnSale == 1 ? 'none' : 'inline-block' }"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="pageList.pno"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="pageList.psize"
      layout="total, sizes, prev, pager, next, jumper"
      
    >
    </el-pagination>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import PageHeader from "@/components/PageHeader.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "goods",
  data() {
    return {
      sel: "",
      value: "",
      pageList: {
        pno: 1,
        psize: 5,
        //下面三个是搜索用的
        username:'',
        phone:"",
        freeze:'',
        beginTime:'',
        endTime:'',
        hasCard:''
      },
    };
  },
  async mounted() {
    await this.getGoodsMemderPage(this.pageList);
    await this.getGoodsType();
  },
  methods: {
    // ...mapActions("goods", ["getPageList", "getOnSale", "getGoodsType"]),
    ...mapActions('goodsMender',['getGoodsMemderPage']),
    dayjs,
  },
  computed: {
    // ...mapState("goods", ["list", "pageInfo", "goodsTypeList"]),
    ...mapState('goodsMender',['list']),
  },
  components: {
    PageHeader,
  },
};
</script>

<style></style>
