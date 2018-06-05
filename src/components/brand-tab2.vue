<template>
    <div >
        <div class="d-flex justify-content-between">
            <div>
                <select class="m-sel" v-model="selectedCommunityId" @change="onCommunitySelect">
                    <option :value="community.id" v-for="community in communityList">{{community.id}} - {{community.name}}</option>
                </select>
            </div>
            <div>
                <div class="in-btn" @click="showDia"><span>邀请</span></div>
            </div>

        </div>

        <div style="padding-top: 20px;">
            <div class="btn-group" role="group" >
                <button  type="button" class="btn btn-secondary" ><span class="tab-name active" @click="tabSwitch('member')">成员列表</span></button>
                <button  type="button" class="btn btn-secondary"><span class="tab-name" @click="tabSwitch('application')">请求列表</span></button>
                <button  type="button" class="btn btn-secondary"><span class="tab-name" @click="tabSwitch('log')">牌艺馆动态</span></button>
            </div>
        </div>

        <div>
            <table width="100%" v-if="tabSwitchShow.member">
                <tbody>
                <tr v-for="member in communityDetail.members_info">
                    <td>
                        <div class="d-flex justify-content-start">
                            <div class="d-flex align-items-center">
                                <img  width="30px" height="30px" :src="member.headimg" >
                            </div>
                            <div style="margin-left: 0.5rem">
                                <div style="text-align: left" class="mt-0">{{member.nickname}}</div>
                                <div style="text-align: left" >{{member.id}}</div>
                            </div>
                        </div>
                    </td>
                    <td style="padding-right: 1rem" align="right">
                        <a v-on:click=searchZj(member) class="zhanji" href="#">战绩</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a class="kick" href="#" @click="kickOutMember(member.id)">踢出</a>
                    </td>
                </tr>
                </tbody>
            </table>

            <table width="100%" v-if="tabSwitchShow.application">
                <tbody>
                <tr v-for="application in communityDetail.application_data.applications">
                    <td>
                        <div class="d-flex justify-content-start">
                            <div class="d-flex align-items-center">
                                <img  width="30px" height="30px" :src="application.player.headimg" >
                            </div>
                            <div style="margin-left: 0.5rem">
                                <div style="text-align: left" class="mt-0">{{application.player.nickname}}</div>
                                <div style="text-align: left" >{{application.player.id}}</div>
                            </div>
                        </div>
                    </td>
                    <td style="padding-right: 1rem" align="right">
                        <a class="agree" href="#" @click="approveApplication(application.id)">同意</a>&nbsp;&nbsp;&nbsp;&nbsp;
                        <a class="reject" href="#" @click="declineApplication(application.id)">拒绝</a></td>
                </tr>
                </tbody>
            </table>

            <table width="100%" v-if="tabSwitchShow.log">
                <tbody>
                <tr v-for="log in communityDetail.member_log.member_logs">
                    <td>
                        <span class="tname">{{log.player.nickname}}</span>&nbsp;<span class="action">{{log.action}}</span>&nbsp;<span class="tname">牌艺馆</span>
                    </td>
                    <td style="padding-right: 1rem" align="right"><span class="date">{{log.created_at}}</span></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-show="brand_show" class="charges-dialog">

            <div align="left" class="charges-dialog-inner">

                <p class="d-title">邀请成员</p>

                <div class="normal">玩家ID</div>
                <div>
                    <input class="m-input" @input="searchPlayer" v-model="searchPlayerId" />
                </div>

                <table style="margin-top: 0.5rem" width="100%" v-if="searchPlayerResult">
                    <tbody>
                    <tr>
                        <td>
                            <div class="d-flex justify-content-start">
                                <div class="d-flex align-items-center">
                                    <img  width="30px" height="30px" :src="searchPlayerResult.headimg" >
                                </div>
                                <div style="margin-left: 0.5rem">
                                    <div style="text-align: left" class="mt-0">{{searchPlayerResult.nickname}}</div>
                                    <div style="text-align: left" >{{searchPlayerResult.id}}</div>
                                </div>
                            </div>
                        </td>
                        <td style="padding-right: 1rem" align="right"><a class="agree" href="#" @click="inviteMember">邀请</a>&nbsp;&nbsp;&nbsp;</td>
                    </tr>
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
    import {myTools} from '../tools/myTools.js'
    import qs from 'qs'
    import _ from 'lodash'

    export default {
        data () {
            return {
                brand_show:false,

              selectedCommunityId: '',  //已选中的牌艺馆id
              communityDetail: null,
              communitiesIdsApi: '/agent/api/communities',   //获取牌艺馆列表接口
              communityList: [],   //此登陆用户的牌艺馆id数组
              communityDetailApiPrefix: '/agent/api/community/detail/',

              searchPlayerApi: '/api/game/player',
              searchPlayerId: null,
              searchPlayerResult: null,
              invitePlayerApi: '/agent/api/community/member/invitation',
              tabSwitchShow: {
                  'member': true,  //成员列表
                  'application': false, //请求列表
                  'log': false, //牌艺馆动态
              },
              approveApplicationApiPrefix: '/agent/api/community/member/approval-application/',
              declineApplicationApiPrefix: '/agent/api/community/member/decline-application/',
              kickOutPlayerApi: '/agent/api/community/member/kick-out',
            }
        },
        created: function () {
          //获取此代理商的牌艺馆ids
          let _self = this

          myTools.axiosInstance.get(this.communitiesIdsApi)
            .then(function (res) {
              _self.communityList = res.data.communities
              _self.loading = false
            })

          //如果牌艺馆已经被选择
          //console.log(this.$route.params)
          if (this.$route.params) {
            this.selectedCommunityId = this.$route.params.id
            this.communityDetail = this.$route.params
          } else {
            this.$route.push({
              name: 'brandtab1'
            })
          }
        },
        methods: {
          searchZj(member){
            this.communityDetail.currentMemberId = member.id
            this.$router.push({
              name: 'brandtab3',
              params: this.communityDetail,
            })
          },
            showDia(){
                if(this.brand_show == true){
                    this.brand_show = false
                }else{
                    this.brand_show = true
                }
            },
          onCommunitySelect () {
            let _self = this

            myTools.axiosInstance.get(this.communityDetailApiPrefix + this.selectedCommunityId)
              .then(function (res) {
                _self.communityDetail = res.data

                //向brand组件发送牌艺馆详细数据
                _self.$root.eventHub.$emit('brandtab:community-change', _self.communityDetail)
              })
          },
          searchPlayer: _.debounce(function () {
            let _self = this

            myTools.axiosInstance.get(this.searchPlayerApi, {
              params: {
                player_id: this.searchPlayerId,
                community_id: this.selectedCommunityId,
              },
            }).then(function (res) {
              if (_.has(res.data, 'error')) {
                alert(res.data.error)
              } else {
                _self.searchPlayerResult = res.data
              }
            })
          }, 800),
          //邀请玩家加入社区
          inviteMember () {
            let _self = this
            let invitePlayerForm = {
              player_id: this.searchPlayerResult.id,
              community_id: this.selectedCommunityId,
            }

            myTools.axiosInstance.post(this.invitePlayerApi, qs.stringify(invitePlayerForm))
              .then(function (res) {
                if (res.status === 422) {
                  return alert(JSON.stringify(res.data))
                } else {
                  alert('邀请成功')
                  _self.showDia()
                }
              })
          },
          //同意入群申请
          approveApplication (applicationId) {
            let _self = this

            myTools.axiosInstance.post(this.approveApplicationApiPrefix + applicationId)
              .then(function (res) {
                alert(res.data.message)
                _self.onCommunitySelect()  //重新获取数据
              })
          },

          //拒绝入群申请
          declineApplication (applicationId) {
            let _self = this

            myTools.axiosInstance.post(this.declineApplicationApiPrefix + applicationId)
              .then(function (res) {
                alert(res.data.message)
                _self.onCommunitySelect()  //重新获取数据
              })
          },
          //踢出社区
          kickOutMember (playerId) {
            let _self = this
            let kickOutPlayerForm = {
              player_id: playerId,
              community_id: this.selectedCommunityId,
            }

            myTools.axiosInstance.post(this.kickOutPlayerApi, qs.stringify(kickOutPlayerForm))
              .then(function (res) {
                alert(res.data.message)
                _self.onCommunitySelect()  //重新获取数据
              })
          },

          tabSwitch (value) {
            switch (value) {
              case 'member':
                this.tabSwitchShow = {
                  'member': true,  //成员列表
                  'application': false, //请求列表
                  'log': false, //牌艺馆动态
                }
                break
              case 'application':
                this.tabSwitchShow = {
                  'member': false,  //成员列表
                  'application': true, //请求列表
                  'log': false, //牌艺馆动态
                }
                break
              case 'log':
                this.tabSwitchShow = {
                  'member': false,  //成员列表
                  'application': false, //请求列表
                  'log': true, //牌艺馆动态
                }
                break
            }
          },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    span{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #ffffff;
    }
    .btn-group{
        width: 100%;
        background-color: #a35f4b;
    }
    .btn{
        width: 100%;
        border: 0px;
    }
    .btn-secondary{
        width: 100%;
        background-color: #a35f4b;
    }
    .active{
        text-decoration: underline
    }

    .m-sel{
        height: 2rem;
        min-width: 10rem;
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

    .in-btn{
        height: 2rem;
        width: 5rem;
        border-radius: 0.5rem;
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 2rem;
        letter-spacing: 0rem;
        color: #ffffff;
        text-align: center;
        background-color: #f2a231;
    }
    .zhanji{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #e39629;
    }
    .kick{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #e61217;
    }
    .agree{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #089380;
    }
    .reject{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #e61217;
    }
    .date{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #9f7a6f;
    }
    .tname{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #573126;
    }
    .action{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        letter-spacing: 0rem;
        color: #089380;
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

    .m-input{
        height: 2rem;
        width: 100%;
        border: 0px;
        padding-left: 5px;
        padding-right: 5px;
        background-color: #ffffff;
        border-radius: 0.3rem;
    }

</style>
