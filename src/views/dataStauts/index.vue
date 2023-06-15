<template>
<div>
<div>
   <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>平台信息数据统计</span>
  </div>
  <div id="flexDiv">
    <div>
     <svg t="1681808110574" class="icon" 
      viewBox="0 0 1024 1024" version="1.1" 
      xmlns="http://www.w3.org/2000/svg" p-id="37180" 
      width="60" height="60" style="display:inline">
      <path d="M682.666667 212.309333h-8.192a68.266667 68.266667 0 0 0-68.266667-61.781333h-188.416a68.266667 68.266667 0 0 0-68.266667 61.781333H341.333333a136.533333 136.533333 0 0 0-136.533333 136.533334v388.096a136.533333 136.533333 0 0 0 136.533333 136.533333h341.333334a136.533333 136.533333 0 0 0 136.533333-136.533333V348.842667a136.533333 136.533333 0 0 0-136.533333-136.533334z m-230.4 433.493334h-68.266667a36.181333 36.181333 0 0 1 0-72.021334h68.266667a36.181333 36.181333 0 0 1 0 72.021334z m102.4-144.384h-170.666667a36.181333 36.181333 0 0 1 0-72.362667h170.666667a36.181333 36.181333 0 0 1 0 72.362667z" fill="#FF3741" p-id="37181">
        </path>
        </svg>
        <p>订单总数<span>{{data.OrderLen}}</span></p> 
        
    </div>
    <div>
        <svg t="1681808394379" class="icon" viewBox="0 0 1024 1024" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" p-id="3509" 
    width="60" height="60"><path d="M393.1136 364.5952m-39.0656 0a39.0656 39.0656 0 1 0 78.1312 0 39.0656 39.0656 0 1 0-78.1312 0Z" fill="#FF6C39" p-id="3510"></path><path d="M634.9824 365.4656m-39.0656 0a39.0656 39.0656 0 1 0 78.1312 0 39.0656 39.0656 0 1 0-78.1312 0Z" fill="#FF6C39" p-id="3511"></path><path d="M406.1184 604.7232a30.7712 30.7712 0 0 0-26.3168 34.56 30.70464 30.70464 0 0 0 30.4128 26.5728c1.3824 0 2.7648-0.1024 4.1984-0.3072 48.9984-6.656 80.1792-26.8288 99.584-50.7392 28.7744 35.072 71.168 49.2544 99.072 51.6096 0.8704 0.0512 1.7408 0.1024 2.6112 0.1024 15.7184 0 28.9792-11.9808 30.464-27.904 1.536-16.7936-10.8544-31.744-27.648-33.3824-12.3392-1.2288-72.0384-10.9056-74.0864-81.7664a50.09408 50.09408 0 0 0 21.1456-40.9088c0-27.7504-22.528-50.2784-50.2784-50.2784s-50.2784 22.528-50.2784 50.2784c0 14.7968 6.4512 28.0576 16.5888 37.2736-0.1024 1.8432-0.0512 3.7376 0.2048 5.632 0.9216 7.0144 6.7072 68.0448-75.6736 79.2576z" fill="#FF6C39" p-id="3512"></path><path d="M965.0688 510.2592c-61.3376-243.3536-184.4736-345.8048-280.6272-388.864a283.06432 283.06432 0 0 0-149.9136-42.8032h-40.8064c-51.1488 0-99.1232 13.6192-140.6976 37.3248-84.992 34.4064-227.072 130.304-293.5808 394.3424-1.8944 7.5776-22.6816 96.6144 31.744 143.0016 18.1248 15.4624 41.2672 23.1424 69.2736 23.1424 24.7296 0 53.3504-6.0928 85.5552-18.176 14.5408 25.5488 32.8192 48.5888 54.2208 68.4544L268.288 826.368c-6.4512 20.0704-2.8672 42.24 9.5744 59.2896s32.4096 27.2384 53.504 27.2384h354.0992c21.0944 0 41.1136-10.1888 53.504-27.1872s16.0256-39.2192 9.5744-59.2896l-29.4912-91.8528c24.832-21.1968 46.0288-46.6432 62.4128-75.1104 30.976 11.3152 58.5216 17.0496 82.5344 17.0496 28.1088 0 51.3536-7.7824 69.5296-23.3472 54.1696-46.5408 33.4336-135.3728 31.5392-142.8992zM131.072 606.464c-20.8384-17.7664-16.128-66.048-12.1856-80.6912l0.1536-0.512c24.064-95.5904 58.4192-166.3488 95.6416-218.8288-3.7376 18.432-5.7344 37.4272-5.7344 56.9344V517.9392c0 29.184 4.4544 57.3952 12.6464 83.9168-43.1104 15.6672-75.4176 17.5104-90.5216 4.608z m160.7168 6.8608c-0.4096-2.4064-1.1264-4.7616-2.1504-7.0656a225.09056 225.09056 0 0 1-19.3024-91.5456V366.592c0-82.5856 45.0048-158.72 117.504-198.6048 2.2016-1.1776 4.1472-2.6624 5.888-4.2496a222.1568 222.1568 0 0 1 99.9424-23.7056h40.8064c38.8096 0 75.264 9.9328 107.1104 27.4432 1.7408 1.6896 3.584 3.2768 5.7344 4.5568 69.1712 41.3696 110.4896 114.1248 110.4896 194.56v148.1216c0 32.2048-6.7072 63.4368-19.8656 92.7232-1.024 2.304-1.7408 4.7616-2.2016 7.2192-36.096 74.8544-112.7424 126.6176-201.2672 126.6176h-40.8064c-89.0368 0-166.0416-52.4288-201.8816-127.9488z m398.2848 231.7824c0.512 1.536 0.256 2.9696-0.7168 4.3008s-2.2528 1.9968-3.8912 1.9968H331.3664c-1.6384 0-2.9184-0.6656-3.8912-1.9968s-1.1776-2.7648-0.7168-4.3008l25.7024-80.0768a282.84928 282.84928 0 0 0 141.2096 37.632h40.8064c47.4624 0 92.2112-11.7248 131.584-32.3584l24.0128 74.8032z m203.4688-238.6944c-14.6944 12.5952-45.824 11.2128-87.2448-3.3792a283.6224 283.6224 0 0 0 13.0048-85.1456V363.3664c0-17.4592-1.6384-34.5088-4.7104-51.1488 35.6864 52.224 67.84 121.3952 90.9312 213.0432l0.1536 0.512c3.8912 14.592 8.6016 62.8736-12.1344 80.64z" fill="#FF6C39" p-id="3513"></path>
    </svg>
    <p style="margin-left:10px">宠物总数<br/><span>{{data.PetLen}}</span></p> 
    </div>
    <div>
      <svg t="1681808453060" class="icon" viewBox="0 0 1024 1024"
       version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1847"
        width="60" height="60"><path d="M194.56 915.968v-2.048c0.512-5.12 1.536-10.24 2.048-15.36 2.048-18.432 2.56-36.864 5.632-54.784 4.608-31.232 23.04-56.32 37.376-82.944 2.56-5.12 9.728-8.704 15.36-11.776 16.896-10.24 34.304-20.48 51.2-30.72-8.192-28.16-0.512-41.984 27.648-49.664 13.312-4.096 27.136-7.168 40.448-10.752-0.512-1.536-0.512-2.048-1.024-2.56-39.936-34.304-63.488-78.336-73.728-129.536-0.512-3.072-4.608-7.168-7.68-8.704-21.504-10.752-33.792-28.16-37.888-51.2-3.072-16.384-5.12-32.256-7.68-48.64-4.608-31.744 11.264-50.688 42.496-49.152 0.512-0.512 1.024-1.024 1.024-1.536 0-2.56 0-5.12 0.512-7.68 0.512-39.936 4.608-79.36 19.456-117.248 20.48-51.712 54.272-90.624 108.032-109.568 4.096-1.536 8.704-2.048 13.312-3.584-0.512 6.656-0.512 11.776-1.024 18.432 41.984-27.648 87.04-36.864 135.68-38.4-4.608 9.216-8.192 17.408-11.264 24.064 19.456 2.56 37.888 4.608 56.32 7.168v3.072c-5.12 4.096-9.728 8.192-13.312 10.752 18.432 12.8 37.888 24.576 54.784 38.4 19.456 15.872 32.768 36.864 33.792 62.464 1.024 28.672 0 57.856-0.512 87.04 0 9.216-1.024 17.92-1.536 27.136 28.672-2.048 42.496 8.192 41.984 35.328-0.512 25.088-5.12 50.176-10.24 74.752-3.584 16.384-15.36 29.184-31.232 36.352-7.168 3.072-10.24 7.68-11.264 15.36-9.216 48.128-31.744 89.088-68.096 121.856-2.048 1.536-3.584 4.096-6.144 6.656 10.24 2.56 18.944 4.608 27.648 6.656 8.704 2.56 16.896 5.12 25.6 8.192 16.384 5.632 25.6 21.504 22.016 37.376-0.512 3.584-1.536 6.656-2.56 10.752 3.584 1.536 6.656 3.072 9.728 5.12 34.816 16.896 59.904 43.008 77.312 77.824 17.92 35.328 18.432 73.728 19.456 113.664H207.872c-4.608-2.048-9.216-2.56-13.312-2.56z" fill="#FF8000" p-id="1848">
        </path></svg>
        <p>用户数量<br/><span>{{data.UesrLen}}</span></p> 
    </div>
  </div>
