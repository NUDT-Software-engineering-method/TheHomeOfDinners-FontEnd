export default{
  //首页
  Index:{
    index:'/index'
  },
  //用户
  User:{
    register:'/users/',                           //注册
    login:'/login/',                              //登录
    userMobileCount:'/mobile/count',                      //手机号判断
    userNameCount:'/username/count',                      //用户名判断是否重复
    read:'/user/{id}/',                                   //根据用户ID读取信息
    userReview:'/review/{id}/user_review/',               //获取用户的评论
    userCollectionRes:'/restaurant/{id}/user_collections/'//获取用户收藏的餐馆
  },
  //用户收藏餐馆
  Collection:{
    collected:'/collection/collected/',                   //是否被收藏
    collectRes:'/collection/',                            //收藏餐馆
    collectDel:'/collection/del_by_user_restaurant/',     //删除收藏
  },
  //餐馆
  Restaurant:{
    list:'/restaurant',                           //查询餐馆列表
    create:'/restaurant/',                        //创建餐馆
    singleRestaurant:"/restaurant/",              //查询一个餐馆
    scoreCount:"/restaurant/{id}/reviews_count/", //查询餐馆下各个评分的个数
  },
  //菜单
  Menu:{
    resMenu:'/menu/{id}/restaurant_menu/',        //查看餐馆的菜单
    recommendMenu:'/menu/recommended/' ,          //菜单推荐
  },
  //标签
  Tag:{
    lists:'/tags/',                               //获取标签列表
  },
  //餐馆标签关系表
  Tag_Res:{
    list:'/tag_restaurant/'                       //返回对应标签下的餐馆列表
  },
  //评论
  Review:{
    create: '/review/',                                    //创建餐馆
    RestaurantReview:'/review/{id}/restaurant_review',     //查询餐馆的评论
  },
  //测试
  Test:{
    test_get:'/posts',
    test_post:'/posts',

  }
}
