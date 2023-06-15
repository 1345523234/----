<template>
  <!-- <div class="p-login">

    <transition name="fade-down" appear>
      <div class="p-login-bar">
        <div class="p-title">
          后台管理系统
        </div>
     
        <el-form :model="formData" ref="loginForm" :rules="rules">
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" clearable v-model="formData.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-key" clearable v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="handleLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>
  </div> -->
   <div class="wrap">
        <!-- 展示效果 -->
        <div class="effect">
            <div class="box">
                <div class="login-box">
                    <h1>登录</h1>
                    <form>
                        <div class="user-box">
                            <input type="text" autocomplete="new-password"
                             name="" required=""
                             v-model="formData.username"
                             >
                            <label>账户</label>
                        </div>
                        <div class="user-box">
                            <input type="password" autocomplete="new-password" 
                            v-model="formData.password"
                            name="" required="">
                            <label>密码</label>
                        </div>
                        <a @click="handleLogin">
                            Submit
                        </a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { login } from '../api/user-api.js'
	import { mapActions,mapGetters } from 'vuex'
	export default{
		data(){
			return {
				// 表单验证对象必须是一个json对象
				formData:{
					username:'admin',
					password:'123456'
				},
				// 表单验证规则，固定格式
				// rules:{
				// 	username:[
				// 		{required:true,message:'用户名不可以为空',trigger:'change'}
				// 	],
				// 	password:[
		
				// 	]
				// }
			}
		},
		computed:{
			// ...mapGetters(['getActiveMenu'])
		},
		methods:{
			// 绑定Vuex中的根据角色id查询菜单的逻辑函数到本组件的methods中，这样就可以通过this.fetchMenuByRoleId嗲用他
			...mapActions(['fetchMenuByRoleId']),
			// 定义异步函数
			async handleLogin(){
				// 通过await进行表单验证,this.$refs.loginForm可以调用el-form的验证方法并返回表单验证的结果
				// let valid = await this.$refs.loginForm.validate(

        // ).catch(err => err)
				// if(valid){
					let res = await login(this.formData.username,this.formData.password);
          // let res = {
          //   data:{
          //     code:200
          //   }
          // }
          console.log(res.data.code);
					if(res.data.code == 200 ){
            console.log(res.data.token);
						sessionStorage.userInfo = JSON.stringify(res.data.data);
						sessionStorage.token = res.data.token;
						
						await this.fetchMenuByRoleId()
						this.$router.push('/dataStauts')
					}
				// }
      // console.log(this.getActiveMenu.url)
      // this.$router.push(this.getActiveMenu.url)
			}
		}
	}
</script>

<style  scoped="scoped">
   html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font-weight: inherit;
            font-family: inherit;
            font-style: inherit;
            vertical-align: baseline;
            box-sizing: border-box;
        }

        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block
        }

        ol,
        ul {
            list-style: none
        }

        blockquote,
        q {
            quotes: none
        }

        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
            content: "";
            content: none
        }

        table {
            border-collapse: collapse;
            border-spacing: 0
        }

        @font-face {
            font-family: AlimamaShuHeiTi-Bold;
            src: url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlimamaShuHeiTi/AlimamaShuHeiTi-Bold/AlimamaShuHeiTi-Bold.eot) format('embedded-opentype'),
                url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlimamaShuHeiTi/AlimamaShuHeiTi-Bold/AlimamaShuHeiTi-Bold.otf) format('opentype'),
                url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlimamaShuHeiTi/AlimamaShuHeiTi-Bold/AlimamaShuHeiTi-Bold.ttf) format('TrueType'),
                url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlimamaShuHeiTi/AlimamaShuHeiTi-Bold/AlimamaShuHeiTi-Bold.woff) format('woff'),
                url(https://puhuiti.oss-cn-hangzhou.aliyuncs.com/AlimamaShuHeiTi/AlimamaShuHeiTi-Bold/AlimamaShuHeiTi-Bold.woff2) format('woff2');
        }

        .wrap{
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
            background: url('./1.webp') no-repeat ;
            background-size: 100%;
            color: white;
            font-family: AlimamaShuHeiTi-Bold, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
            font-weight: 400;
            font-style: normal;
            text-transform: initial;
            letter-spacing: initial;
            height: 100%;
            z-index: 10 !important;
        }

        button {
            font-family: AlimamaShuHeiTi-Bold
        }

        * {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-weight: 500
        }

        a {
            color: inherit;
            text-decoration: none;
            cursor: pointer
        }

        *::-moz-selection {
            background: rgba(255, 255, 255, .99);
            color: #121212
        }

        *::selection {
            background: rgba(255, 255, 255, .99);
            color: #121212
        }
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }

        /* 分割线  */
        .icon {
            width: 1em;
            height: 1em;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
        }

        .wrap {
            align-content: flex-start;
        }

        img {
            width: 100%;
        }

        .title {
            width: 100%;
            display: flex;
        }

        .title span {
            font-size: 40px;
            font-family: AlimamaShuHeiTi-Bold;
            padding: 20px;
            margin-top: 50px;
            width: 100%;
            display: flex;
            justify-content: center;
        }

        .effect { 
            height: 100% !important;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            justify-content: center;
            position: relative;
            height: 350px;
            margin-top: 20px;
        }

        .box {
            width: 500px;
            box-sizing: border-box;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            padding: 2px;
        }

        .box::before,.box::after {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 350px;
            height: 350px;
            background: linear-gradient(0deg, transparent, transparent, #03e9f4, #03e9f4, #03e9f4);
            z-index: 0;
            /* opacity: ; */
            transform-origin: bottom right;
            animation: login 5s linear infinite;
        }
        .box::after {
            background: linear-gradient(0deg, transparent, transparent, #ff2771, #ff2771, #ff2771);
            animation-delay: -3s;
        }
        @keyframes login {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .login-box {
            width: 500px;
            padding: 50px;
            background: #373432;
            opacity: ;
            box-sizing: border-box;
            border-radius: 10px;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }


        

      


        .login-box h1 {
            margin: 0 0 30px;
            padding: 0;
            color: #fff;
            text-align: center;
            font-size: 26px;
        }

        .login-box .user-box {
            position: relative;
        }

        .login-box .user-box input {
            width: 100%;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            margin-bottom: 30px;
            border: none;
            border-bottom: 1px solid #fff;
            outline: none;
            background: transparent;
        }

        .login-box .user-box label {
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px 0;
            font-size: 16px;
            color: #fff;
            pointer-events: none;
            transition: .5s;
        }

        .login-box .user-box input:focus~label,
        .login-box .user-box input:valid~label {
            top: -20px;
            left: 0;
            color: #03e9f4;
            font-size: 12px;
        }

        .login-box form a {
            position: relative;
            display: inline-block;
            padding: 10px 20px;
            color: #03e9f4;
            font-size: 16px;
            text-decoration: none;
            text-transform: uppercase;
            overflow: hidden;
            transition: .5s;
            margin-top: 20px;
            margin-bottom: 20px;
            letter-spacing: 4px;
            border-radius: 4px;
            box-shadow: 0px 0px 10px #03e9f4, 0 0 0px #03e9f4, 0 0 0px #03e9f4, 0 0 0px #03e9f4
        }

        .login-box a:hover {
            background: #03e9f4;
            color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 100px #03e9f4;
        }

        .code {
            padding: 25px 15px;
            border-radius: 5px;
            overflow: hidden;
        }

        .code img {
            border-radius: 5px;
        }

</style>