</el-card>
  </div>
  <div>
   <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <div id="centerDiv">
      <div
      class="centerDiv-div"
      >
       <p class="title">仓库统计</p>
        <div class="centerDiv-div2">
          <div>
            <p>{{data.CompanieLen}}</p>
            <p><span class="color-green"></span> 已合作公司</p>
          </div>
        <div>
          <p>{{data.WarehouseInfoLen}}</p>
            <p><span class="color-red"></span> 已开通仓库</p>
        </div>
        </div>
      </div>
       <div class="centerDiv-div">
        <p>订单统计</p>
        <div class="centerDiv-div2">
          <div>
            <p>{{completeAnOrder}}</p>
            <p><span class="color-green"></span> 已完成订单</p>
          </div>
        <div>
          <p>{{data.OrderLen - completeAnOrder}}</p>
            <p><span class="color-red"></span> 已取消订单</p>
        </div>
        </div>
        
       </div>
    </div>
   
  </div>
 
</el-card>
  </div>
  <div>
   <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    
  </div>
  <div id="footer">
    <div id="myLine" class="footer-div1"></div>
    <div class="footer-div2" id="myPie"></div>
  </div>
</el-card>
  </div>
</div>
  
  
</template>

<script>
import * as echarts from 'echarts';
import {reqDataStauts} from '@/api/dataStauts'
export default {
name:'dataStauts',
data(){
  return{
    data:{},
    order:[]
  }
},
async mounted(){
 
  // let date = new 
     
await this.getData()

this.drawLine()
this.drawPie()
},
computed:{
  completeAnOrder(){
    let sum = 0
    this.order.forEach(val=>{
      if(val.Status == 1){
        sum++
      }
    })
    return sum
  },
  lineData3(){
    let arr = [0,0,0,0,0,0,0]
    this.order.forEach(val=>{
      if(val.Status == 1){
let i = Math.ceil(Date.now()/86400000) - Math.ceil(val.InsertTime/86400)
  
     if(i<6){
        arr[i] = arr[i]+1
     }
      }
    })
    return arr
  },
    lineData4(){
    let arr = [0,0,0,0,0,0,0]
    this.order.forEach(val=>{
      if(val.Status != 1){
let i = Math.ceil(Date.now()/86400000) - Math.ceil(val.InsertTime/86400)
     if(i<6){
        arr[i] = arr[i]+1
     }
      }
    })
    return arr
  }
},
methods:{
  async getData(){
     let {data:{data,order}} =  await reqDataStauts()
     this.data = data
     this.order = order
    console.log(order);
  },
  drawLine(){
    var myChart = echarts.init(document.getElementById('myLine'));
   let  option = {
  title: {
    text: '近七天订单统计'
  },
   tooltip: {
    // trigger: 'axis'
  },
  legend: {
    data: ['订单成交量', '订单取消数', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['one', 'two', 'three', 'four', 'five', 'six', 'seven']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '订单成交量',
      type: 'line',
      stack: 'Total',
      data: this.lineData3
    },
   {
      name: '订单取消数',
      type: 'line',
      stack: 'Total',
      data: this.lineData4
    }
   
    
  ]
};
myChart.setOption(option);
  },
  drawPie(){
     var myChart = echarts.init(document.getElementById('myPie'));
    let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
    }
myChart.setOption(option);
  },
  
}
}
</script>

