<template>
    <div >
        <div>
      <div>开始日期：<el-date-picker
      @input="searchBalance"
      class="m-sel"
      v-model="date"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
      </el-date-picker>
      </div>
      <br/>
      <div>结束日期：<el-date-picker
      @input="searchBalance"
      class="m-sel"
      v-model="end_date"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
      </el-date-picker>
      </div>
        </div>

        <div style="margin-top: 0.5rem">
              <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
            <table width="100%" height="80%" style="background-color: #ffffff;" >
                <thead style="background-color: #fffffe;">
                <tr>
                    <th>ID</th>
                    <th>金额</th>
                    <th>提交日期</th>
                    <th>状态</th>
                    <th>备注</th>
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
                <!-- 这里需要分页-->
                </tbody>
            </table>
            </mt-loadmore>
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
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';

  Date.prototype.nformat = function(fmt) { 
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
      charges_show:false,
      allLoaded: false,
      page: 1,
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
  components:{
    'date-picker': myDatepicker
  },
  created: function () {
//        this.date = new Date(new Date().getFullYear(), new Date().getMonth()-1, 1).nformat("yyyy-MM-dd")
//        var date = new Date();
//        var day = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
//        this.end_date = new Date(new Date().getFullYear(), new Date().getMonth()-1, day).nformat("yyyy-MM-dd")
  },
    methods: {
      searchBalance: _.debounce(function () {
        let _self = this
      if (this.date !== '' && this.end_date){
        let url = this.withdrawListApi + '?date=' + this.date + '&end_time=' + this.end_date

        myTools.axiosInstance.get(url)
          .then(function (res) {
            _self.tableDatas = res.data.data   //分页数据
            if(_self.tableDatas.length>0){
              _self.page ++
            }else{
              _self.allLoaded = true
              _self.$refs.loadmore.onBottomLoaded()
            }
          })
      }

      }, 800),
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
//              return alert(JSON.stringify(res.data))
              return alert('请确认信息是否填写完毕')
            }
            return res.data.error ? alert(res.data.error) : alert(res.data.message)
          })
      },
      loadBottom() {
        console.log('loadBottom')

        myTools.axiosInstance.get(this.withdrawListApi)
        .then(function (res) {
            var data  = res.data.data   //分页数据

            if (_this.page == 1) {
                _self.tableDatas.splice(0, _self.tableDatas.length)
            }

            for (var i = 0; i < data.length; i++) {
                _self.tableDatas.push(data[i])
            }

            if(_self.tableDatas.length>0){
                _self.page ++
            }else{
                _self.allLoaded = true
                _self.$refs.loadmore.onBottomLoaded()
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

    myTools.axiosInstance.get(this.withdrawListApi)
      .then(function (res) {
        _self.tableDatas = res.data.data   //分页数据
        if(_self.tableDatas.length>0){
            _self.page ++
        }else{
            _self.allLoaded = true
            _self.$refs.loadmore.onBottomLoaded()
        }
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
    .vue-datepicker input{
        display: block;
        padding-left: 6px;
        border: 0px;
        outline: none;
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
