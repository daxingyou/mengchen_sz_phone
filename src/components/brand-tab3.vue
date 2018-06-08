<template>
  <div>
    <div align="left">
      <span class="normal">玩家ID</span>
      <input class="m-input" v-model="searchRecordForm.player_id"/>
    </div>
    <!--todo 时间选择器报错-->
    <div align="left">
      <span class="normal">时间</span>
      <el-date-picker
      class="m-sel"
      v-model="searchRecordForm.start_time"
      type="date"
      placeholder="选择日期">
      </el-date-picker>
      <span class="normal">至</span>
      <el-date-picker
      class="m-sel"
      v-model="searchRecordForm.end_time"
      type="date"
      placeholder="选择日期">
      </el-date-picker>
    </div>
    <div align="left" style="margin-left: 2rem;margin-top: 0.5rem;">
      <a href="#" @click="changeSearchRecordDate('today')">今天</a>&nbsp;&nbsp;&nbsp;
      <a href="#" @click="changeSearchRecordDate('yesterday')">昨天</a>&nbsp;&nbsp;&nbsp;
      <a href="#" @click="changeSearchRecordDate('1week')">七天</a>
    </div>
    <div class="normal" align="right" style="margin-top: 0.5rem" v-if="playerGameRecords">
      未审查房间数：{{ playerGameRecords.unread_records }}

    </div>
    <div style="margin-top: 0.5rem" v-if="playerGameRecords">
      <table width="100%">
        <thead style="background-color: #fffffe;">
        <tr>
          <th>日期</th>
          <th>房间信息</th>
          <th>局数</th>
          <th>详情</th>
          <th>状态</th>
        </tr>
        </thead>
        <tbody style="background-color: #FFFFFF">
        <tr v-for="record in playerGameRecords.records">
          <td>{{record.time}}</td>
          <td>房号：{{record.rid}}</td>
          <td>{{ record.cur_round + '/' + record.max_round}}</td>
          <td><a v-on:click=showDia(record) href="#">详情</a></td>
          <td><a @click="markRecord(record.record_info.id)" href="#">审查</a></td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-show="brand_show" class="charges-dialog" v-if="recordDetail">

      <div align="left" class="charges-dialog-inner">

        <p class="d-title">战绩详情</p>

        <div style="padding: 1rem;	background-color: #dad5bb;border-radius: 1rem;">
          <div>{{recordDetail.time}} <span class="gray">至</span> {{recordDetail.end_time }}</div>

          <div class="d-flex justify-content-between">
            <div align="left"><span class="gray">房号：</span>{{recordDetail.rid}}</div>
            <div style="min-width: 8rem" align="left"><span class="gray">房主：</span>{{recordDetail.creator.nickname}}
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <div align="left"><span class="gray">局数：</span>{{recordDetail.cur_round}}局</div>
            <!--<div style="min-width: 8rem" align="left"><span class="gray">玩法：</span>景德镇麻将</div>-->
          </div>


          <div class="d-flex justify-content-between">
            <!--<div align="left"><span class="gray">回放码：</span>123123</div>-->
            <div style="min-width: 8rem" align="left">&nbsp;</div>
          </div>

        </div>


        <table style="margin-top: 1rem" width="100%">
          <tbody>
          <tr v-for="v in [1,2,3,4]">
            <td>
              <div class="d-flex justify-content-start">
                <div class="d-flex align-items-center">
                  <img width="30px" height="30px" :src="recordDetail['player'+v].headimg">
                </div>
                <div style="margin-left: 0.5rem">
                  <div style="text-align: left" class="mt-0">{{recordDetail['player' + v].nickname}}</div>
                  <div style="text-align: left">{{recordDetail['player' + v].id}}</div>
                </div>
              </div>
            </td>
            <td style="padding-right: 1rem" align="right"><span class="add">{{ recordDetail['score_' + v] }}</span></td>
          </tr>
          <!--<tr>-->
          <!--<td>-->
          <!--<div class="d-flex justify-content-start">-->
          <!--<div class="d-flex align-items-center">-->
          <!--<img  width="30px" height="30px" src="../assets/btn_close.png" >-->
          <!--</div>-->
          <!--<div style="margin-left: 0.5rem">-->
          <!--<div style="text-align: left" class="mt-0">xxx</div>-->
          <!--<div style="text-align: left" >xxxx</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</td>-->
          <!--<td style="padding-right: 1rem" align="right"> <span class="minus">-300</span></td>-->
          <!--</tr>-->
          </tbody>
        </table>


      </div>

      <div v-on:click=showDia() class="close">
        <img height="20px" src="../assets/btn_close.png"/>
      </div>
    </div>
  </div>

</template>

