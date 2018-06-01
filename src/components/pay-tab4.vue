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
        <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        
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
                <!-- 这里需要分页-->
            </table>
        </mt-loadmore>

        </div>

        <div v-show="pay_dia_show" class="charges-dialog">

            <div align="center" class="charges-dialog-inner">
                <img style="margin-top:1rem" :src=ercode ></img>
            </div>

            <div v-on:click=showNewDia() class="close">
                <img height="20px" src="../assets/btn_close.png"/>
            </div>
        </div>
    </div>

</template>

<script>
    import {myTools} from '../tools/myTools.js'
      import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  name: 'pay',
  data () {
    return {
        allLoaded: false,
        page: 1,
        ercode:'', 
        pay_dia_show: false,
        orderType: '微信订单',
        tableDatas:[],
        loading: true,
      wxOrdersApi: '/api/wechat/order/agent',
      wxOrder: {},  //点击了支付之后的订单详情对象
    }
  },
    methods:{
        showNewDia: function (){
            if (this.pay_dia_show == true) {
            this.pay_dia_show = false
            } else {
            this.pay_dia_show = true
            }
        },
        pay: function (id) {
          let _self = this

          //请求单个订单数据（含有支付二维码）
          myTools.axiosInstance.get(this.wxOrdersApi + '/' + id)
            .then(function (res) {
              _self.wxOrder = res.data
              //console.log('todo, 弹出支付二维码')
              _self.ercode = "data:image/png;base64," + res.data.order_qr_code
              _self.showNewDia()
              // 弹出支付二维码弹窗
              //返回的数据字段order_qr_code的值为base64之后的图片字符串
            })
        },
        loadBottom() {
            console.log('loadBottom')
                  let _self = this

            myTools.axiosInstance.get(this.wxOrdersApi)
                .then(function (res) {
                let data = res.data.data   //分页数据
                _self.loading = false

                    if (_self.page == 1) {
                        _self.tableDatas.splice(0, _self.tableDatas.length)
                    }
                    for (var i = 0; i < data.length; i++) {
                        _self.tableDatas.push(data[i])
                    }
                    if (data.length == 0) {
                        _self.allLoaded = true
                        _self.$refs.loadmore.onBottomLoaded()
                    } else {
                        _self.page++
                    }
                })
        },
        handleBottomChange(status) {
            console.log("status:" + status)
            if (status == 'pull') {
            } else if (status == 'drop') {
            } else if (status == 'loading') {
            } else {
            }
        },
    },
    created () {
      let _self = this

      myTools.axiosInstance.get(this.wxOrdersApi)
        .then(function (res) {
          _self.tableDatas = res.data.data   //分页数据
          _self.loading = false
          if(_self.tableDatas.length > 0){
              _self.page++
          }
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
</style>
