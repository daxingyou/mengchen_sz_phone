<template>
    <div >
        <div style="margin-top: 0.5rem" class="d-flex justify-content-between">
            <div>
                <img height="20px" src="../assets/title_dot.png"/>
                <span class="name" style="text-align: center;margin-left: 0.3rem">个人信息</span>
            </div>
        </div>


        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                账号:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                dong
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                代理商级别:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                钻石
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                上级代理:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                admin
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                房卡库存:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                99999
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                上次登录时间：
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                2018-04-16 10:37:24
            </div>
        </div>

        <div align="left" style="margin-top: 1rem" class="change-pwd">修改密码</div>

    </div>

</template>

<script>
export default {
  data () {
    return {
    }
  },
  created: function () {
  },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
    .change-pwd{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #089380;
    }
</style>
