<template>
    <div>
        <div style="margin-top: 0.5rem" class="d-flex justify-content-start">
            <div style="margin-left: 1rem">
                <img height="20px" src="../assets/title_dot.png"/>
            </div>
            <div style="margin-left: 0.5rem">
                <span style="text-align: center" class="pay-tab-title">购买房卡</span>
            </div>
        </div>
        <div style="margin-top: 1rem">
            <div style="margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
                <div class="user-font" @input="searchBalance">玩家ID</div>
                <div class="user-font">玩家房卡余量：<span class="user-fangka">{{ playerBalanceMsg }}</span></div>
            </div>

            <div>
                <input v-model="formData.player_id" class="m-input" @input="searchBalance" />
            </div>
        </div>
        <div style="margin-top: 1rem">
            <div style="margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
                <div class="user-font">充值数量</div>
            </div>

            <div>
                <input v-model="formData.pay_num" class="m-input"/>
            </div>

            <div style="margin-top: 2.5rem;">
                <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn" @click="topUpPlayer"><span>提交订单</span></div>
            </div>
        </div>
    </div>

</template>

<script>
    import {myTools} from '../tools/myTools.js'
    import qs from 'qs'
    import _ from 'lodash'

    window.confirm = function (message) {
            var iframe = document.createElement("IFRAME");
            iframe.style.display = "none";
            iframe.setAttribute("src", 'data:text/plain,');
            document.documentElement.appendChild(iframe);
            var alertFrame = window.frames[0];
            var result = alertFrame.window.confirm(message);
            iframe.parentNode.removeChild(iframe);
            return result;
    };

export default {
//  name: 'pay',
  data () {
    return {
      formData: {
        type_id: 1, //道具类型
        player_id: '',
        pay_num: '',    //充值数量
      },
      playerBalanceMsg: '',
      searchPlayerApi: '/api/game/player',
      topUpApiPrefix: '/agent/api/top-up/player',
      agentInfoApi: '/api/info',
    }
  },
  methods:{
    searchBalance: _.debounce(function () {
      this.playerBalanceMsg = ''
      let _self = this

      if (! this.formData.player_id) {
        return true
      }

      myTools.axiosInstance.get(this.searchPlayerApi, {
        params: { player_id: _self.formData.player_id },
      })
        .then(function (res) {
          if (res.data.error) {
            _self.playerBalanceMsg = res.data.error
          } else {
            let player = res.data
            _self.playerBalanceMsg = player.ycoins
          }
        })
    }, 800),

    topUpPlayer () {
      if (! this.formData.player_id || ! this.formData.pay_num) {
        return alert('玩家id或充值数量不能为空')
      }
      let _self = this
      let api = `${this.topUpApiPrefix}/${this.formData.player_id}/${this.formData.type_id}/${this.formData.pay_num}`

        if(this.formData.player_id.length !== 6){
            this.playerBalanceMsg = "玩家不存在"
            return;
        }else{
            this.playerBalanceMsg = ''
        }


        let r = confirm("是否给玩家（ID:"+this.formData.player_id+"）充值"+this.formData.pay_num+"张房卡？")
        console.log("r="+r)
        if (r==true){

            myTools.axiosInstance.post(api)
                .then(function (res) {
                if (res.data.error) {
        //            alert(res.data.error)
                    if (res.data.error.match(new RegExp(/account_not_found/))) {
                    alert('玩家id不存在！')
                    } else {
                    alert(res.data.error)
                    }
                } else {
                    alert(res.data.message)
                    //充值成功获取当前代理商的信息，更新main信息
                    _self.updateInfo()
                    _self.searchBalance()   //刷新玩家房卡余量
                }
                _self.formData.pay_num = ''
                })
        }
    },

    updateInfo () {
      let _self = this
      myTools.axiosInstance.get(this.agentInfoApi)
        .then(function (res) {
          _self.$root.eventHub.$emit('main:info', res.data)
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pay-tab-title{
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1rem;
        letter-spacing: 0rem;
        color: #573126;
    }
    .user-font{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
    }
    .user-fangka{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #f14b1b;
    }
    .m-input{
        height: 2rem;
        width: 92%;
        border: 0px;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        padding-left: 5px;
        padding-right: 5px;
        background-color: #ffffff;
        border-radius: 0.3rem;
    }
    .pay-btn{
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
