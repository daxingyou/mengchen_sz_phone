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
        <div style="margin-left: 1rem;margin-right: 1rem;margin-top: 0.5rem" class="d-flex justify-content-between"  v-if="loading === false">
            <div v-on:click="sel(wxTopUpRuleData[0].id, wxTopUpRuleData[0].price_yuan)" :class=selAct(wxTopUpRuleData[0].price_yuan)>
                <div style="margin-top: 1rem" class="fangka-str">{{ wxTopUpRuleData[0].remark }}</div>
            </div>
            <div v-on:click="sel(wxTopUpRuleData[1].id, wxTopUpRuleData[1].price_yuan)" style="margin-left: 10px;" :class=selAct(wxTopUpRuleData[1].price_yuan)>
                <div class="fangka-str">{{ wxTopUpRuleData[1].remark.split('+')[0] }}</div>
                <div class="fangka-des">额外赠送<span>{{ wxTopUpRuleData[1].give }}</span>张</div>
                <!--<div class="fangka-des"><span>{{ wxTopUpRuleData[1].remark }}</span></div>-->
            </div>
        </div>
        <div style="margin-left: 1rem;margin-right: 1rem;margin-top: 0.5rem" class="d-flex justify-content-between" v-if="loading === false">
            <div v-on:click="sel(wxTopUpRuleData[2].id, wxTopUpRuleData[2].price_yuan)" :class=selAct(wxTopUpRuleData[2].price_yuan)>
                <div class="fangka-str">{{ wxTopUpRuleData[2].remark.split('+')[0] }}</div>
                <div class="fangka-des">额外赠送<span>{{ wxTopUpRuleData[2].give }}</span>张</div>
                <!--<div class="fangka-des"><span>{{ wxTopUpRuleData[2].remark }}</span></div>-->
            </div>
            <div v-on:click="sel(wxTopUpRuleData[3].id, wxTopUpRuleData[3].price_yuan)" style="margin-left: 10px;" :class=selAct(wxTopUpRuleData[3].price_yuan)>
                <div class="fangka-str">{{ wxTopUpRuleData[3].remark.split('+')[0] }}</div>
                <div class="fangka-des">额外赠送<span>{{ wxTopUpRuleData[3].give }}</span>张</div>
                <!--<div class="fangka-des"><span>{{ wxTopUpRuleData[3].remark }}</span></div>-->
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
            <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn" @click="createWxOrder"><span>提交订单</span></div>
        </div>


        <div v-show="pay_dia_show" class="charges-dialog">


            <div align="center" class="charges-dialog-inner">
                <p class="d-title" align="center">使用微信扫码支付</p>

                <img style="margin-top:1rem" :src=ercode />
            </div>

            <div v-on:click=showNewDia() class="close">
                <img height="20px" src="../assets/btn_close.png"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {myTools} from '../tools/myTools.js'
    import qs from 'qs'

export default {
  data () {
    return {
      pay_money:0,
      pay_type:'wechat',
      ercode:'', 
      wxOrderNum: null, //创建订单wx订单规则id号
      loading: true,
      wxTopUpRuleData: [],
      wxTopUpRuleApi: '/agent/api/wx-top-up-rules',
      orderCreationApi: '/api/wechat/order',
      pay_dia_show: false
    }
  },
  methods:{
      showNewDia(){
        if (this.pay_dia_show == true) {
          this.pay_dia_show = false
        } else {
          this.pay_dia_show = true
        }
      },
      sel(orderId, money){
        this.wxOrderNum = orderId
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
        if (pay_type === 'cash') {
          alert('功能暂未开放！')
          return this.pay_type = 'wechat'
        }
          this.pay_type = pay_type
      },
      selPayTypeCss(pay_type){
          if(this.pay_type == pay_type){
              return 'fangka active d-flex justify-content-center align-items-center'
          }else{
              return 'fangka d-flex justify-content-center align-items-center'
          }
      },
      createWxOrder () {
        if (! this.wxOrderNum) {
          return alert('请先选择订单')
        }
        let _self = this
        myTools.axiosInstance.post(this.orderCreationApi, qs.stringify({
          'wx_top_up_rule_id': this.wxOrderNum
        }))
          .then(function (res) {
            // 弹出微信支付二维码
            console.log('success', res.data)
            _self.ercode = "data:image/png;base64," + res.data.order_qr_code
            _self.showNewDia()
            
          })
          .catch(function (err) {
            alert(err)
          })
      },
  },
  created () {
    let _self = this

    myTools.axiosInstance.get(this.wxTopUpRuleApi)
      .then(function (res) {
        _self.wxTopUpRuleData = res.data
        _self.loading = false

        _self.sel(_self.wxTopUpRuleData[0].id, _self.wxTopUpRuleData[0].price_yuan)
      })
  },
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

    .charges-dialog {
        position: fixed;
        top: 4rem;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color: #0000007F;
        padding: 1rem;
        z-index: 10;
    }

    .charges-dialog-inner {
        width: 100%;
        height: 100%;
        background-color: #f4f1e2;
        box-shadow: 0rem 0rem 0rem 0rem rgba(0, 0, 0, 0.1);
        border-radius: 1rem;
        padding: 1rem;
    }

    .close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
    }

    .d-title{
        margin-top: 0.5rem;
        font-family: MicrosoftYaHei-Bold;
        font-size: 1.5rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
    }
</style>
