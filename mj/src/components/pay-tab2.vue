<template>
    <div>
        <div style="margin-top: 0.5rem" class="d-flex justify-content-start">
            <div style="margin-left: 1rem">
                <img height="20px" src="../assets/title_dot.png"/>
            </div>
            <div style="margin-left: 0.5rem">
                <span style="text-align: center" class="pay-tab-title">购买房卡</span>
            </div>
        </div>
        <div style="margin-top: 1rem">
            <div style="margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
                <div class="user-font">顽家ID</div>
                <div class="user-font">玩家房卡余量：<span class="user-fangka">100</span></div>
            </div>

            <div>
                <input class="m-input"/>
            </div>
        </div>
        <div style="margin-top: 1rem">
            <div style="margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
                <div class="user-font">充值数量</div>
            </div>

            <div>
                <input class="m-input"/>
            </div>

            <div style="margin-top: 2.5rem;">
                <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交订单</span></div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
//  name: 'pay',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .pay-tab-title{
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1rem;
        letter-spacing: 0rem;
        color: #573126;
    }
    .user-font{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
    }
    .user-fangka{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #f14b1b;
    }
    .m-input{
        height: 2rem;
        width: 92%;
        border: 0px;
        margin-top: 0.5rem;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        padding-left: 5px;
        padding-right: 5px;
        background-color: #ffffff;
        border-radius: 0.3rem;
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
