<template>
    <div>
      <button  class="btn-light" @click="Minepost">post方法</button>
      <button class="btn-primary" @click="Mineget">get方法</button>
      <button class="btn-dark">delete方法</button>
    </div>
</template>

<script>
    export default {
        name: "testHttp",
        data(){
          return{
            post_data:[{
                        title: 'foo',
                        body: 'bar',
                        userId: 1,
                        }]
          }
        },
        methods:{
          Minepost(){
            this.$httpM.post(this.$api.Test.test_post,this.post_data,false)
              .then(function (response) {
                  console.log(response);
                  alert(response);
              })
              .catch(function (err) {
                  console.log(err);
              })
          },
          Mineget(){
            this.$httpM.get(this.$api.User.userMobileCount
              ,{params:{mobile:"18635151267"}},false)
            .then(function (response) {
                console.log(response);
                alert(response);
            })
            .catch(function (err) {
                console.log(err)
            })
          },
        }
    }
</script>

<style scoped>

</style>
