<template>
    <div >
        <div align="left">
            <span class="normal">玩家ID</span>
            <select class="m-sel">
                <option value="1">1</option>
                <option value="2">2</option>
            </select>

        </div>
        <div align="left">
            <span class="normal">时间</span>
            <date-picker field="myDate"
                         placeholder="选择日期"
                         v-model="date"
                         format="yyyy/mm/dd"
                         :backward="false"
                         :no-today="false"></date-picker>
            <span class="normal">至</span>
            <date-picker field="myDate"
                         placeholder="选择日期"
                         v-model="date"
                         format="yyyy/mm/dd"
                         :backward="false"
                         :no-today="false"></date-picker>
        </div>
        <div align="left" style="margin-left: 2rem;margin-top: 0.5">
            <a href="#">今天</a>&nbsp;&nbsp;&nbsp;<a href="#">昨天</a>&nbsp;&nbsp;&nbsp;<a href="#">七天</a>
        </div>
        <div class="normal" align="right" style="margin-top: 0.5rem">
            未审查房间数：1/2
        </div>
        <div style="margin-top: 0.5rem">
            <table width="100%" >
                <thead style="background-color: #fffffe;">
                <tr>
                    <th>
                        日期
                    </th>
                    <th>
                        房间信息
                    </th>
                    <th>
                        结果
                    </th>
                    <th>
                        详情
                    </th>
                    <th>
                        状态
                    </th>
                </tr>
                </thead>
                <tbody style="background-color: #FFFFFF">
                <tr>
                    <td>1</td>
                    <td>2000张
                        赠送500张</td>
                    <td>未支付</td>
                    <td   ><a v-on:click=showDia() href="#" >详情</a></td>
                    <td >审查</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-show="brand_show" class="charges-dialog">

            <div align="left"  class="charges-dialog-inner">

                <p class="d-title">战绩详情</p>

                <div style="padding: 1rem;	background-color: #dad5bb;border-radius: 1rem;">
                    <div>2018-02-02 17:20 <span class="gray">至</span> 2018-4-21 12:03</div>

                    <div class="d-flex justify-content-between">
                        <div align="left"><span class="gray">房号：</span>232223</div>
                        <div style="min-width: 8rem" align="left"><span class="gray">房主：</span>jeison2</div>
                    </div>

                    <div class="d-flex justify-content-between">
                        <div align="left"><span class="gray">局数：</span>8局</div>
                        <div style="min-width: 8rem" align="left"><span class="gray">玩法：</span>景德镇麻将</div>
                    </div>


                    <div class="d-flex justify-content-between">
                        <div align="left"><span class="gray">回放码：</span>123123</div>
                        <div style="min-width: 8rem" align="left">&nbsp;</div>
                    </div>

                </div>


                <table style="margin-top: 1rem" width="100%" >
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
                        <td style="padding-right: 1rem" align="right"> <span class="add">+300</span></td>
                    </tr>
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
                        <td style="padding-right: 1rem" align="right"> <span class="minus">-300</span></td>
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

    import myDatepicker from 'vue-datepicker-simple';

    export default {
        data () {
            return {
                date: '',
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
        },
        components: {
            'date-picker': myDatepicker
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
        width: 11rem;
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
    .gray{
        font-family: MicrosoftYaHei;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #9f7a6f;
    }
    .add{
        font-family: MicrosoftYaHei-Bold;
        font-size: 1.5rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #f24c1c;
    }
    .minus{
        font-family: MicrosoftYaHei-Bold;
        font-size: 1.5rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 1.5rem;
        letter-spacing: 0rem;
        color: #089380;
    }
</style>
