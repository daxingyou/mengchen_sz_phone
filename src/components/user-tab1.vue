<template>
  <div >
    <div class="d-flex justify-content-between">
      <div v-on:click=showNewDia() class="pay-btn"><span>新建子代理商</span></div>
      <div><input class="m-input"/></div>
    </div>

    <div style="margin-top: 0.5rem">
      <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                   :bottom-all-loaded="allLoaded" ref="loadmore">
        <table width="100%" height="80%" style="background-color: #ffffff;">
          <thead style="background-color: #fffffe;">
          <tr>
            <th>
              ID

            </th>
            <th>
              账号

            </th>
            <th>
              昵称

            </th>
            <th>
              房卡

            </th>
            <!-- <th>
                充值金额额
            </th> -->
            <th>
              操作

            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="info in mTableData">
            <td>{{info.id}}</td>
            <td>{{info.account}}</td>
            <td>{{info.name}}</td>
            <td>{{filterInventorys(info.inventorys)}}</td>
            <!-- <td>未发货</td> -->
            <td><a v-on:click=showChildDia(info) href="#">充值</a>&nbsp;&nbsp;
              <a v-on:click=showChangeDia(subagent_id,info) href="#">修改</a>&nbsp;&nbsp;
              <!-- 删除需要加一个二次确认的弹窗-->
              <a @click="destroy(info.id)" href="#">删除</a></td>
          </tr>
          </tbody>
        </table>
      </mt-loadmore>
    </div>

    <div v-show="user_dia_show_new" class="charges-dialog">

      <div align="left" class="charges-dialog-inner">

        <p class="d-title">新建子代理商</p>

        <div class="normal">账号</div>
        <div>
          <input v-model="createFormData.account" class="m-input"/>
        </div>

        <div class="normal">密码</div>
        <div>
          <input v-model="createFormData.password" class="m-input"/>
        </div>

        <div class="normal">昵称</div>
        <div>
          <input v-model="createFormData.name" class="m-input"/>
        </div>

        <div class="normal">代理类型</div>
        <div>
          <select v-model="createFormData.group_id" class="m-sel">
            <option value="2">总代</option>
            <option value="3">钻石</option>
            <option value="4">黄金</option>
          </select>
        </div>

        <div style="margin-top: 1rem;">
          <div v-on:click=create() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
        </div>
      </div>

      <div v-on:click=showNewDia() class="close">
        <img height="20px" src="../assets/btn_close.png"/>
      </div>
    </div>

    <div v-show="user_dia_show_child" class="charges-dialog">

      <div align="left" class="charges-dialog-inner">
        <p class="d-title">子代理商充值</p>

        <div class="normal">代理账号</div>
        <div>
          <input v-model="payFormData.account" class="m-input"/>
        </div>

        <div class="normal">充值房卡数量</div>
        <div>
          <input v-model="payFormData.amount" class="m-input"/>
        </div>

        <div style="margin-top: 1rem;">
          <div v-on:click=pay() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
        </div>
      </div>

      <div v-on:click=showChildDia() class="close">
        <img height="20px" src="../assets/btn_close.png"/>
      </div>
    </div>

    <div v-show="user_dia_show_change" class="charges-dialog">

      <div align="left" class="charges-dialog-inner">
        <p class="d-title">修改子代理商信息</p>

        <div class="normal">账号</div>
        <div>
          <input v-model="changeFormData.account" class="m-input"/>
        </div>

        <div class="normal">昵称</div>
        <div>
          <input v-model="changeFormData.name" class="m-input"/>
        </div>

        <div class="normal">密码</div>
        <div>
          <input v-model="changeFormData.password" class="m-input"/>
        </div>

        <div style="margin-top: 1rem;">
          <div v-on:click=change() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
        </div>
      </div>

      <div v-on:click=showChangeDia(0,changeFormData) class="close">
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
  var mTableData = []
  export default {
    data () {
      return {
        allLoaded: false,
        user_dia_show_new: false,
        user_dia_show_child: false,
        user_dia_show_change: false,
        subagent_id: '',
        createFormData: {
          account: '',
          group_id: '',
          name: '',
          password: '',
          password_confirmation: ''
        },
        changeFormData: {
          name: '',
          account: '',
          password: '',
          //email:'',
          //phone:''
        },
        payFormData: {
          account: '',
          item_type: '1',
          amount: ''
        },
        page: 1,
        mTableData: mTableData,
      }
    },
    created: function () {
      this.list()
    },
    methods: {
      list(){
        let _this = this
        myTools.axiosInstance.get('/agent/api/subagent?page=' + this.page)
          .then(function (response) {
            if (response.status === 200) {
              var data = response.data.data
              if (_this.page == 1) {
                mTableData.splice(0, mTableData.length)
              }
              for (var i = 0; i < data.length; i++) {
                mTableData.push(data[i])
              }
              //console.info("this.mTableData")
              //console.info(mTableData)
              if (data.length == 0) {
                _this.allLoaded = true
                _this.$refs.loadmore.onBottomLoaded()
              } else {
                _this.page++
              }
            } else {
              alert(JSON.stringify(response.data.data))
            }
          })
          .catch(function (err) {
            alert(err)
          })
      },
      create() {
        var _this = this;
        this.createFormData.password_confirmation = this.createFormData.password
        //console.info(this.createFormData)
        myTools.axiosInstance.post('/agent/api/subagent', qs.stringify(this.createFormData))
          .then(function (response) {
            if (response.status === 422) {
              alert(JSON.stringify(response.data))
            } else {
              //console.info(response)
              alert(response.data.message)
              _this.showNewDia()
              //_this.list() //TODO 这里报错
            }
          })
          .catch(function (err) {
            alert(err)
          })
      },
      change() {
        var _this = this;
        myTools.axiosInstance.post('/agent/api/subagent/' + this.changeFormData.id, qs.stringify(this.changeFormData))
          .then(function (response) {
            if (response.status === 200) {
              //console.info(response)
              _this.showChangeDia(0)
            } else {
              alert(JSON.stringify(response.data.data))
            }
          })
          .catch(function (err) {
            alert(err)
          })
      },
      pay() {
        var _this = this;
        let r = confirm("是否给玩家（ID:"+this.payFormData.account+"）充值"+this.payFormData.amount+"张房卡？")
        //console.log("r="+r)
        if (r==true){

          myTools.axiosInstance.post('/agent/api/top-up/child/' + this.payFormData.account + '/1/' + this.payFormData.amount + '', qs.stringify(this.payFormData))
            .then(function (response) {
              if (response.status === 422) {
                alert(JSON.stringify(response.data))
              } else {
                //console.info(response)
                alert(response.data.error ? response.data.error : response.data.message)
                _this.showChildDia()
              }
            })
            .catch(function (err) {
              alert(err)
            })
        }
      },
      destroy(id){
        let r = confirm("确定删除？")
        if (r==true){
          var _this = this;
          myTools.axiosInstance.delete('/agent/api/subagent/' + id)
            .then(function (response) {
              if (response.status === 422) {
                alert(JSON.stringify(response.data))
              } else {
                //console.info(response)
                alert(response.data.error ? response.data.error : response.data.message)
              }
            })
            .catch(function (err) {
              alert(err)
            })
        }
      },
      showNewDia(){
        if (this.user_dia_show_new == true) {
          this.user_dia_show_new = false
        } else {
          this.user_dia_show_new = true
        }
      },
      showChildDia(info = ''){
        if (info != ''){
          this.payFormData = info
        }

        if (this.user_dia_show_child == true) {
          this.user_dia_show_child = false
        } else {
          this.user_dia_show_child = true
        }
      },
      showChangeDia(subagent_id, info = ''){
        if (info != '') {
          this.changeFormData = info
        }

        this.subagent_id = subagent_id
        if (this.user_dia_show_change == true) {
          this.user_dia_show_change = false
        } else {
          this.user_dia_show_change = true
        }
      },
      loadBottom() {
        console.log('loadBottom')
        this.list()
        //最后一页
        // this.allLoaded = true
        // this.$refs.loadmore.onBottomLoaded()
      },
      handleBottomChange(status) {
        console.log("status:" + status)
        if (status == 'pull') {
        } else if (status == 'drop') {
        } else if (status == 'loading') {
        } else {
        }
      },
      filterInventorys(inventorys){
        //console.info(JSON.stringify(inventorys))
        var invent = 0
        if (inventorys.length > 0) {
          for (var i = 0; i <= inventorys.length; i++) {
            if (inventorys[i].item_id == 1) {
              invent = inventorys[i].stock
              break
            }
          }
        }
        return invent
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .m-sel {
    height: 2rem;
    width: 100%;
    border: 0px;
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

  .pay-btn {
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

  .pay-btn {
    height: 2rem;
    width: 60%;
    background-color: #41af11;
    border-radius: 0.5rem;
    font-family: MicrosoftYaHei-Bold;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 2rem;
    letter-spacing: 0rem;
    color: #ffffff;
    text-align: center;
  }

  .m-input {
    height: 2rem;
    width: 100%;
    border: 0px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #ffffff;
    border-radius: 0.3rem;
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


</style>
