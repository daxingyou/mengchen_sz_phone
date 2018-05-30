<template>
    <div >
        <div>
            <select class="m-sel">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </div>

        <div style="margin-top: 0.5rem">
            <table width="100%" height="80%" style="background-color: #ffffff;" >
                <thead style="background-color: #fffffe;">
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        金额
                    </th>
                    <th>
                        提交日期
                    </th>
                    <th>
                        状态
                    </th>
                    <th>
                        备注
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>2000张
                        赠送500张</td>
                    <td>未支付</td>
                    <td>未发货</td>
                    <td>2018-04-23
                        23:22:22</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="margin-top: 1rem;">
            <div v-on:click=showDia() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>申请提现</span></div>
        </div>

        <div v-show="charges_show" class="charges-dialog">

            <div class="charges-dialog-inner">
                <p class="d-title">申请提现</p>

                <div class="normal">联系方式类型</div>
                <div>
                    <select class="m-sel">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>


                <div class="normal">联系方式</div>
                <div>
                    <input class="m-input"/>
                </div>


                <div class="normal">提现金额（元）</div>
                <div>
                    <select class="m-sel">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
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
        charges_show:false
    }
  },
  created: function () {
  },
    methods: {
        showDia(){
            if(this.charges_show == true){
                this.charges_show = false
            }else{
                this.charges_show = true
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .m-sel{
        height: 2rem;
        width: 100%;
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

    .m-input{
        height: 2rem;
        width: 100%;
        border: 0px;
        padding-left: 5px;
        padding-right: 5px;
        background-color: #ffffff;
        border-radius: 0.3rem;
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
</style>
