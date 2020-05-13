<template>
  <nav class="msite_nav">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"  v-for="(items,index) in categorysArr"  :key="index">
          <a href="javascript:" class="link_to_food" v-for="(item,index) in items" :key="index">
            <div class="food_container">
              <img :src="imgBaseUrl + item.image_url" />
            </div>
            <span>{{item.title}}</span>
          </a>
        </div> 
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
  </nav>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
import  {mapState}  from 'vuex'
export default {
  props: {},
  data() {
    return {
      imgBaseUrl:'https://fuss10.elemecdn.com'
    };
  },
  computed: {
    ...mapState(['categorys']),
    categorysArr(){
      let bigArr = []
      let smallArr = []
      let max = 8
      let {categorys}=this
      categorys.forEach(v=>{
        if(smallArr.length==0){
          bigArr.push(smallArr)
        }
        smallArr.push(v)
        if(smallArr.length==max){
          smallArr=[]
        }
      })
      return bigArr
    }
  },
  mounted() {
    /* var mySwiper = new Swiper(".swiper-container", {
      loop: true,
      pagination: {
        el: ".swiper-pagination"
      }
    }); */
  },
  watch: {
    categorys(newVal,oldVal){
      if(newVal){
        this.$nextTick(v=>{
          let mySwiper = new Swiper('.swiper-container',{
            loop:true,
            pagination:{
              el:'.swiper-pagination'
            }
          })
        })
      }
    }
  },
  
};
</script>
<style scoped  lang='stylus'>
@import '../../common/stylus/mixins.styl'
 .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774

</style>
