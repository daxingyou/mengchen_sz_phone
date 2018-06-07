<template>
  <div style="min-height: 30rem;height: 100%">

    <div class="d-flex justify-content-between">
        <div v-on:click=showNewDia() class="create-btn"><span>创建牌艺馆</span></div>
        <div>
            <select class="m1-sel" v-model="selectedStatusId" @change="selectedStatus()" >
                <option :value="key" v-for="(item,key) in statusOptions">{{item}}</option>
            </select>
        </div>
    </div>


    <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                 :bottom-all-loaded="allLoaded" ref="loadmore">
      <table width="100%">
        <thead>
        <tr>
          <th>ID</th>
          <th>名称</th>
          <th>成员数</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="community in communityData">
          <td>{{community.id}}</td>
          <td>{{community.name}}</td>
          <td>{{community.members_count}}</td>
          <td>
            <span v-if="community.status === 0">待审核</span>
            <a v-if="community.status === 1" href="#" @click="jumpCommunityInfo(community)">管理</a>
            <span v-if="community.status === 2">审核不通过</span>
          </td>
        </tr>
        </tbody>
      </table>
    </mt-loadmore>


    <div v-show="create_show" class="charges-dialog">

      <div align="left" class="charges-dialog-inner">
        <p class="d-title">创建牌艺馆</p>

        <div class="normal">游戏ID</div>
        <div>
          <input class="m-input" v-model="createCommunityFormData.owner_player_id"/>
        </div>

        <div class="normal">牌艺馆名称</div>
        <div>
          <input class="m-input" v-model="createCommunityFormData.name"/>
        </div>

        <div class="normal">牌艺馆简介</div>
        <div>
          <input class="m-input" v-model="createCommunityFormData.info"/>
        </div>


        <div style="margin-top: 1rem;">
          <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn" @click="store()"><span>提交</span></div>
        </div>
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
  import qs from 'qs'

  export default {
    data () {
      return {
        create_show: false,
        allLoaded: false,
        page: 1,
        loading: true,
        selectedStatusId:3,
        statusOptions: [
          '待审核', '已审核', '审核不通过', '全部',
        ],
        communityData:{},
        tableUrl: '/agent/api/community',
        createCommunityFormData: {
          owner_player_id: '',
          name: '',
          info: '',
        },
      }
    },
    created: function () {
      this.list()
    },
    methods: {
      store (){
        let _self = this
        myTools.axiosInstance.post(this.tableUrl, qs.stringify(this.createCommunityFormData))
          .then(function (response) {
            if (response.status === 422) {
              alert(JSON.stringify(response.data))
            } else {
              //console.info(response)
              alert(response.data.message)
              _self.showNewDia()
              _self.list()
            }
          })
          .catch(function (err) {
            alert(err)
          })
      },
      jumpCommunityInfo(community){
        this.$router.push({
          name : 'brandtab1',
          params : community
        })
      },
      selectedStatus(){
        this.list()
      },
    showNewDia(){
        console.info("showNewDia")
        if(this.create_show == true){
            this.create_show = false
        }else{
            this.create_show = true
            this.list()
        }
    },
    loadBottom() {
        console.log('loadBottom')
        this.list()
    },
    handleBottomChange(status) {
        console.log("status:" + status)
        if (status == 'pull') {
        } else if (status == 'drop') {
        } else if (status == 'loading') {
        } else {
        }
    },
    list(){
        let _self = this
        myTools.axiosInstance.get(this.tableUrl + "?status=" + this.selectedStatusId)
            .then(function (res) {
            _self.communityData = res.data.data
            _self.loading = false
            if(_self.communityData.length > 0){
                _self.page++
            }else{
                _self.allLoaded = true
                //_self.$refs.loadmore.onBottomLoaded()
            }
            })
        // console.log(this.roomData)
    }
    } 
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background-color: #b9b49a;
    border-radius: 0.5rem;
  }
    .name{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
    }
    .value{
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #fe3d23;
    }
    .m1-sel{
        height: 2rem;
        width: 8rem;
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


  .brand-title {
    background-color: #a35f4b;
    border-radius: 0.5rem;
  }
  .player-name {
    font-family: MicrosoftYaHei;
    font-size: 1rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #573126;
  }

  .player-id {
    font-family: MicrosoftYaHei;
    font-size: 0.5rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 1rem;
    letter-spacing: 0rem;
    color: #9f7a6f;
  }

  .brand-desc {
    font-family: MicrosoftYaHei;
    font-size: 0.5rem;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #fffffe;
  }


    .charges-dialog{
        position: fixed;
        top:4rem;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color:#0000007F;
        padding: 1rem;
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
    .brand-title{
        background-color: #a35f4b;
        border-radius: 0.5rem;
    }
    .normal{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
    }
    .player-name{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #573126;
    }
    .player-id{
        font-family: MicrosoftYaHei;
        font-size: 0.5rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1rem;
        letter-spacing: 0rem;
        color: #9f7a6f;
    }
    .brand-desc{
        font-family: MicrosoftYaHei;
        font-size: 0.5rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #fffffe;
    }
    .create-btn{
        height: 2rem;
        width: 8rem;
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
