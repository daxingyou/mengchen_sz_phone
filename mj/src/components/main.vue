<template>
  <div class="main">

    <div class="d-flex justify-content-around bg">
      <div class="d-flex align-items-center">
        <div>
          <div class="d-flex justify-content-start"><span class="player-str">账号：</span><span class="player-value">aaa</span></div>
          <div class="d-flex justify-content-start"><span class="player-str">级别：</span><span class="player-value">11</span></div>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <div>
          <div class="d-flex justify-content-start"><span class="player-str">上级代理：</span><span class="player-value">dd</span></div>
          <div class="d-flex justify-content-start"><span class="player-str">房卡库存：</span><span class="player-value">9999</span></div>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <button class="pay"><span class="pay-str">去充值</span></button>
      </div>
    </div>

    <div class="line"></div>
    <tab></tab>

  </div>
</template>

<script>
import tab from '@/components/tab'

export default {
//  name: 'main',
  components: {
    tab
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  html,body {
    height: 100%;
    background-color: #d8d4bb;
  }
  .main{
    height: 100%;
    background-color: #d8d4bb;
  }
  .bg{
    height:4rem;
    background-color: #00322c;
  }
  .pay{
    width: 4rem;
    height: 2rem;
    background-color: #089380;
    border-radius: 0.2rem;
    border: 0px;
  }
  .pay-str{
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1rem;
    letter-spacing: 0rem;
    color: #c3ead5;
  }
  .player-str{
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #c3ead5;
    text-align: center;
  }
  .player-value{
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0rem;
    color: #eee692;
    text-align: center;
  }
  .line{
    height: 0.2rem;
    background-color: #089380;
  }
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
    font-size: 12px;
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
