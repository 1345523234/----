<template>
  <div>
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="国家">
        <el-input v-model="formData.Nation" readonly size="mini"></el-input>
      </el-form-item>
      <el-form-item label="省">
        <el-input v-model="formData.Province" readonly size="mini"></el-input>
      </el-form-item>
      <el-form-item label="市">
        <el-input v-model="formData.City" readonly size="mini"></el-input>
      </el-form-item>
      <el-form-item label="区">
        <el-input v-model="formData.District" readonly size="mini"></el-input>
      </el-form-item>
      <el-form-item label="精度">
        <el-input v-model="formData.Lat" readonly size="mini"></el-input>
      </el-form-item>
      <el-form-item label="维度">
        <el-input v-model="formData.Lng" readonly size="mini"></el-input>
      </el-form-item>
      <el-form-item label="考勤范围(KM)">
        <el-input-number
          v-model="formData.R"
          controls-position="right"
          :min="1"
          :max="10"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="上班时间">
        <el-time-select
          placeholder="起始时间"
          v-model="formData.BeginTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="下班时间">
        <el-time-select
          placeholder="起始时间"
          v-model="formData.EndTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
          }"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateData">设置</el-button>
      </el-form-item>
    </el-form>
    <div id="map"></div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
        center:'',
        map:'',
         marker:null,
         circle:null,
      formData: {
        // id: "",
        // nation: "",
        // province: "",
        // city: "",
        // district: "",
        // lat: '',
        // lng: '',
        // r: 0,
        // street: "",
        // street_number: "",
        // beginTime: "",
        // endTime: "",
      },
    };
  },
  async mounted(){
     await this.getList()
      this.formData = this.list[0]
    
     this.initMap()
     this.initMark()
     this.initCricle()
  },
  methods:{
    ...mapActions('checkScope',['getList','update']),
      //创建地图
      initMap(){
          let center = new TMap.LatLng(this.formData.Lat, this.formData.Lng)
           this.map = new TMap.Map("map", {
                rotation: 20,//设置地图旋转角度
                // pitch:30, //设置俯仰角度（0~45）
                zoom:12,//设置地图缩放级别
                center: center//设置地图中心点坐标
            }),
            this.map.on("click",this.getcod)

      },
      //设置标记点
      initMark(){
          if ( this.marker) return false
          let center = new TMap.LatLng(this.formData.Lat, this.formData.Lng)
          this.marker = new TMap.MultiMarker({
            map: this.map, //指定点标记图层所覆盖的地图容器
            // 设置点标记数据
            geometries: [{
        id: 'demo',//指定点标记id
        position: center// 标记位置(经度，纬度，高度)
    }],
});
      },
      //移除标记点
       removeMarker() {
            if ( this.marker) {
                this.marker.setMap(null);
                this.marker = null;
            }
        },
      //设置圆形范围
      initCricle(){
        let center = new TMap.LatLng(this.formData.Lat, this.formData.Lng)
        this.circle = new TMap.MultiCircle({
        map:this.map,
        styles: { // 设置圆形样式
          'circle': new TMap.CircleStyle({
          'color': 'rgba(41,91,255,0.16)',
          'showBorder': true,
          'borderColor': 'rgba(41,91,255,1)',
          'borderWidth': 2,
        }),
      },
      geometries: [{
        styleId: 'circle',
        center: center,
        radius: this.usrR,
      }],
    });
      },
       //删除圆
       removeCricle() {
            if ( this.circle) {
                this.circle.setMap(null);
                this.circle = null;
            }
        },
        //利用JSONP请求回该坐标点数据
        jsonp(url){
          return new Promise((resolve,reject)=>{
            window.josnpCallback = (data)=>{
              
              resolve(data)
            }
            let script = document.querySelector('#josnp')
            if(script){
             script.remove()
            }
            script = document.createElement('script')
            script.setAttribute('id','josnp')
            script.setAttribute('src',url)
            document.body.appendChild(script)
          })
        },
      //点击获取坐标
      async getcod(evt){
                 this.formData.Lat = evt.latLng.getLat().toFixed(6);
                this.formData.Lng = evt.latLng.getLng().toFixed(6);
                this.removeMarker()
                this.initMark()
                this.removeCricle()
                this.initCricle()  
                let url = `https://apis.map.qq.com/ws/geocoder/v1/?key=R6RBZ-EQL6D-WXH4R-PPFZM-RA6BQ-QCFC5&location=${this.formData.Lat},${this.formData.Lng}&output=jsonp&zoom=10&callback=josnpCallback`
                // https://apis.map.qq.com/ws/geocoder/v1/?key=R6RBZ-EQL6D-WXH4R-PPFZM-RA6BQ-QCFC5&location=45,126&output=jsonp
                let {result:{address_component}}  = await this.jsonp(url)
                console.log(url,"===");
                // console.log(url,"===");
                console.log(address_component);
                this.formData.City =address_component.city 
                this.formData.Nation =address_component.nation 
                this.formData.Province =address_component.province?address_component.province:address_component.ad_level_1
                this.formData.District =address_component.district?address_component.district:address_component.ad_level_2
                this.formData.Street =address_component.street?address_component.street:address_component.ad_level_3
                this.formData.StreetNumber =address_component.street_number?address_component.street_number:address_component.locality
               
      },
      async updateData(){
       let{msg,code} =  await this.update(this.formData)
      if(code == 200){
        this.$message.success(msg)
      }
      }
  },
  computed:{
    ...mapState('checkScope',['list']),
      usrR(){
          return this.formData.R?this.formData.R *1000:0
      }
  },
  watch:{
        usrR:{
          handler(){
            
                this.removeCricle()
              this.initCricle()
            
         
                
          }
      }
  }
};
</script>

<style scoped>
#map {
  border: 1px solid rgb(189, 182, 182);
  height: 600px;
  width: 100%;
}
</style>
