<template>
  <div id="page">

	<Header_WB></Header_WB>

	<main class="margin_main_container">
		<div class="user_summary">
			<div class="wrapper">
				<div class="container">
					<div class="row">
						<div class="col-md-6">
							<figure>
								<img :src="user.picture">
							</figure>
							<h1>{{user.username}}</h1>
							<span>角色：{{user.role==='1'?"用户":"商家"}}</span>
						</div>
						<div class="col-md-6">
							<ul>
								<li @click="getMyinfo">
									<strong>1</strong>
                  <a><i class="icon-user-1"></i> 个人信息</a>
								</li>
								<li @click="getMyReviews">
									<strong>{{myReviewListInfo.count}}</strong>
                  <a><i class="icon-menu"></i> 评论</a>
								</li>
								<li @click="getMyRes">
									<strong>{{myCollection.count}}</strong>
                  <a><i class="icon_star"></i> {{user.role==='1'?"收藏":"我的餐馆"}}</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<!-- /container -->
			</div>
		</div>
		<!-- /user_summary -->


		<div class="container margin_60_35">
			<div class="row">
				<div class="col-lg-8">
          <UserInfo_form v-show="myInfoFlag" :userL="user" @avatarChange="changAvatar"></UserInfo_form>
          <div v-show="myReviewFlag">
            <Reviews_Cards v-for="review in myReviewListInfo.results" :review="review" :key="review.id"></Reviews_Cards>
            <a-pagination :default-current="0" :total="myReviewListInfo.count" :defaultPageSize="8" class="pagination__wrapper add_bottom_30" @change="pageChange"/>
          </div>
          <restaurant_item v-show="myCollectionFlag" :parentName="this.MyName" :userRole="this.user.role"> </restaurant_item>
				</div>
				<!-- /col -->
				<div class="col-lg-4" id="sidebar">
					<div class="box_general">
						<h5>删除账户</h5>
						<p>删除之后，您的一切信息将被清空</p>
						<a  class="btn_1 small" @click="deleteUser()">删除账户</a>
            <a-modal
              title="警告"
              :visible="visible"
              cancelText="取消"
              okText="确定"
              @ok="handleOk"
              @cancel="handleCancel"><p>您的所有的用户信息都会删除！</p></a-modal>
					</div>
				</div>
			</div>
			<!-- /row -->
		</div>

		<!-- /container -->


	</main>
	<!--/main-->

	<Footer_com></Footer_com>
	<!--/footer-->
	</div>
	<!-- page -->
</template>

<script>
    import Footer_com from "../components/Footer_com";
    import Header_WB from "../components/Header_WB";
    import {getLocalStore} from "../assets/storage/localstorage";
    import Reviews_Cards from "../components/List_Components/Reviews_Cards";
    import UserInfo_form from "../components/userInfo_components/UserInfo_form";
    import Restaurant_item from "../components/List_Components/restaurant_item";
    export default {
    name: "UserInfoSetting",
		components: {Restaurant_item, Reviews_Cards, Header_WB, Footer_com,UserInfo_form},
		data(){
			return{
				user:{
					username:"",
					pic_src:"",
					mobile:"",
					id:"",
					role:"",
				},
        myInfoFlag:true,
        myReviewFlag:false,
        myCollectionFlag:false,
        myReviewListInfo:{},
        myCollection:{},
        MyName:"UserInfo",
        visible:false,
			}
		},
    computed:{
      userId(){
        return JSON.parse(getLocalStore("userLogin"))['user_id'];
      },
      useRole(){
        return JSON.parse(getLocalStore("userLogin"))['role'];
      },
      avatarUrl(){
        return getLocalStore('Avatar');
      },
    },
    created() {
      //查询用户信息
      this.getMyInfo();
      //查询用户的评论
      this.getMyReviewList(this.$api.User.userReview.replace("{id}",this.userId));
      //查询用户收藏的餐馆
      this.getMyCollectRes();
    },
    methods:{
      changAvatar(newUrl){
        this.user.picture=newUrl;
      },
      //查询用户信息
      getMyInfo(){
        let tmpThis=this;
        this.$httpM.get(this.$api.User.read.replace("{id}",this.userId),false)
        .then(function (response) {
          tmpThis.user=response.data;
        })
        .catch(function (err) {

        })
      },
      //查询用户收藏
      getMyCollectRes(){
        let tmpThis=this;
        if (this.useRole==='1'){
          this.$httpM.get(this.$api.User.userCollectionRes.replace("{id}",this.userId),false)
          .then(function (response) {
            tmpThis.myCollection=response.data;
            console.log("data",response.data);
          })
          .catch(function (err) {

          })
        }
        else if (this.useRole==='2'){
          this.$httpM.get(this.$api.Restaurant.ownerList.replace("{id}",this.userId),false)
          .then(function (response) {
            tmpThis.myCollection=response.data;
            console.log("data",response.data);
          })
          .catch(function (err) {

          })
        }

      },
      //查询用户评论
      getMyReviewList(url){
        let tmpThis=this;
        this.$httpM.get(url,false)
        .then(function (response) {
          tmpThis.myReviewListInfo=response.data;
        })
        .catch(function (err) {

        })
      },
      //改变页数
      pageChange(pageNumber){
        let url=this.$api.User.userReview.replace("{id}",this.userId);
        url=url+'?page='+pageNumber;
        this.getMyReviewList(url);
      },
      getMyinfo(){
        this.myInfoFlag=true;
        this.myReviewFlag=false;
        this.myCollectionFlag=false;
      },
      getMyReviews(){
        this.myInfoFlag=false;
        this.myReviewFlag=true;
        this.myCollectionFlag=false;
      },
      getMyRes(){
        this.myInfoFlag=false;
        this.myReviewFlag=false;
        this.myCollectionFlag=true;
      },
      handleOk(){
        this.$httpM.del(this.$api.User.delete.replace("{id}",this.user.id)).catch(function (error){
                             console.log("error",error);});
                             this.$message.success("删除用户成功！");
                             this.visible=false;
                             this.$router.push('/confirm');
      },
      handleCancel(){
        this.$message.success("取消删除");
        this.visible=false;
      },
      deleteUser(){
        this.visible=true;
          }

		}

    }
</script>

<style scoped>

</style>
