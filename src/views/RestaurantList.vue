<template>
  <div id="page">

	<Header_WB></Header_WB>

	<main>
		<div id="results">
		   <div class="container">
			   <div class="row justify-content-between">
				   <div class="col-lg-3 col-md-4 col-10">

				   </div>
				   <div class="col-xl-5 col-md-6 col-2">
					   <a href="#0" class="search_mob btn_search_mobile"></a> <!-- /open search panel -->
						<div class="row no-gutters custom-search-input-2 inner">
							<div class="col-lg-7">
								<div class="form-group">
									<input class="form-control" type="text" placeholder="今天要吃啥呢" v-model="searchName">
									<i class="icon_search"></i>
								</div>
							</div>
							<div class="col-lg-4">
								<select class="wide nice-select">
                  <option value="全部">全部{{selectedCategory}}</option>
									<option v-for="item in categories_list" v-bind:value="item">{{item}}</option>
								</select>
							</div>
							<div class="col-xl-1 col-lg-1">
								<input type="submit" value="Search" @click="search">
							</div>
						</div>
				   </div>
			   </div>
			   <!-- /row -->
				<div class="search_mob_wp">
					<div class="custom-search-input-2">
						<div class="form-group">
							<input class="form-control" type="text" placeholder="Search reviews...">
							<i class="icon_search"></i>
						</div>
						<div class="form-group">
							<input class="form-control" type="text" placeholder="Where">
							<i class="icon_pin_alt"></i>
						</div>
						<select class="wide">
							<option v-for="item in categories_list">{{item.name}}</option>
						</select>
						<input type="submit" value="Search">
					</div>
				</div>
				<!-- /search_mobile -->
		   </div>
		   <!-- /container -->
	   </div>
	   <!-- /results -->

		<div class="filters_listing sticky_horizontal">
			<div class="container">
				<ul class="clearfix">
					<li>
						<div class="switch-field">
							<input type="radio" id="all" name="listing_filter" value="all" checked data-filter="*" class="selected">

							<label for="all" @click="rankBy_(1)">全部</label>
							<input type="radio" id="high" name="listing_filter" value="high" data-filter=".high">
							<label for="high" @click="rankBy_(2)">评分由高到低</label>
							<input type="radio" id="low" name="listing_filter" value="low" data-filter=".low">
							<label for="low" @click="rankBy_(3)">评分由低到高</label>

						</div>
					</li>
					<li><a class="btn_filt" data-toggle="collapse" href="#filters" aria-expanded="false" aria-controls="filters" data-text-swap="Less filters" data-text-original="More filters">筛选</a></li>
				</ul>
			</div>
			<!-- /container -->
		</div>
		<!-- /filters -->
    <!-- Filter -->
		<div class="collapse" id="filters">
			<div class="container margin_30_5">
				<div class="row">
					<div class="col-md-4">
						<h6>分类</h6>
						<ul>
							<li v-for="cate in categories_list">
								  <label class="container_check">{{cate.name}} <small>{{cate.num}}</small>
								  <input type="radio" name="category" id="category" v-model="selectedCategory" :value="cate.name" @change="getKey" @click="controlSingel($event)">
								  <span class="checkmark" ></span>
								</label>
							</li>

						</ul>
					</div>

					<div class="col-md-4">
						<h6>地区</h6>
						<ul>
							<li v-for="region in region_list" >
								<label class="container_check">{{region.name}} <small>{{region.num}}</small>
								  <input type="radio" name="location" id="region" v-model="selectedRegion" :value="region.name" @change="getKey" @click="controlSingel($event)">
								  <span class="checkmark" ></span>
								</label>
							</li>
						</ul>
					</div>


				</div>
				<!-- /row -->
			</div>
		</div>
		<!-- /Filters -->

		<div class="container margin_60_35">

			<div class="isotope-wrapper">

				<restaurant_item :key="selectKey+rankBy" :selectTag="selectKey" :parentName="this.myName" :rankBy="rankBy"></restaurant_item>

			</div>
			<!-- /isotope-wrapper
			<p class="text-center"><a href="#0" class="btn_1 rounded add_top_15">Load more</a></p>
			 -->



		</div>
		<!-- /container -->

	</main>
	<!--/main-->

	<Footer_com></Footer_com>
	</div>
	<!-- page -->
</template>

<script>
	  import restaurant_item from "../components/List_Components/restaurant_item"
    import Header_WB from "../components/Header_WB";
    import Footer_com from "../components/Footer_com";
    import Pagination from "../components/List_Components/Pagination";
    import {getLocalStore} from "../assets/storage/localstorage";
    export default {
        name: "RestaurantList",
        data(){
          return{
            searchName:"",
            tag:"全部",
            categories_list: [],
            region_list:[],
            selectedCategory:this.$route.query.tagName===undefined?"":this.$route.query.tagName,
            selectedRegion:"",
            myName:"RestaurantList",
            rankBy:1,
            changed:false,
          }
        },
        components: {Footer_com, Header_WB,Pagination,restaurant_item},
        computed:{
          selectKey(){
            var selectKey="";
            if (this.selectedCategory===""&&this.selectedRegion===""){
              selectKey="";
            }
            else if (this.selectedCategory===""&&this.selectedRegion!=="") {
              selectKey="l"+this.selectedRegion;
            }
            else {
              selectKey="c"+this.selectedCategory+"l"+this.selectedRegion;
            }
            return selectKey;
          },
        },
        created() {
          this.getTagsList();
        },
        methods:{
          search(){
            //表单判断
            if(this.searchName.length<1){
              this.$message.error("请输入搜索名称！");
            }
            else {
              this.$router.push({name:'searchResults',query:{tag:this.tag,searchName:this.searchName}});
            }
          },
          rankBy_(flag){
            this.rankBy=flag;
            //全部
            if (flag===1){
              this.selectedRegion="";
              this.selectedCategory="";
            }
          },
          getTagsList(){
            let tmpList=new Array();
            var tagsList=JSON.parse(getLocalStore("tagsList"))['种类'];
            for (var cator of tagsList){
              let nums=getLocalStore(cator);
              var tmpNum= {
                name:'',
                num:'',
              };
              tmpNum.name=cator;
              tmpNum.num=nums===null?'0':nums;
              tmpList.push(tmpNum);
            }
            this.categories_list=tmpList;
            tmpList=new Array();
            tagsList=JSON.parse(getLocalStore('tagsList'))['地区'];
            console.log(tagsList);
            for (var location of tagsList){
              let nums=getLocalStore(location);
              var tmpNum= {
                name:'',
                num:'',
              };
              tmpNum.name=location;
              tmpNum.num=nums===null?'0':nums;
              console.log(tmpNum);
              tmpList.push(tmpNum);
            }
            this.region_list=tmpList;
          },
          //实现单选按钮取消功能
          controlSingel($event) {
              let _this = this;
              window.setTimeout(() => {
                if (!this.changed) {
                  $event.target.checked = false
                   // 单选框没有选中的代码处理
                  if ($event.target.id==='region'){
                      _this.selectedRegion="";
                  }
                  else if ($event.target.id==='category'){
                      _this.selectedCategory="";
                  }

                }
                _this.changed = false;
              }, 0);
           },
          getKey(){
            this.changed = true;
          },
        }

    }
</script>

<style scoped>

</style>
