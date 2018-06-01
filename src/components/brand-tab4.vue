<template>
    <div style="background-color: #ffffff;min-height: 30rem;height: 100%">

        <div v-for="room in roomData" style="padding: 0.5rem">
            <div class="d-flex justify-content-between">
                <div class="brand-title" style="padding: 0.1rem">
                    <span class="brand-desc">{{room.rtype}}</span>
                    <span class="brand-desc">房号:{{room.rid}}</span>
                    <span class="brand-desc">{{room.time}}</span>
                </div>
                <div class="normal">
                    {{room.cur_round}}/{{room.max_round}}
                </div>
            </div>
            <div style="margin-top: 0.5rem" class="d-flex justify-content-start">
                <div v-for="player in room.players" align="center">
                    <div align="center"><img height="30px" :src="player.headimg"/></div>
                    <div align="center">{{player.nickname}}</div>
                    <div align="center">{{player.uid}}</div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
  import {myTools} from '../tools/myTools.js'

  export default {
        data () {
            return {
              loading: true,
              roomData:[],
              communityRoomApi: '/agent/api/community/room/',   //获取牌艺馆id列表接口
              selectedCommunityId: '',  //已选中的牌艺馆id
            }
        },
        created: function () {
          let _self = this

          this.selectedCommunityId = this.$route.params.id

          myTools.axiosInstance.get(this.communityRoomApi+this.selectedCommunityId)
            .then(function (res) {
              _self.roomData = res.data
              _self.loading = false
            })
          console.log(this.roomData)
        },
        methods: {
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
</style>
