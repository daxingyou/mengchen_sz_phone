<template>
    <div style="padding-left: 1rem;padding-right: 1rem">
        <div style="padding-top: 20px;">
            <div class="btn-group" role="group" >
                <button v-on:click="to('/user/tab1')" type="button" :class=tab1 ><span class="tab-name">代理管理</span></button>
                <button v-on:click="to('/user/tab2')" type="button" :class=tab2><span class="tab-name">个人中心</span></button>
            </div>
        </div>

        <div class="pay-tab">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
export default {
//  name: 'pay',
  data () {
    return {
        tab1: 'btn btn-secondary active',
        tab2: 'btn btn-secondary',
    }
  },
    created: function () {
        this.$router.push("/user/tab1")
    },
    watch: {
        "$route": "routeDate"
    },
    methods: {
        routeDate(to, from)
        {
            if("/user/tab1" === to.path){
                this.tab1 = 'btn btn-secondary active'
                this.tab2 = 'btn btn-secondary'
            }else if("/user/tab2" === to.path){
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
