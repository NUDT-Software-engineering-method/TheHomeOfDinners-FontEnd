<template>
    <div class="bg_color_1">
			<div class="container margin_60_35">
				<div class="main_title_3 text-center">
					<h2>食客之家</h2>
					<p>其他城市的干饭地点</p>
				</div>
				<div class="row justify-content-center">
					<div class="col-xl-10 col-lg-12">
						<div class="all_categories clearfix add_bottom_30">
							<ul>
								<li v-for="(item,index) in region_ranked_list"><a href="{% url 'category-companies-listings-filterstop-guest' %}?name=Lebanese"><strong>{{index}}</strong>{{item}}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- /container -->
		</div>
		<!-- /bg_color_1 -->
</template>

<script>
    import {getLocalStore} from "../../assets/storage/localstorage";

    export default {

        name: "I_RegionList",
        data(){
          return{
            region_ranked_list:["Lebanese","Indian","Mediterranean","Asia","Europe"],
          }
        },
        created() {
          this.getRegionList();
        },
        methods:{
          getRegionList(){
            var tagsList=JSON.parse(getLocalStore("tagsList"));
            console.log(tagsList);
            this.region_ranked_list=tagsList['地区'];
          }
        }
    }
</script>

<style scoped>

</style>
