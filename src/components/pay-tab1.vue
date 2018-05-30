<template>
    <div>
        <div class="d-flex justify-content-start">
            <div style="margin-left: 1rem">
                <img height="20px" src="../assets/title_dot.png"/>
            </div>
            <div style="margin-left: 0.5rem">
                <span style="text-align: center">购买房卡</span>
            </div>
        </div>
        <div style="margin-left: 1rem;margin-right: 1rem;margin-top: 0.5rem" class="d-flex justify-content-between">
            <div v-on:click="sel(100)" :class=selAct(100)>
                <div style="margin-top: 1rem" class="fangka-str">100张</div>
            </div>
            <div v-on:click="sel(300)" style="margin-left: 10px;" :class=selAct(300)>
                <div class="fangka-str">300张</div>
                <div class="fangka-des">额外赠送<span>200</span>张</div>
            </div>
        </div>
        <div style="margin-left: 1rem;margin-right: 1rem;margin-top: 0.5rem" class="d-flex justify-content-between">
            <div v-on:click="sel(1000)" :class=selAct(1000)>
                <div class="fangka-str">1000张</div>
                <div class="fangka-des">额外赠送<span>200</span>张</div>
            </div>
            <div v-on:click="sel(2000)" style="margin-left: 10px;" :class=selAct(2000)>
                <div class="fangka-str">2000张</div>
                <div class="fangka-des">额外赠送<span>500</span>张</div>
            </div>
        </div>
        <div class="fangka-ps">
            注：首次充值任意金额额外赠送50%房卡。
        </div>

        <div style="margin-top: 0.5rem" class="d-flex justify-content-start">
            <div style="margin-left: 1rem">
                <img height="20px" src="../assets/title_dot.png"/>
            </div>
            <div style="margin-left: 0.5rem">
                <span style="text-align: center">支付方式</span>
            </div>
        </div>
        <div style="margin-left: 1rem;margin-right: 1rem;margin-top: 0.5rem" class="d-flex justify-content-between">
            <div v-on:click="selPayType('wechat')" :class="selPayTypeCss('wechat')" >
                <div><img height="28px" src="../assets/icon_wechat.png"/></div>
                <div class="pay-str">微信支付</div>
            </div>
            <div v-on:click="selPayType('cash')" style="margin-left: 10px;" :class="selPayTypeCss('cash')" >
                <div><img height="28px" src="../assets/icon_money.png"/></div>
                <div class="pay-str">返现金支付</div>
            </div>
        </div>
        <div style="margin-top: 2rem;margin:0 auto">
            <div class="pay-have-pay">应付金额</div>
            <div class="pay-real-pay">{{pay_money}}元</div>
            <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交订单</span></div>
        </div>
    </div>
</template>

<script>
export default {
//  name: 'pay',
  data () {
    return {
        pay_money:0,
        pay_type:'wechat',
    }
  },
  methods:{
      sel(money){
          this.pay_money = money;
      },
      selAct(sel){
          if(sel == this.pay_money){
              return 'fangka active'
          }else{
              return 'fangka'
          }
      },
      selPayType(pay_type){
          this.pay_type = pay_type
      },
      selPayTypeCss(pay_type){
          if(this.pay_type == pay_type){
              return 'fangka active d-flex justify-content-center align-items-center'
          }else{
              return 'fangka d-flex justify-content-center align-items-center'
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .fangka{
        height: 55px;
        width: 100%;
        background-color: #dad5bb;
        border-radius: 5px;
    }
    .active{
        background-color: #a1957a;
    }
    .fangka-ps{
        margin-top: 0.5rem;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #9f7a6f;
    }
    .fangka-str{
        margin-top: 5px;
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #573126;
    }
    .fangka-des{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
        margin-bottom: 5px;
    }
    .pay-str{
        margin-left: 0.5rem;
        font-family: MicrosoftYaHei;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #573126;
    }
    .pay-have-pay{
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #573126;
    }
    .pay-real-pay{
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #f14b1b;
    }
    .pay-btn{
        margin-top: 1rem;
        height: 3rem;
        width: 11rem;
        background-color: #41af11;
        border-radius: 0.5rem;
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 3rem;
        letter-spacing: 0rem;
        color: #ffffff;
        text-align: center;
    }
</style>
