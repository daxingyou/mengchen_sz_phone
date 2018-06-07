<template>
<div style="min-height: 30rem;height: 100%">

    <div class="d-flex justify-content-between">
        <div v-on:click=showNewDia() class="pay-btn"><span>创建牌艺馆</span></div>
    </div>
    <div>
        <select class="m-sel"  >
            <option >1</option>
        </select>
    </div>


    <mt-loadmore bottomPullText="上拉加载更多" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                :bottom-all-loaded="allLoaded" ref="loadmore">
            <table width="100%" >
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            名称
                        </th>
                        <th>
                            成员数
                        </th>
                        <th>
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        1
                    </td>
                    <td>
                        2
                    </td>
                    <td>
                        4
                    </td>
                    <td>
                        <span>待审核</span>
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
                <input class="m-input" v-model="createCommunityFormData.gameId"/>
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
                <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
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


  export default {
        data () {
            return {
              create_show:false,
              allLoaded: false,
              page: 1,
              loading: true,
              createCommunityFormData: {
                gameId: '',
                name: '',
                info: '',
              },
            }
        },
        created: function () {
            this.list()
        },
        methods: {
            showNewDia(){
                if(this.create_show == true){
                    this.create_show = false
                }else{
                    this.create_show = true
                }
            },
            list(){
                let _self = this

                // this.selectedCommunityId = this.$route.params.id

                // myTools.axiosInstance.get(this.communityRoomApi+this.selectedCommunityId + "?page=" + this.page)
                //     .then(function (res) {
                //     _self.roomData = res.data
                //     _self.loading = false

                //     if(_self.roomData.length > 0){
                //         _self.page++
                //     }else{
                //         _self.allLoaded = true
                //         //_self.$refs.loadmore.onBottomLoaded()
                //     }
                //     })
                // console.log(this.roomData)
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
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bg{
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
    .m-sel{
        height: 2rem;
        width: 100%;
        border: 0px;
        margin-top: 0.5rem;
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

    .charges-dialog{
        position: fixed;
        top:4rem;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color:#0000007F;
        padding: 1rem;
        display: none;
    }
    .charges-dialog-inner{
        width: 100%;
        height:100%;
        background-color: #f4f1e2;
        box-shadow: 0rem 0rem 0rem 0rem rgba(0, 0, 0, 0.1);
        border-radius: 1rem;
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
