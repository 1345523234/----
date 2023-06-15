<template>
  <div class="page">
      <vue-qr text='http://www.baidu.com' logoSrc='/images/1.jpg'
      :logoScale='50' :autoColor='false' backgroundColor='red' 
      :size='400' colorDark='green'
      colorLight='pink'
      ></vue-qr>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
    data(){
        return{
            imgUrl:'/public/images/1.jpg'
        }
    },
    components:{
        VueQr
    }
}
</script>

<style>

</style>