<style>
#footer{
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-around
}
#footer .footer-div1{
  width: 68%;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
}
#footer .footer-div2{
  width: 28%;
  height: 100%;
  border: 1px solid black;
  box-sizing: border-box;
}
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
.color-green{
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: greenyellow;
  border-radius: 50%;
}
.color-red{
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width:100%;
    margin-top: 10px;
  }
  #flexDiv{
    display: flex;
  }
  #flexDiv div{
    height: 70px;
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
  }
  #flexDiv div p{
    font-weight: 900;
    font-size: 16px;
  }
  #centerDiv{
    display: flex;
    justify-content: space-around;
  }
  #centerDiv .centerDiv-div{
    height: 200px;
    border: 3px solid #1e87f0;
    width: 42%;
    margin-top: 10px;
   
  }
   #centerDiv .centerDiv-div:nth-child(1){
    background-color: #1e87f0;
    color: #f3f3f3;
   }
   #centerDiv .centerDiv-div p{
   font-weight: 800;
   margin-left: 40px;
   margin-top: 5%;
   height: 5%;
   
  }
  #centerDiv .centerDiv-div .centerDiv-div2{
      display: flex;
      height: 60%;
      width: 100%;
      
      
  }
   #centerDiv .centerDiv-div .centerDiv-div2 div{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    
   }
   #centerDiv .centerDiv-div .centerDiv-div2 div p{
    text-align: center;
   }
   #centerDiv .centerDiv-div .centerDiv-div2 div:nth-child(1){
    border-right: 1px solid #dfdbdb;
    
   }
   #centerDiv .centerDiv-div .centerDiv-div2 div p{
    font-size: 24px;
   }
   #centerDiv .centerDiv-div .centerDiv-div2 div p:nth-child(2){
    font-weight: 500;
    font-size: 14px;
   }
   
</style>