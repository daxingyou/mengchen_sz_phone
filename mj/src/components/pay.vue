<template>
    <div>
      <div style="padding-top: 20px;">
        <div class="btn-group" role="group" >
          <!--<router-link to="/pay/tab1">-->
            <button v-on:click="to('/pay/tab1')" type="button" :class=tab1 ><span class="tab-name">自助充值</span></button>
          <!--</router-link>-->
          <!--<router-link to="/pay/tab2">-->
            <button v-on:click="to('/pay/tab2')" type="button" :class=tab2><span class="tab-name">玩家充值</span></button>
          <!--</router-link>-->
          <!--<router-link to="/pay/tab3">-->
            <button v-on:click="to('/pay/tab3')" type="button" :class=tab3><span class="tab-name">牌艺馆充值</span></button>
          <!--</router-link>-->
          <!--<router-link to="/pay/tab4">-->
            <button v-on:click="to('/pay/tab4')" type="button" :class=tab4><span class="tab-name">充值记录</span></button>
          <!--</router-link>-->
        </div>
      </div>

      <div class="pay-tab">
        <router-view></router-view>
      </div>
    </div>

</template>

<script>
export default {
//  name: 'pay',
  data () {
    return {
      tab1: 'btn btn-secondary active',
      tab2: 'btn btn-secondary',
      tab3: 'btn btn-secondary',
      tab4: 'btn btn-secondary'
    }
  },
  created: function () {
    this.$router.push("/pay/tab1")
  },
  watch: {
      "$route": "routeDate"
  },
  methods: {
      routeDate(to, from)
      {
          if("/pay/tab1" === to.path){
              this.tab1 = 'btn btn-secondary active'
              this.tab2 = 'btn btn-secondary'
              this.tab3 = 'btn btn-secondary'
              this.tab4 = 'btn btn-secondary'
          }else if("/pay/tab2" === to.path){
              this.tab1 = 'btn btn-secondary'
              this.tab2 = 'btn btn-secondary active'
              this.tab3 = 'btn btn-secondary'
              this.tab4 = 'btn btn-secondary'
          }else if("/pay/tab3" === to.path){
              this.tab1 = 'btn btn-secondary'
              this.tab2 = 'btn btn-secondary'
              this.tab3 = 'btn btn-secondary active'
              this.tab4 = 'btn btn-secondary'
          }else if("/pay/tab4" === to.path){
              this.tab1 = 'btn btn-secondary'
              this.tab2 = 'btn btn-secondary'
              this.tab3 = 'btn btn-secondary'
              this.tab4 = 'btn btn-secondary active'
          }
      },
      to(path){
          console.log(path)
          this.$router.push(path)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn-group{
    width: 90%;
    border-radius: 5px;
    border: solid 1px #573126;
    background-color: #f4f1e2;

  }
  .btn{
    width: 100%;
    border: 0px;
  }
  .btn-secondary{
    width: 100%;
    background-color: #f4f1e2;
  }
  .tab-name{
    font-family: MicrosoftYaHei;
    font-size: 0.3rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #573126;
  }
  .tab-name .active{
    font-family: MicrosoftYaHei;
    font-size: 0.3rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #f4f1e2;
  }

  .pay-tab{
    margin-top: 0.5rem;
  }

</style>
