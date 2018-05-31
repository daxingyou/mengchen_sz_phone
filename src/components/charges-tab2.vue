<template>
    <div >
        <div>
            <select class="m-sel">
                <!--todo 这里是一个日期选择器，选择之后自动查询此时间的提现申请列表-->
                <option value="2018-05-01">2018-05-01</option>
            </select>
        </div>

        <div style="margin-top: 0.5rem">
            <table width="100%" height="80%" style="background-color: #ffffff;" >
                <thead style="background-color: #fffffe;">
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        金额
                    </th>
                    <th>
                        提交日期
                    </th>
                    <th>
                        状态
                    </th>
                    <th>
                        备注
                    </th>
                </tr>
                </thead>
                <tbody v-if="loading === false">
                <tr v-for="tableData in tableDatas">
                    <td>{{tableData.id}}</td>
                    <td>{{tableData.amount}}</td>
                    <td>{{tableData.created_at}}</td>
                    <td>{{tableData.withdrawal_status}}</td>
                    <td>{{tableData.remark}}</td>
                </tr>
                <!--todo 这里需要分页-->
                </tbody>
            </table>
        </div>
        <div style="margin-top: 1rem;">
            <div v-on:click=showDia() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>申请提现</span></div>
        </div>

        <div v-show="charges_show" class="charges-dialog">

            <div class="charges-dialog-inner">
                <p class="d-title">申请提现</p>

                <div class="normal">联系方式类型</div>
                <div>
                    <select class="m-sel" v-model="withdrawFormData.contact_type">
                        <option value="0">微信</option>
                        <option value="1">电话</option>
                    </select>
                </div>


                <div class="normal">联系方式</div>
                <div>
                    <input class="m-input" v-model="withdrawFormData.contact"/>
                </div>


                <div class="normal">提现金额（元）</div>
                <div v-if="loading === false">
                    <select class="m-sel" v-model="withdrawFormData.amount">
                        <option :value="withdrawLimit" v-for="withdrawLimit in withdrawLimits">{{ withdrawLimit }}</option>
                    </select>
                </div>
                <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn" @click="applyWithdraw"><span>提交申请</span></div>

            </div>

            <div v-on:click=showDia() class="close">
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
      charges_show:false,

      withdrawFormData: {
        amount: 500,
        contact: '',
        contact_type: 0,
      },
      loading: true,
      withdrawListApi: '/agent/api/withdrawals',
      withdrawLimitApi: '/agent/api/withdrawals/amount-limit',  //提现金额限制api
      tableDatas: [],
      withdrawLimits: [],   //提现金额限制
    }
  },
    methods: {
        showDia(){
            if(this.charges_show == true){
                this.charges_show = false
            }else{
                this.charges_show = true
            }
        },

      applyWithdraw () {
        myTools.axiosInstance.post(this.withdrawListApi, qs.stringify(this.withdrawFormData))
          .then(function (res) {
            if (res.status === 422) {
              return alert(JSON.stringify(res.data))
            }
            return res.data.error ? alert(res.data.error) : alert(res.data.message)
          })
      },
    },
  created () {
    let _self = this

    myTools.axiosInstance.get(this.withdrawListApi)
      .then(function (res) {
        _self.tableDatas = res.data.data   //分页数据
      })

    myTools.axiosInstance.get(this.withdrawLimitApi)
      .then(function (res) {
        _self.withdrawLimits = res.data
        _self.loading = false
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .m-sel{
        height: 2rem;
        width: 100%;
        border: 0px;
        background-color: #ffffff;
        border-radius: 0.3rem;
    }
    table th{
        background-color:  #a35f4b;
        font-family: MicrosoftYaHei;
        font-size: 0.5rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #ffffff;
    }
    table td{
        font-family: MicrosoftYaHei;
        font-size: 0.5rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #573126;
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

    .m-input{
        height: 2rem;
        width: 100%;
        border: 0px;
        padding-left: 5px;
        padding-right: 5px;
        background-color: #ffffff;
        border-radius: 0.3rem;
    }

    .charges-dialog{
        position: fixed;
        top:4rem;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color:#0000007F;
        padding: 1rem;
        z-index: 10;
        /*display: none;*/
    }
    .charges-dialog-inner{
        width: 100%;
        height:100%;
        background-color: #f4f1e2;
        box-shadow: 0rem 0rem 0rem 0rem rgba(0, 0, 0, 0.1);
        border-radius: 1rem;
        padding: 1rem;
    }
    .close{
        position: absolute;
        top:1.5rem;
        right: 1.5rem;
    }

    .normal{
        margin-top: 1rem;
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
        text-align: left;
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
