<template>
    <div class="tab">
      <nav class="nav nav-pills nav-justified">
        
        <div :class=tab1 >
          <router-link to="/main/tab1">
          <div>   
              <img height="27px" src="../assets/home_btn1.png"/>
              <div class="tab-str">充值中心</div>
            
          </div>
            </router-link>
        </div>
        <div :class=tab2 >
           <router-link to="/main/tab2">
          <div>
              <img height="27px" src="../assets/home_btn2.png"/>
              <div class="tab-str">佣金模式</div>
          </div>
          </router-link>
        </div>
        
        <div :class=tab3 >
          <router-link to="/main/tab3">
          <div>
              <img height="27px" src="../assets/home_btn3.png"/>
              <div class="tab-str">牌艺馆</div>
          </div>
           </router-link>
        </div>
        
        <div :class=tab4 >
          <router-link to="/main/tab4">
          <div>
              <img height="27px" src="../assets/home_btn4.png"/>
              <div class="tab-str">代理/个人</div>
          </div>
          </router-link>
        </div>
        
      </nav>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      tab1: 'nav-item nav-link active',
      tab2: 'nav-item nav-link nav-margin-left',
      tab3: 'nav-item nav-link nav-margin-left',
      tab4: 'nav-item nav-link nav-margin-left'
    }
  },
  watch: {
    "$route": "routeDate"
  },
  mounted(){
    // console.info(this.$router)
  },
  methods: {
    routeDate(to, from)
    {
        console.info("to："+to)
        if("/main/tab1" === to.path){
            this.tab1 = 'nav-item nav-link active'
            this.tab2 = 'nav-item nav-link nav-margin-left'
            this.tab3 = 'nav-item nav-link nav-margin-left'
            this.tab4 = 'nav-item nav-link nav-margin-left'

          window.location.href = '/#/pay/tab1'   //跳转到充值中心-自助充值
        }else if("/main/tab2" === to.path){
            this.tab1 = 'nav-item nav-link'
            this.tab2 = 'nav-item nav-link nav-margin-left active'
            this.tab3 = 'nav-item nav-link nav-margin-left'
            this.tab4 = 'nav-item nav-link nav-margin-left'

          window.location.href = '/#/charges/tab1'   //跳转到佣金模式-我的佣金
        }else if("/main/tab3" === to.path){
            this.tab1 = 'nav-item nav-link'
            this.tab2 = 'nav-item nav-link nav-margin-left'
            this.tab3 = 'nav-item nav-link nav-margin-left active'
            this.tab4 = 'nav-item nav-link nav-margin-left'

          window.location.href = '/#/brand/tab1'   //跳转到牌艺馆-牌艺馆信息
        }else if("/main/tab4" === to.path){
            this.tab1 = 'nav-item nav-link'
            this.tab2 = 'nav-item nav-link nav-margin-left'
            this.tab3 = 'nav-item nav-link nav-margin-left'
            this.tab4 = 'nav-item nav-link nav-margin-left active'

          window.location.href = '/#/user/tab2'   //跳转到代理/个人-代理管理
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .tab{
    padding: 1rem;
  }
  .nav-item{
    background-color: #f4f1e2;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  }
  .nav-margin-left{
    margin-left: 0.2rem;
  }
  .content{
    width: 100%;
    height: 100%;
    background-color: #f4f1e2;
    border: 0px;
    /*box-shadow: 0rem 0rem 0rem 0rem rgba(0, 0, 0, 0.1);*/
    border-radius: 0rem 0rem 0.2rem 0.2rem;
    min-height: 36rem;
  }
  .tab-str{
    margin-top: 6px;
    font-family: MicrosoftYaHei;
    font-size: 0.5rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #573126;
  }
  .nav-item{
    background-color: #b9b49a;
  }
  .nav-pills .nav-link.active, .nav-pills .show > .nav-link{
    background-color: #f4f1e2;
  }
</style>
