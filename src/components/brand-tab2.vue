<template>
    <div >
        <div class="d-flex justify-content-between">
            <div>
                <select class="m-sel">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <div>
                <div class="in-btn"><span>邀请</span></div>
            </div>

        </div>

        <div style="padding-top: 20px;">
            <div class="btn-group" role="group" >
                <button  type="button" class="btn btn-secondary" ><span class="tab-name active">成员列表</span></button>
                <button  type="button" class="btn btn-secondary"><span class="tab-name">请求列表</span></button>
                <button  type="button" class="btn btn-secondary"><span class="tab-name">牌艺馆动态</span></button>
            </div>
        </div>

        <div>
            <table width="100%" >
                <tbody>
                <tr>
                    <td>
                        <div class="d-flex justify-content-start">
                            <div class="d-flex align-items-center">
                                <img  width="30px" height="30px" src="../assets/btn_close.png" >
                            </div>
                            <div style="margin-left: 0.5rem">
                                <div style="text-align: left" class="mt-0">xxx</div>
                                <div style="text-align: left" >xxxx</div>
                            </div>
                        </div>
                    </td>
                    <td style="padding-right: 1rem" align="right"><a v-on:click=showDia() class="zhanji" href="#">战绩</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="kick" href="#">踢出</a></td>
                </tr>
                </tbody>
            </table>
            <table width="100%" >
                <tbody>
                <tr>
                    <td>
                        <div class="d-flex justify-content-start">
                            <div class="d-flex align-items-center">
                                <img  width="30px" height="30px" src="../assets/btn_close.png" >
                            </div>
                            <div style="margin-left: 0.5rem">
                                <div style="text-align: left" class="mt-0">xxx</div>
                                <div style="text-align: left" >xxxx</div>
                            </div>
                        </div>
                    </td>
                    <td style="padding-right: 1rem" align="right"><a class="agree" href="#">同意</a>&nbsp;&nbsp;&nbsp;&nbsp;<a class="reject" href="#">拒绝</a></td>
                </tr>
                </tbody>
            </table>
            <table width="100%" >
                <tbody>
                <tr>
                    <td>
                        <span class="tname">xx</span>&nbsp;<span class="action">加入</span>&nbsp;<span class="tname">xxx</span>
                    </td>
                    <td style="padding-right: 1rem" align="right"><span class="date">2018-02-07 12:59:42</span></td>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-show="brand_show" class="charges-dialog">

            <div align="left" class="charges-dialog-inner">

                <p class="d-title">邀请成员</p>

                <div class="normal">玩家ID</div>
                <div>
                    <input class="m-input"/>
                </div>

                <table style="margin-top: 0.5rem" width="100%" >
                    <tbody>
                    <tr>
                        <td>
                            <div class="d-flex justify-content-start">
                                <div class="d-flex align-items-center">
                                    <img  width="30px" height="30px" src="../assets/btn_close.png" >
                                </div>
                                <div style="margin-left: 0.5rem">
                                    <div style="text-align: left" class="mt-0">xxx</div>
                                    <div style="text-align: left" >xxxx</div>
                                </div>
                            </div>
                        </td>
                        <td style="padding-right: 1rem" align="right"><a class="agree" href="#">邀请</a>&nbsp;&nbsp;&nbsp;</td>
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
