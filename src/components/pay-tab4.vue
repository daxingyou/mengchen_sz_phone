<template>
    <div>
        <div style="margin-top: 0.5rem">
            <div>
                <select v-model="orderType" v-on:change="" class="m-input">
                    <option :value="orderType" selected>{{orderType}}</option>
                    <!--<option value="2">2</option>-->
                    <!--todo 这里不同的不同的订单（微信，玩家充值等）接口返回字段是不一样的，下面tbody得同步修改（暂不处理）-->
                </select>
            </div>
        </div>
        <div style="margin-top: 0.5rem">
            <table width="91%" style="margin-left: 1.1rem">
                <thead style="background-color: #fffffe;">
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            订单说明
                        </th>
                        <th>
                            订单状态
                        </th>
                        <th>
                            发货状态
                        </th>
                        <th>
                            创建时间
                        </th>
                        <th>
                            支付时间
                        </th>
                        <th>
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody v-if="loading === false">
                    <tr v-for="tableData in tableDatas">
                        <td>{{tableData.id}}</td>
                        <td>{{tableData.body}}</td>
                        <td>{{tableData.order_status_name}}</td>
                        <td>{{tableData.item_delivery_status_name}}</td>
                        <td>{{tableData.created_at}}</td>
                        <td>{{tableData.paid_at}}</td>
                        <td class="caozuo" @click="pay(tableData.id)">支付</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
    import {myTools} from '../tools/myTools.js'

export default {
  name: 'pay',
  data () {
    return {
        orderType: '微信订单',
        tableDatas:[],
        loading: true,
      wxOrdersApi: '/api/wechat/order/agent',
      wxOrder: {},  //点击了支付之后的订单详情对象
    }
  },
    methods:{
        pay: function (id) {
          let _self = this

          //请求单个订单数据（含有支付二维码）
          myTools.axiosInstance.get(this.wxOrdersApi + '/' + id)
            .then(function (res) {
              _self.wxOrder = res.data
              console.log('todo, 弹出支付二维码')
              //todo 弹出支付二维码弹窗
              //返回的数据字段order_qr_code的值为base64之后的图片字符串
            })
        },
    },
    created () {
      let _self = this

      myTools.axiosInstance.get(this.wxOrdersApi)
        .then(function (res) {
          _self.tableDatas = res.data.data   //分页数据
          _self.loading = false
        })
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .m-input{
        height: 2rem;
        width: 90%;
        border: 0px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        padding-left: 5px;
        padding-right: 5px;
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
    .caozuo{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 0.5rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #089380;
    }
</style>
