<template>
    <div style="padding-left: 1rem;padding-right: 1rem">
        <div style="padding-top: 20px;">
            <div class="btn-group" role="group" >
                <button v-on:click="to('brandtab1')" type="button" :class=tab1 ><span class="tab-name">牌艺馆信息</span></button>
                <button v-on:click="to('brandtab2')" type="button" :class=tab2><span class="tab-name">成员管理</span></button>
                <button v-on:click="to('brandtab3')" type="button" :class=tab3><span class="tab-name">战绩管理</span></button>
                <button v-on:click="to('brandtab4')" type="button" :class=tab4><span class="tab-name">房间管理</span></button>
            </div>
        </div>

        <div class="pay-tab">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
export default {

    data () {
        return {
            tab1: 'btn btn-secondary',
            tab2: 'btn btn-secondary',
            tab3: 'btn btn-secondary',
            tab4: 'btn btn-secondary',
            tab5: 'btn btn-secondary',
            communityDetail: null,
        }
    },
    created: function () {
      let _self = this

      this.$router.push("/brand/tab5")

      this.$root.eventHub.$on('brandtab:community-change', function (data) {
        _self.communityDetail = data
        //console.log('get event', _self.communityDetail)
      })
    },
    watch: {
        "$route": "routeDate"
    },
    methods: {
        routeDate(to, from)
        {
          //console.log(to)
            if("/brand/tab1" === to.path){
                this.tab1 = 'btn btn-secondary active'
                this.tab2 = 'btn btn-secondary'
                this.tab3 = 'btn btn-secondary'
                this.tab4 = 'btn btn-secondary'                
                this.tab5 = 'btn btn-secondary'
            }else if("/brand/tab2" === to.path){
                this.tab1 = 'btn btn-secondary'
                this.tab2 = 'btn btn-secondary active'
                this.tab3 = 'btn btn-secondary'
                this.tab4 = 'btn btn-secondary'
                this.tab5 = 'btn btn-secondary'
            }else if("/brand/tab3" === to.path){
                this.tab1 = 'btn btn-secondary'
                this.tab2 = 'btn btn-secondary'
                this.tab3 = 'btn btn-secondary active'
                this.tab4 = 'btn btn-secondary'
                this.tab5 = 'btn btn-secondary'
            }else if("/brand/tab4" === to.path){
                this.tab1 = 'btn btn-secondary'
                this.tab2 = 'btn btn-secondary'
                this.tab3 = 'btn btn-secondary'
                this.tab4 = 'btn btn-secondary active'
                this.tab5 = 'btn btn-secondary'
            }else if("/brand/tab5" === to.path){
                this.tab1 = 'btn btn-secondary'
                this.tab2 = 'btn btn-secondary'
                this.tab3 = 'btn btn-secondary'
                this.tab4 = 'btn btn-secondary'
                this.tab5 = 'btn btn-secondary active'
            }
        },
        to(path){
            //console.log(path)

          //如果用户选择了community，则可以跳转到其他tab，否则跳转到tab1
          if (this.communityDetail) {
            this.$router.push({
              name: path,
              params: this.communityDetail,
            })
          } else {
            if (path !== 'brandtab1') {
              alert('请先选择牌艺馆')
            }
            this.$router.push({
              name: 'brandtab1',
            })
          }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn-group{
        width: 100%;
        border-radius: 5px;
        border: solid 1px #573126;
        background-color: #f4f1e2;
    }
    .btn{
        width: 100%;
        border: 0px;
    }
    .btn-secondary{
        width: 100%;
        background-color: #f4f1e2;
    }
    .tab-name{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        color: #573126;
    }
    .tab-name .active{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        color: #f4f1e2;
    }

    .active span{
        font-family: MicrosoftYaHei;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        color: #f4f1e2;
    }

    .pay-tab{
        margin-top: 0.5rem;
    }
</style>