<script>

  import myDatepicker from 'vue-datepicker-simple/datepicker-2.vue';
  import {myTools} from '../tools/myTools.js'
  import qs from 'qs'
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    data () {
      return {
        dateFormat: 'YYYY-MM-DD',
        dateHFormat: 'YYYY-MM-DD HH:mm:ss',
        date: '',
        brand_show: false,
        searchRecordApiPrefix: '/agent/api/community/game-record/',
        markRecordApiPrefix: '/agent/api/community/game-record/mark/',
        readCommunityLogPrefix: '/agent/api/community/member/log/read/',
        searchRecordForm: {
          player_id: null,
          start_time: null,
          end_time: null,
        },
        selectedCommunityId: null,
        communityDetail: null,
        playerGameRecords: null,   //战绩数据
        recordDetail: null,   //战绩详情数据
      }
    },
    created: function () {
      //如果牌艺馆已经被选择
      console.log(this.$route.params)
      if (this.$route.params) {
        this.selectedCommunityId = this.$route.params.id
        this.communityDetail = this.$route.params
        this.searchRecordForm.player_id = this.$route.params.currentMemberId
      } else {
        this.$route.push({
          name: 'brandtab1',
        })
      }

      this.changeSearchRecordDate('year')
      //获取战绩数据（接js临时使用）
//      let _self = this
//      myTools.axiosInstance.get(this.searchRecordApiPrefix + 10009, {
//        params: {
//          'start_time': _self.searchRecordForm.start_time = moment().add(-1, 'year').startOf('day').format(this.dateHFormat),
//          'end_time': _self.searchRecordForm.end_time = moment().endOf('day').format(this.dateHFormat),
//        },
//      })
//        .then(function (res) {
//          _self.playerGameRecords = res.data
//          console.log(_self.playerGameRecords)
//        })

    },
    methods: {
      //更新查询玩家战绩的开始结束时间
      changeSearchRecordDate (date) {
        switch (date) {
          case 'today':
            this.searchRecordForm.start_time = moment().startOf('day').format(this.dateFormat)
            this.searchRecordForm.end_time = moment().endOf('day').format(this.dateFormat)
            break
          case 'yesterday':
            this.searchRecordForm.start_time = moment().add(-1, 'days').startOf('day').format(this.dateFormat)
            this.searchRecordForm.end_time = moment().endOf('day').format(this.dateFormat)
            break
          case '3days':
            this.searchRecordForm.start_time = moment().add(-2, 'days').startOf('day').format(this.dateFormat)
            this.searchRecordForm.end_time = moment().endOf('day').format(this.dateFormat)
            break
          case '1week':
            this.searchRecordForm.start_time = moment().add(-6, 'days').startOf('day').format(this.dateFormat)
            this.searchRecordForm.end_time = moment().endOf('day').format(this.dateFormat)
            break;
          default:
            this.searchRecordForm.start_time = moment().add(-1, 'year').startOf('day').format(this.dateFormat)
            this.searchRecordForm.end_time = moment().endOf('day').format(this.dateFormat)
            break
        }
        this.searchRecord()
      },
      showDia(record){
        this.recordDetail = record
        if (this.brand_show == true) {
          this.brand_show = false
        } else {
          this.brand_show = true
        }
      },
      searchRecord: _.debounce(function () {
        let _self = this
        let search = {
          start_time: this.searchRecordForm.start_time + ' 00:00:00',
          end_time: this.searchRecordForm.end_time + ' 23:59:59',
        };
        if (this.searchRecordForm.player_id) {
          search.player_id = this.searchRecordForm.player_id
        }
        myTools.axiosInstance.get(this.searchRecordApiPrefix + this.communityDetail.id, {
          params: search,
        })
          .then(function (res) {
            if (res.status === 422) {
              return alert(JSON.stringify(res.data))
            }
            _self.playerGameRecords = res.data
            console.log(_self.playerGameRecords)
          })
      }, 800),
      markRecord (recordInfoId) {
        let _self = this
        let api = this.markRecordApiPrefix + recordInfoId
        myTools.axiosInstance.post(api)
          .then(function (res) {
            alert('标记成功')
            _self.searchRecord()  //刷新数据
          })
      },
    },
    components: {
      'date-picker': myDatepicker
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    width: 11rem;
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
    position: fixed;
    top: 4rem;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: #0000007F;
    padding: 1rem;
    z-index: 10;
    /*display: none;*/
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

  .normal {
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

  .gray {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #9f7a6f;
  }

  .add {
    font-family: MicrosoftYaHei-Bold;
    font-size: 1.5rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #f24c1c;
  }

  .minus {
    font-family: MicrosoftYaHei-Bold;
    font-size: 1.5rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1.5rem;
    letter-spacing: 0rem;
    color: #089380;
  }
</style>
