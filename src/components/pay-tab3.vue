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
                <div class="user-font">选择牌艺馆</div>
                <div class="user-font">牌艺馆房卡余量：<span class="user-fangka">100</span></div>
            </div>

            <div>
                <select v-model="formData.card_num" class="m-input">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
        <div style="margin-top: 1rem">
            <div style="margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
                <div class="user-font">充值数量</div>
            </div>

            <div>
                <input v-model="formData.pay_num" class="m-input"/>
            </div>

            <div v-on:click="pay()" style="margin-top: 2.5rem;">
                <div style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交订单</span></div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                formData: {
                    card_num: '',
                    pay_num: '',
                },
            }
        },
        methods:{
            pay: function () {
                myTools.axiosInstance.post('/xxxx', qs.stringify(this.formData))
                    .then(function (response) {
                        if (response.status === 200) {
                            window.location.href = '/#/main'   //登录成功，跳转首页
                        } else {
                            alert('帐号密码错误')
                        }
                    })
                    .catch(function (err) {
                        alert(err)
                    })
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
        width: 91%;
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
