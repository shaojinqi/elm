<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;"  :class="{on:isWay}" @click="isWay=true">短信登录</a>
          <a href="javascript:;"  :class="{on:!isWay}"  @click="isWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on:isWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号"  v-model="phone"/>
              <button :disabled="!isRightPhone" class="get_verification" :class="{black:isRightPhone}" @click.prevent="getCode">{{computedTime>0?`还剩${computedTime}s`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码"  v-model="pwd" v-if="!isrightPwd"/>
                <input type="tel" maxlength="8" placeholder="密码"  v-model="pwd" v-else/>
                <div class="switch_button" :class="isrightPwd?'on':'off'" @click="isrightPwd=!isrightPwd">
                  <div class="switch_circle" :class="{right:isrightPwd}"></div>
                  <span class="switch_text">{{isrightPwd?'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha"/>
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha"/>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

        <AlertTip  :alertText='msg'  v-show='showAlert' @closeTip='closeTip' ></AlertTip>
       

  </section>
</template>

<script>
import {reqPwdLogin,reqSendCode,reqSmsLogin} from '../../api/index'
import  AlertTip from '../../components/AlertTip/AlertTip'
export default {
  props: {},
  data() {
    return {
      isWay:true,
      phone:'',
      code:'',
      name:'',
      pwd:'',
      captcha:'',
      computedTime:0,
      isrightPwd:false,
      msg:'',
      showAlert:false
    };
  },
  computed: {
    isRightPhone(){
      return  /^1\d{10}$/.test(this.phone) 
    }
  },
  methods: {
    showAlt(text){
      this.showAlert=true 
      this.msg=text
    },

    closeTip(){
      this.showAlert=false
    },

   async  getCode(){
     if(!this.computedTime){
       this.computedTime=30
       this.IntervalId=setInterval(() => {
         this.computedTime--
         if(this.computedTime<=0){
           clearInterval(this.IntervalId)
         }
       }, 1000);
       let result= await reqSendCode(this.phone)
       if(result.code==1){
         console.log(result.msg);
       }
     }
    },
    getCaptcha(event){
      event.target.src="http://localhost:4000/captcha?time="+Date.now()
    },

    async login (){
      let result 
      let {isWay,phone,code}=this
      if(isWay){
        if(!phone){ 
          this.showAlt('手机号不对')
          return 
        }
        if(!code){
          this.showAlt('验证码不对')
          return 
        }
        result = await reqSmsLogin(phone,code)
      }else{
        let {name,pwd,captcha}=this
        if(!name){
          this.showAlt('用户名不对')
          return 
        }
        if(!pwd){
          this.showAlt('密码不对')
          return 
        }
        if(!captcha){
          this.showAlt('图形验证码不对')
          return 
        }
        result = await reqPwdLogin({name,pwd,captcha})
          }
        if(result.code==0){
          let userInfo = result.data
          this.$store.dispatch('recordUser',userInfo)
          this.$router.replace('/profile')
        }
    },
  },
  components: {
    AlertTip
  }
};
</script>
<style scoped  lang='stylus'>
 .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.black
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
                    &.right 
                      transform translateX(27px)

              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
</style>
