<template>
  <div class="main">
    <div style="width: 100%;margin-top: 8rem;">
      <img class="logo"  src="../assets/login_logo.png"/>
    </div>
    <div class="sys-name">
      代理后台
    </div>
    <div class="d-flex justify-content-center mar">
      <div class="d-flex align-items-center login-info">
        账号：
      </div>
      <div class="d-flex align-items-center">
        <input class="input-cl" v-model="formData.account"/>
      </div>
    </div>

    <div class="d-flex justify-content-center mar2">
      <div class="d-flex align-items-center login-info">
        密码：
      </div>
      <div class="d-flex align-items-center">
        <input class="input-cl" v-model="formData.password"/>
      </div>
    </div>

    <div class="d-flex justify-content-around mar3">
        <div class="p-2 d-flex align-items-center mar-left"><img style="z-index: 10;" class="d-flex align-items-center" height="20" src="../assets/cheak1.png"/><span class="d-flex align-items-center rem">记住账号</span></div>
        <div class="p-2">&nbsp;</div>
        <div class="p-2">&nbsp;</div>
    </div>

    <div class="d-flex justify-content-center mar4">
      <button class="login-btn" @click="login"></button>
    </div>
    <!--<img src="../assets/bg.jpg" style="position:fixed;top: 0px;left: 0px;height: 100%;width: 100%;z-index: 1" />-->
  </div>

</template>

<script>
  import {myTools} from '../tools/myTools.js'
  import qs from 'qs'

  export default {
    name: 'login',
    data () {
      return {
        formData: {
          account: '',
          password: '',
        },
      }
    },

    methods: {
      login: function () {
        myTools.axiosInstance.post('/login', qs.stringify(this.formData))
          .then(function (response) {
            if (response.status === 200 || response.status === 302) {
              window.location.href = '/#/main'   //登录成功，跳转首页
            } else {
              alert('帐号密码错误')
            }
          })
          .catch(function (err) {
            alert(err)
          })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  border:0px;
  background-color:transparent;
  /*z-index: 10;*/
}
.main{
  background-image: url("../assets/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size:100% 100%;
  height: 100%;
  /*z-index: 1;*/
}
.logo{
  margin-top: 10rem;
  margin:0 auto;
  /*z-index: 2;*/
}
.sys-name{
  margin: 0 auto;
  height: 1rem;
  font-family: MicrosoftYaHei;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.5rem;
  letter-spacing: 0rem;
  color: #573126;
  /*z-index: 9;*/
}
.mar-left{
  margin-left: 4rem;
}
.mar{
  margin-top: 2rem;
}
.mar2{
  margin-top: 1rem;
}
.mar3{
  margin-top: 1.5rem;
}
.mar4{
  margin-top: 2rem;
}
.input-cl{
  padding: 5px 5px 5px 5px;
  background-color: #dfdac4;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  /*z-index: 10;*/
}
.input-cl:focus{
  background-color: #a1957a;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
  border-bottom-right-radius:5px;
  border-bottom-left-radius:5px;
  /*z-index: 10;*/
}
.login-btn{
  background-color: transparent;
  background-image: url("../assets/login_btn.png");
  background-repeat:no-repeat;
  background-size:contain;
  width: 7.5rem;
  height: 2.5rem;
  font-family: FZY4JW--GB1-0;
  font-size: 1.5rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #d2fed1;
  border: 0px;
  /*z-index: 10;*/
}
.login-info{
  font-family: MicrosoftYaHei;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 1.5rem;
  letter-spacing: 0rem;
  color: #573126;
  /*z-index: 10;*/
}
.rem{
  margin-left: 0.5rem;
  font-family: MicrosoftYaHei;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #573126;
  /*z-index: 10;*/
}
</style>
