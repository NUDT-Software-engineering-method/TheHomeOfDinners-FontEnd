<template>
    <div>

        <h4><strong>{{total_count}}</strong> 家餐厅</h4>

        <div class="company_listing isotope-item high" v-for="Restaurant in restaurant_list">
            <div class="row">
                <div class="col-md-7">
                    <div class="company_info">
                        <figure><img :src="Restaurant.picture"  width="25%" ></figure>

                        <h3> {{Restaurant.res_name}}<a-tooltip class="text-info"><template slot="title" class="text-warning">请联系管理员ruangongxiaozu11@nudt.com</template>{{Restaurant.verify==='0'?'(审核中)':(Restaurant.verify==='1'?'':'(审核不通过)')}}</a-tooltip> </h3>
                        <p> {{Restaurant.res_address}} </p>
                        <p><i class="ti-star ant-tag-orange">收藏数：</i>{{Restaurant.collection_count}}</p>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="text-center float-lg-right">

                    <span class="rating"><strong>reviews:{{Restaurant.review_count }}  score：{{Math.round(Restaurant.score)}}</strong>
                        <i class="icon_star" v-for="(item,index) in 5" :class="[{'empty':(index-Math.round(Restaurant.score))>=0}]"></i>
                    </span>
                    <div class="row">
                      <a-space size="small">

                        <button class="btn_1 small" @click="showResReviewAnalyze(Restaurant.id)" v-show="ReviewAnalyzeFlag">评论模型</button>
                        <button class="btn_1 small" @click="showResMenu(Restaurant.id)" v-show="editMenu">编辑餐馆</button>
                        <span class="small"  v-show="!editMenu"></span>
                        <button class="btn_1 small" @click="showSingleRes(Restaurant.id)">餐馆详情</button>

                      </a-space>

                    </div>

                    </div>
                </div>
            </div>
        </div>
        <!-- /company_listing -->
        <a-pagination  :default-current="1" :total="total_count" :defaultPageSize="8" class="pagination__wrapper add_bottom_30" @change="pageChange"/>
    </div>
</template>

<script>
import Pagination from './Pagination.vue';
import {getLocalStore} from "../../assets/storage/localstorage";
import I_CallSection from "../index_components/I_CallSection";
export default {
    components: {I_CallSection, Pagination },
    name:"restaurant_item",
    props:['selectTag','parentName','rankBy'],
    data(){
        return{
            restaurant_list:[
              {
                res_name:"东北人家",
                id:12,
              }
            ],
            total_count:0,
            next_page_api:"",
            previous_page_api:"",
            page_size_:8,
            current_page:1,
            total_page:0,
            ReviewAnalyzeFlag:true,
            editMenu:false,

        }
    },
    methods:{
        //跳转到一个餐馆
        showResReviewAnalyze(res_id){
         this.$router.push({name:'review_analyze',query:{id:res_id}});
        },
        showSingleRes(res_id){
          //传参数时 不能用path传递参数
          this.$router.push({name:'restaurant',query:{id:res_id}});
        },
        //跳转到菜单的编辑页面
        showResMenu(res_id){
          //传参使用name
          this.$router.push({name:'menu',query:{id:res_id}});
        },
        pageChange(pageNumber){
          if (this.parentName==='RestaurantList'){
            if (this.selectTag===""){
              this.getResList(this.$api.Restaurant.list+"?page="+pageNumber);
            }
            else {
              this.getResList(this.$api.Tag_Res.list+this.selectTag+"?page="+pageNumber);
            }
          }
          else if(this.parentName==='UserInfo'){
            var urlCollect=this.$api.User.userCollectionRes.replace("{id}",this.uerId);
            urlCollect=urlCollect+"?page="+pageNumber;
            console.log(urlCollect);
            this.getResList(urlCollect);
          }
        },
        //根据url 获取餐馆列表
        getResList(url,params=false){
            var tmp_this=this;
            this.$httpM.get(url,params)
            .then(function (response) {
              console.log(tmp_this.rankBy);
                tmp_this.restaurant_list=response.data.results;
                //进行排序
                if(tmp_this.rankBy===1){

                }
                else if (tmp_this.rankBy===2){
                    //从高到低
                    tmp_this.restaurant_list.sort((a,b)=>b['score']-a['score']);
                }
                else if (tmp_this.rankBy===3){
                    //从低到高
                    tmp_this.restaurant_list.sort((a,b)=>a['score']-b['score']);
                }
                tmp_this.total_count=response.data.count;
                tmp_this.next_page_api=response.data.next;
                tmp_this.previous_page_api=response.data.previous;
                //判断有多少页 (向上整除)
                tmp_this.total_page=Math.ceil(tmp_this.total_count / tmp_this.page_size_);
            })
            .catch(function (err) {
                alert(err);
                console.log(err)
            })
        },
      GetReviewAnalyzeFlag(){
        if(this.parentName==="RestaurantList"||this.userRole==="1"){
          this.ReviewAnalyzeFlag=false;
        }
      }
    },
    created(){
      console.log(this.selectTag);
      //如果父组件为餐馆列表
      if (this.parentName==='RestaurantList'){
        //没有筛选条件返回全部列表
        if (this.selectTag===""){
          this.getResList(this.$api.Restaurant.list);
        }
        else {
          this.getResList(this.$api.Tag_Res.list+this.selectTag);
        }
      }
      //如果父组件为用户信息页面
      else if (this.parentName==='UserInfo'){
        //使用户读取收藏的餐馆
        if (this.userRole==='1'){
          this.getResList(this.$api.User.userCollectionRes.replace("{id}",this.uerId));
        }
        //用户角色为商家
        else if(this.userRole==='2'){
          this.editMenu=true;
          this.getResList(this.$api.Restaurant.ownerList.replace('{id}',this.uerId));
        }

      }
      this.GetReviewAnalyzeFlag();
    },
    computed:{
      uerId(){
        return JSON.parse(getLocalStore("userLogin"))['user_id'];
      },
      userRole(){
        return JSON.parse(getLocalStore("userLogin"))['role'];
      },
    }
}
</script>

<style scoped>
.company_info figure img{
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    min-width: 100%;
    min-height: 100%;
    object-fit: contain;
}
</style>
