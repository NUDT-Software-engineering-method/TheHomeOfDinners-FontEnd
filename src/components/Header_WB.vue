<template>
  <header class="header_in">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-12">
					<div id="logo">
						<router-link to="/">
							<img src="/static/img/logo_sticky.svg" width="140" height="35" alt="" class="logo_sticky">
						</router-link>
					</div>
				</div>
				<div class="col-lg-9 col-12">
          <!--
					<ul id="top_menu">

						<li><a href="{% url 'write-rest' %}" class="btn_top company" >Create Restaurant</a></li>
						<li><a href="{% url 'login' %}" id="sign-in" class="login" title="Sign Out">Sign Out</a></li>
					</ul>
					-->
					<!-- /top_menu -->
					<a href="#menu" class="btn_mobile">
						<div class="hamburger hamburger--spin" id="hamburger">
							<div class="hamburger-box">
								<div class="hamburger-inner"></div>
							</div>
						</div>
					</a>
					<nav id="menu" class="main-menu">
            <ul>
              <li v-show="!is_login"><span><router-link to="/login" >登录账号</router-link> </span>
              </li>
              <li v-show="!is_login"><span><router-link to="/register" >注册账号</router-link> </span>
              </li>

              <li><span><a href="#0">个人中心</a></span>
                <ul>
                  <li><router-link to="/userinfo">我的评价</router-link></li>
                  <li><router-link to="/userinfo">我的收藏</router-link></li>
                  <li><router-link to="/userinfo">我的设置</router-link></li>
                </ul>
              </li>
                  <li><span><a href="#0">商户服务</a></span>
                <ul>
                  <li><router-link to="/new_res">创建餐馆</router-link></li>
                  <li><router-link to="/userinfo">商户中心</router-link></li>
                </ul>
              </li>
              <li><span><a href="#0">帮助中心</a></span>
                <ul>
                  <li><router-link to="/faq">平台规则</router-link></li>
                  <li><router-link to="/register">注册</router-link></li>
                  <li><router-link to="/login">登录</router-link></li>
                </ul>
              </li>
              <li v-show="is_login"><span><a>欢迎：{{username}}</a> </span>
                <ul>
                  <li><router-link to="/userinfo">个人设置</router-link></li>
                  <li @click="loginOut"><a>退出</a></li>
                </ul>
              </li>
            </ul>
          </nav>
				</div>
			</div>
			<!-- /row -->
		</div>
		<!-- /container -->
	</header>
	<!-- /header -->
</template>

<script>
  import {getLocalStore,removeLocalStore} from "../assets/storage/localstorage";
  export default {
      name: "Header_WB",
      data(){
        return{
          is_login:false,
          username:"",
        }
      },
      created() {
        var user=JSON.parse(getLocalStore("userLogin"));
        if(user!=null){
          //用户已经登录
          if(user.token!=null){
            this.is_login=true;
            this.username=user.username;
          }
        }

      },
      methods:{
        //删除localstorage中的值
        loginOut(){
          this.is_login=false;
          removeLocalStore("userLogin");
          this.$router.push({path:'/login'});
        }
      },
  }
</script>

<style scoped>

</style>
