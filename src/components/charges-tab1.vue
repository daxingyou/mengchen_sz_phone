<template>
  <div :class=main_div>
    <div style="padding-left: 2.5rem;padding-right: 2.5rem;padding-top: 0.5rem;padding-bottom: 0.5rem"
         class="d-flex justify-content-between bg">
      <div>
        <div class="name">累计收入</div>
        <div class="value">{{statisticsData.rebate_count}}</div>
      </div>
      <div>
        <div class="name">已提现</div>
        <div class="value">{{statisticsData.has_withdrawal}}</div>
      </div>
      <div>
        <div class="name">可提现</div>
        <div class="value">{{statisticsData.rebate_balance}}</div>
      </div>
    </div>
    <img v-on:click=showDia() style="float: right;margin-right: 0.6rem;margin-top: -3.4rem" height="15px"
         src="../assets/help.png"/>
    <div>
      <!--todo 添加日期选择器
      <select class="m-sel">
        <option value="2018-05-31">2018-05-31</option>
      </select>
      -->
      开始日期：<date-picker
        class="m-sel"
        field="myDate"
        placeholder="选择日期"
        v-model="date"
        format="yyyy-mm-dd"
        @input="searchBalance"></date-picker>
      结束日期：<date-picker
        class="m-sel"
        field="myDate"
        placeholder="选择日期"
        v-model="end_date"
        format="yyyy-mm-dd"
        @input="searchBalance"></date-picker>
    </div>
    <div style="margin-top: 0.5rem">
      <table width="100%">
        <thead style="background-color: #fffffe;">
        <tr>
          <th>ID</th>
          <th>提供代理商</th>
          <th>代理级别</th>
          <th>当月充值</th>
          <th>月份</th>
          <th>比例%</th>
          <th>返利金额</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="tableData in tableDatas">
          <td>{{tableData.id}}</td>
          <td>{{tableData.children.name}}</td>
          <td>{{tableData.children.group.name}}</td>
          <td>{{tableData.total_amount}}</td>
          <td>{{tableData.rebate_at}}</td>
          <td>{{tableData.rule.rate}}</td>
          <td>{{tableData.rebate_price}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-show="charges_show" class="charges-dialog">

      <div align="left" class="charges-dialog-inner">
        <p class="d-title">佣金说明</p>

        <p class="normal">佣金 = <span class="orange">个人月充值总额</span> X <span class="orange">对应提成比例</span></p>

        <p class="normal">提成比例表：</p>

        <table width="100%">
          <thead style="background-color: #fffffe;">
          <tr align="center">
            <th align="center">月充值总额</th>
            <th align="center">提成比例</th>
            <th align="center">佣金</th>
          </tr>
          </thead>
          <tbody style="background-color: #ffffff">
          <tr v-for="rule in RulesData">
            <td align="center">{{rule.price}}+</td>
            <td align="center"><span class="orange">{{rule.rate}}%</span></td>
            <td align="center">{{calcRebate(rule.price, rule.rate)}}+</td>
          </tr>
          </tbody>
        </table>
        <p style="margin-top: 0.5rem" class="normal">
          假设您通过经营生产的月充值金额达到3万，
          可享受的提成比例为15%那么您当月的佣金
          收益为 <span class="orange">3万x15%=4500</span> 元
                </p>

        <div class="d-flex justify-content-start ">
          <div class="yuan">&nbsp;&nbsp;</div>
          <div class="normal">每月结束后系统会按照当月业绩计算佣金并加入可提现金额。</div>
        </div>


        <div class="d-flex justify-content-start normal">
          <div class="yuan">&nbsp;&nbsp;</div>
          <div class="normal">佣金可在代理后台通过微信提现方式获取。</div>
        </div>

      </div>

      <div v-on:click=showDia() class="close">
        <img height="20px" src="../assets/btn_close.png"/>
      </div>
    </div>
  </div>

</template>

<script>
  import {myTools} from '../tools/myTools.js'
  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';

  Date.prototype.format = function(fmt) { 
      var o = { 
          "M+" : this.getMonth()+1,                 //月份 
          "d+" : this.getDate(),                    //日 
          "h+" : this.getHours(),                   //小时 
          "m+" : this.getMinutes(),                 //分 
          "s+" : this.getSeconds(),                 //秒 
          "q+" : Math.floor((this.getMonth()+3)/3), //季度 
          "S"  : this.getMilliseconds()             //毫秒 
      }; 
      if(/(y+)/.test(fmt)) {
              fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      }
      for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
      return fmt; 
  }

  export default {
    data () {
      return {
        date: '',
        end_date: '',
        charges_show: false,
        tableDatas: [],
        statisticsData: [],
        RulesData: [],
        statisticsApi: '/agent/api/rebates/statistics',
        tableUrl: '/agent/api/rebates',
        rebateRules: '/admin/api/rebate-rules',
        main_div:''
      }
    },
    components: {
      'date-picker': myDatepicker
    },
    created: function () {
      let _self = this
      myTools.axiosInstance.get(this.rebateRules)
        .then(function (res) {
          _self.RulesData = res.data.data
        })
      myTools.axiosInstance.get(this.statisticsApi)
        .then(function (res) {
          _self.statisticsData = res.data
        })
      myTools.axiosInstance.get(this.tableUrl)
        .then(function (res) {
          _self.tableDatas = res.data.data   //分页数据
        })

        _self.date = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1).format("yyyy-MM-dd")
        var date = new Date();
        var day = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
        _self.end_date = new Date(new Date().getFullYear(), new Date().getMonth()-1, day).format("yyyy-MM-dd")
        console.info("_self.date: "+ _self.date)
        console.info("_self.end_date: "+ _self.end_date)
    },
    methods: {
      searchBalance: _.debounce(function () {
        let _self = this
        let url = this.tableUrl + '?date=' + this.date

        myTools.axiosInstance.get(url)
          .then(function (res) {
            _self.tableDatas = res.data.data   //分页数据
          })
      }, 800),
      calcRebate(price, rate){
        return price * (rate / 100)
      },
      showDia(){
        if (this.charges_show == true) {
          this.charges_show = false
          this.main_div = ''
        } else {
          this.charges_show = true
          this.main_div = 'no-scroll'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .no-scroll{
     overflow:hidden; 
  }
  .bg {
    background-color: #b9b49a;
    border-radius: 0.5rem;
  }

  .name {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #573126;
  }

  .value {
    font-family: MicrosoftYaHei-Bold;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #fe3d23;
  }

  .m-sel {
    height: 2rem;
    width: 100%;
    border: 0px;
    margin-top: 0.5rem;
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

  .charges-dialog {
    position: absolute;
    top: 4rem;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #0000007F;
    padding: 1rem;
    z-index: 10;
    overflow-y:scroll;  
    overflow-x:hidden; 
    /*display: none;*/
  }

  .charges-dialog-inner {
    width: 100%;
    height: 90%;
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

  .normal {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #573126;
    text-align: left;
  }

  .orange {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 0rem;
    color: #f24e1e;
  }

  .yuan {
    /*width: 1rem;*/
    /*height: 1rem;*/
    /*background-color: #a35f4b;*/
    /*border: solid 0.1rem #a35f4b;*/
    /*border-radius: 0.5rem;*/
    margin-top: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    background: #a35f4b;
    -moz-border-radius: 0.25rem;
    -webkit-border-radius: 0.25rem;
    border-radius: 0.25rem;
    margin-right: 0.5rem;
  }

  .d-title {
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
