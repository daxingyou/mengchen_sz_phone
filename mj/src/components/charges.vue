<template>
    <div style="padding-left: 1rem;padding-right: 1rem">
        <div style="padding-top: 20px;">
            <div class="btn-group" role="group" >
                <button v-on:click="to('/charges/tab1')" type="button" :class=tab1 ><span class="tab-name">我的佣金</span></button>
                <button v-on:click="to('/charges/tab2')" type="button" :class=tab2><span class="tab-name">提现申请</span></button>
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
        tab1: 'btn btn-secondary active',
        tab2: 'btn btn-secondary',
    }
  },
  created: function () {
      this.$router.push("/charges/tab1")
  },
  watch: {
      "$route": "routeDate"
  },
    methods: {
        routeDate(to, from)
        {
            if("/charges/tab1" === to.path){
                this.tab1 = 'btn btn-secondary active'
                this.tab2 = 'btn btn-secondary'
            }else if("/charges/tab2" === to.path){
                this.tab1 = 'btn btn-secondary'
                this.tab2 = 'btn btn-secondary active'
            }
        },
        to(path){
            console.log(path)
            this.$router.push(path)
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
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #573126;
    }
    .tab-name .active{
        font-family: MicrosoftYaHei;
        font-size: 0.3rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #f4f1e2;
    }

    .pay-tab{
        margin-top: 0.5rem;
    }


</style>
