<template>
  <div id="app">
    <router-view />
<FooterGuide v-show='$route.meta.requiresAuth' > </FooterGuide>
   
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  name: 'App',
  components: {
    FooterGuide
  },
  data () {
    return {
      flag:true
    }
  },
  watch: {
    '$route.path':function(newVal,oldVal){
      console.log(newVal+'---'+oldVal);
      if(newVal==='/login'){
        this.flag=false
      }else{
        this.flag=true
      }
    }
  }
}
</script>

<style lang="stylus">
#app{
  width 100%;
  height 100%;
  background #f5faf5;
  }
</style>