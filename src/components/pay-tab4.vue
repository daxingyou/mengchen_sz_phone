<template>
  <div>
    <div style="margin-top: 0.5rem">
      <div>
        <select v-model="currentOrderType" v-on:change="changeOrderType()" class="m-input">
          <option :value="key" v-for="(type, key) in orderType" v-show="agentShow(key)">{{type}}</option>
          <!--todo 这里不同的不同的订单（微信，玩家充值等）接口返回字段是不一样的，下面tbody得同步修改（暂不处理）-->
        </select>
      </div>
    </div>
    <!--微信订单-->
    <div style="margin-top: 0.5rem" v-show="showRecord.wechat">
      <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">

        <table width="91%" style="margin-left: 1.1rem">
          <thead style="background-color: #fffffe;">
          <tr>
            <th v-on:click="wechat_sort('id')" :class="wechat_sort_name=='id'?'sort_active':''" >ID</th>
            <th v-on:click="wechat_sort('body')" :class="wechat_sort_name=='body'?'sort_active':''" width="140px" >订单说明</th>
            <th v-on:click="wechat_sort('order_status_name')" :class="wechat_sort_name=='order_status_name'?'sort_active':''" width="80px" >订单状态</th>
            <th v-on:click="wechat_sort('item_delivery_status_name')" :class="wechat_sort_name=='item_delivery_status_name'?'sort_active':''" width="80px">发货状态</th>
            <th v-on:click="wechat_sort('created_at')" :class="wechat_sort_name=='created_at'?'sort_active':''" width="80px">创建时间</th>
            <th v-on:click="wechat_sort('paid_at')" :class="wechat_sort_name=='paid_at'?'sort_active':''" width="80px">支付时间</th>
            <th  width="60px">操作</th>
          </tr>
          </thead>
          <tbody v-if="loading === false">
          <tr v-for="tableData in tableDatas">
            <td align="left">{{tableData.id}}</td>
            <td align="left">{{tableData.body}}</td>
            <td align="left">{{tableData.order_status_name}}</td>
            <td align="left">{{tableData.item_delivery_status_name}}</td>
            <td align="left">{{tableData.created_at}}</td>
            <td align="left">{{tableData.paid_at}}</td>
            <td  class="caozuo" @click="pay(tableData.id)" v-if="tableData.order_status === 2">支付</td>
          </tr>
          </tbody>
          <!-- 这里需要分页-->
        </table>
      </mt-loadmore>

    </div>
    <!--玩家充值记录-->
    <div style="margin-top: 0.5rem" v-show="showRecord.player">
      <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">

        <table width="91%" style="margin-left: 1.1rem">
          <thead style="background-color: #fffffe;">
          <tr>
            <th :class="player_sort_name=='player'?'sort_active':''" v-on:click="player_sort('player')" >玩家id</th>
            <th :class="player_sort_name=='amount'?'sort_active':''" v-on:click="player_sort('amount')">充值房卡数</th>
            <th :class="player_sort_name=='created_at'?'sort_active':''" v-on:click="player_sort('created_at')">充值时间</th>
          </tr>
          </thead>
          <tbody v-if="loading === false">
          <tr v-for="tableData in tableDatas">
            <td>{{tableData.player}}</td>
            <td>{{tableData.amount}}</td>
            <td>{{tableData.created_at}}</td>
          </tr>
          </tbody>
          <!-- 这里需要分页-->
        </table>
      </mt-loadmore>

    </div>

    <!--牌艺馆充值记录-->
    <div style="margin-top: 0.5rem" v-show="showRecord.community">
      <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">

        <table width="91%" style="margin-left: 1.1rem">
          <thead style="background-color: #fffffe;">
          <tr>
            <th :class="community_sort_name=='id'?'sort_active':''" v-on:click="community_sort('id')">id</th>
            <th :class="community_sort_name=='community_id'?'sort_active':''" v-on:click="community_sort('community_id')">牌艺馆id</th>
            <th :class="community_sort_name=='item_amount'?'sort_active':''" v-on:click="community_sort('item_amount')">充值房卡数</th>
            <th :class="community_sort_name=='created_at'?'sort_active':''" v-on:click="community_sort('created_at')">充值时间</th>
          </tr>
          </thead>
          <tbody v-if="loading === false">
          <tr v-for="tableData in tableDatas">
            <td>{{tableData.id}}</td>
            <td>{{tableData.community_id}}</td>
            <td>{{tableData.item_amount}}</td>
            <td>{{tableData.created_at}}</td>
          </tr>
          </tbody>
          <!-- 这里需要分页-->
        </table>
      </mt-loadmore>

    </div>

    <!--代理商充值记录-->
    <div style="margin-top: 0.5rem" v-show="showRecord.agent">
      <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">

        <table width="91%" style="margin-left: 1.1rem">
          <thead style="background-color: #fffffe;">
          <tr>
            <th :class="agent_sort_name=='id'?'sort_active':''" v-on:click="agent_sort('id')">id</th>
            <th :class="agent_sort_name=='receiver'?'sort_active':''" v-on:click="agent_sort('receiver')">子代理商</th>
            <th :class="agent_sort_name=='amount'?'sort_active':''" v-on:click="agent_sort('amount')">充值房卡数</th>
            <th :class="agent_sort_name=='created_at'?'sort_active':''" v-on:click="agent_sort('created_at')">充值时间</th>
          </tr>
          </thead>
          <tbody v-if="loading === false">
          <tr v-for="tableData in tableDatas">
            <td>{{tableData.id}}</td>
            <td>{{tableData.receiver ? tableData.receiver.account : ''}}</td>
            <td>{{tableData.amount}}</td>
            <td>{{tableData.created_at}}</td>
          </tr>
          </tbody>
          <!-- 这里需要分页-->
        </table>
      </mt-loadmore>

    </div>

    <div v-show="pay_dia_show" class="charges-dialog">

      <div align="center" class="charges-dialog-inner">
        <p class="d-title" align="center">使用微信扫码支付</p>
        <img height="200" width="200" :src=ercode style="margin-top:1rem"/>
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
        ercode: '',
        pay_dia_show: false,
        orderType: {
          wechat: '微信订单',
          player: '玩家充值记录',
          community: '牌艺馆充值记录',
          agent: '代理商充值记录'
        },
        currentOrderType: 'wechat',
        tableDatas: [],
        loading: true,
        wxOrdersApi: '/api/wechat/order/agent', //微信订单
        playerRecordApi:'/agent/api/top-up/player', //玩家充值记录
        communityRecordApi:'/agent/api/community/card/top-up-history?item_type_id=1', //牌艺馆充值记录
        agentRecordApi:'/agent/api/top-up/child', //代理商充值记录
        agentInfoApi: '/api/info', //当前登录用户

        wxOrder: {},  //点击了支付之后的订单详情对象
        currentAgentInfo: {},
        showRecord:{
          wechat:true,
          player:false,
          community:false,
          agent:false,
        },
        wechat_sort_name:'',
        wechat_sort_type:'',
        player_sort_name:'',
        player_sort_type:'',
        community_sort_name:'',
        community_sort_type:'',
        agent_sort_name:'',
        agent_sort_type:'',

      }
    },
    methods: {
      changeOrderType: function () {
        console.log(this.currentOrderType)
        this.page = 1
        switch (this.currentOrderType){
          case 'wechat':
            this.showRecord.wechat = true
            this.showRecord.player = false
            this.showRecord.community = false
            this.showRecord.agent = false
            this.tableAxios(this.wxOrdersApi)
            break;
          case 'player':
            this.showRecord.wechat = false
            this.showRecord.player = true
            this.showRecord.community = false
            this.showRecord.agent = false
            this.tableAxios(this.playerRecordApi)
            break;
          case 'community':
            this.showRecord.wechat = false
            this.showRecord.player = false
            this.showRecord.community = true
            this.showRecord.agent = false
            this.tableAxios(this.communityRecordApi)
            break;
          case 'agent':
            this.showRecord.wechat = false
            this.showRecord.player = false
            this.showRecord.community = false
            this.showRecord.agent = true
            this.tableAxios(this.agentRecordApi)

            break;
        }

      },
      agentShow(key){
        if (key == 'agent'){
          if (this.currentAgentInfo.group_id != 4){
            return true
          }
          return false
        }
        return true
      },
      showNewDia: function () {
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
      //todo 上拉加载没用
      loadBottom() {
        console.log('loadBottom')
        let _self = this
        myTools.axiosInstance.get(this.wxOrdersApi )
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
      tableAxios(url){
        let _self = this
        myTools.axiosInstance.get(url)
          .then(function (res) {
            _self.tableDatas = res.data.data   //分页数据
            _self.loading = false
            if (_self.tableDatas.length > 0) {
              _self.page++
            }
          })
        console.log(this.tableDatas)
      },
      wechat_sort(name){
        this.wechat_sort_name = name
        if(this.wechat_sort_type == "desc" ){
          this.wechat_sort_type = "asc"
        }else{
          this.wechat_sort_type = "desc" 
        }
        console.info(this.wechat_sort_name+"%7" + this.wechat_sort_type )

        this.tableAxios(this.wxOrdersApi +"?sort=" + this.wechat_sort_name+"%7C" + this.wechat_sort_type)
      },
      player_sort(name){
        this.player_sort_name = name
        if(this.player_sort_type == "desc" ){
          this.player_sort_type = "asc"
        }else{
          this.player_sort_type = "desc" 
        }
        console.info(this.player_sort_name+"%7" + this.player_sort_type )

        this.tableAxios(this.playerRecordApi +"?sort=" + this.player_sort_name+"%7C" + this.player_sort_type)
      },
      community_sort(name){
        this.community_sort_name = name
        if(this.community_sort_type == "desc" ){
          this.community_sort_type = "asc"
        }else{
          this.community_sort_type = "desc" 
        }
        console.info(this.community_sort_name+"%7" + this.community_sort_type )

        this.tableAxios(this.communityRecordApi +"&sort=" + this.community_sort_name+"%7C" + this.community_sort_type)
      },
      agent_sort(name){
        this.agent_sort_name = name
        if(this.agent_sort_type == "desc" ){
          this.agent_sort_type = "asc"
        }else{
          this.agent_sort_type = "desc" 
        }
        console.info(this.agent_sort_name+"%7" + this.agent_sort_type )

        this.tableAxios(this.agentRecordApi +"?sort=" + this.agent_sort_name+"%7C" + this.agent_sort_type)
      }
    },
    created () {
      let _self = this
      this.changeOrderType('wechat');
      //当前登录
      myTools.axiosInstance.get(this.agentInfoApi)
        .then(function (res) {
          if (res.status === 401) {
            return window.location.href = '/#/login'   //未登陆，跳转登陆页面
          }
          _self.currentAgentInfo = res.data
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-input {
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

  table th {
    background-color: #a35f4b;
    font-family: MicrosoftYaHei;
    font-size: 0.5rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #ffffff;
  }

  table td {
    font-family: MicrosoftYaHei;
    font-size: 0.5rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #573126;
  }

  .caozuo {
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
  .sort_active{
    color:rgb(255,0,0);
  }
</style>
