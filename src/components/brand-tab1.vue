<template>
    <div>
        <div>
            <select class="m-sel">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </div>

        <div style="margin-top: 0.5rem" class="d-flex justify-content-between">
            <div>
                <img height="20px" src="../assets/title_dot.png"/>
                <span class="name" style="text-align: center;margin-left: 0.3rem">购买房卡</span>
            </div>
            <div v-on:click=showDia() class="change" style="text-align: end">
                修改
            </div>
        </div>


        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                牌艺馆名称:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                壹壹麻将会所
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                牌艺馆ID:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                428302
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                牌艺馆房卡:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                99999张
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                玩家ID:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                123465
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                创建时间:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                2018-2-7 11:32:11
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                牌艺馆成员:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                23
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                简介:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                亲友聚一堂，一起打麻将
            </div>
        </div>


        <div v-show="brand_show" class="charges-dialog">

            <div align="left" class="charges-dialog-inner">
                <p class="d-title">申请提现</p>

                <div class="normal">牌艺馆名称</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">简介</div>
                <div>
                    <input class="m-input"/>
                </div>


                <div style="margin-top: 1rem;">
                    <div v-on:click=showDia() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
                </div>
            </div>

            <div v-on:click=showDia() class="close">
                <img height="20px" src="../assets/btn_close.png"/>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                brand_show:false
            }
        },
        created: function () {
        },
        methods: {
            showDia(){
                if(this.brand_show == true){
                    this.brand_show = false
                }else{
                    this.brand_show = true
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .key{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #9f7a6f;
    }
    .value{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #573126;
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
    .change{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #e39629;
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
