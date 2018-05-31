<template>
    <div>
        <div class="d-flex justify-content-between">
            <div v-on:click=showNewDia() class="pay-btn"><span>新建子代理商</span></div>
            <div ><input class="m-input"/></div>
        </div>

        <div style="margin-top: 0.5rem">
            <table width="100%" height="80%" style="background-color: #ffffff;" >
                <thead style="background-color: #fffffe;">
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        账号
                    </th>
                    <th>
                        昵称
                    </th>
                    <th>
                        房卡
                    </th>
                    <th>
                        充值金额额
                    </th>
                    <th>
                        操作
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
                    <td>未发货</td>
                    <td><a v-on:click=showChildDia() href="#">充值</a>&nbsp;&nbsp;<a v-on:click=showChangeDia() href="#">修改</a>&nbsp;&nbsp;<a href="#">删除</a> </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div v-show="user_dia_show_new" class="charges-dialog">

            <div align="left" class="charges-dialog-inner">

                <p class="d-title">新建子代理商</p>

                <div class="normal">账号</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">密码</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">昵称</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">代理类型</div>
                <div>
                    <select class="m-sel">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

                <div style="margin-top: 1rem;">
                    <div v-on:click=showNewDia() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
                </div>
            </div>

            <div v-on:click=showNewDia() class="close">
                <img height="20px" src="../assets/btn_close.png"/>
            </div>
        </div>

        <div v-show="user_dia_show_child" class="charges-dialog">

            <div align="left" class="charges-dialog-inner">
                <p class="d-title">子代理商充值</p>

                <div class="normal">代理账号</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">充值房卡数量</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div style="margin-top: 1rem;">
                    <div v-on:click=showChildDia() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
                </div>
            </div>

            <div v-on:click=showChildDia()  class="close">
                <img height="20px" src="../assets/btn_close.png"/>
            </div>
        </div>

        <div v-show="user_dia_show_change" class="charges-dialog">

            <div align="left" class="charges-dialog-inner">
                <p class="d-title">修改子代理商信息</p>

                <div class="normal">账号</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">昵称</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div class="normal">密码</div>
                <div>
                    <input class="m-input"/>
                </div>

                <div style="margin-top: 1rem;">
                    <div v-on:click=showChangeDia() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
                </div>
            </div>

            <div v-on:click=showChangeDia()  class="close">
                <img height="20px" src="../assets/btn_close.png"/>
            </div>
        </div>
    </div>

</template>

<script>
import {myTools} from '../tools/myTools.js'
import qs from 'qs'

export default {
  data () {
    return {
        user_dia_show_new:false,
        user_dia_show_child:false,
        user_dia_show_change:false,
        createFormData: {
            account: '',
            group_id: '',
            name: '',
            password: '',
            password_confirmation:''
        },
        changeFormData: {
            name: '',
            account: '',
            password: '',
            email:'',
            phone:''
        },
        payFormData:{
            subagent_account:'',
            item_type:'',
            amount:''
        }
    }
  },
  created: function () {
  },
    methods: {
        showNewDia(){
            if(this.user_dia_show_new == true){
                this.user_dia_show_new = false
            }else{
                this.user_dia_show_new = true
            }
        },
        showChildDia(){
            if(this.user_dia_show_child == true){
                this.user_dia_show_child = false
            }else{
                this.user_dia_show_child = true
            }
        },
        showChangeDia(){
            if(this.user_dia_show_child == true){
                this.user_dia_show_child = false
            }else{
                this.user_dia_show_child = true
            }
        },
        create() {
            myTools.axiosInstance.post('/agent/api/subagent', qs.stringify(this.createFormData))
            .then(function (response) {
                if (response.status === 200) {

                } else {
                    
                }
            })
            .catch(function (err) {
                alert(err)
            })
        },
        change() {
            myTools.axiosInstance.post('/agent/api/subagent/'+ 1, qs.stringify(this.changeFormData))
            .then(function (response) {
                if (response.status === 200) {

                } else {
                    
                }
            })
            .catch(function (err) {
                alert(err)
            })
        },
        pay() {
            myTools.axiosInstance.put('/agent/api/top-up/child/{subagent_account}/{item_type}/{amount}', qs.stringify(this.payFormData))
            .then(function (response) {
                if (response.status === 200) {

                } else {
                    
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

    .pay-btn{
        height: 2rem;
        width: 60%;
        background-color: #41af11;
        border-radius: 0.5rem;
        font-family: MicrosoftYaHei-Bold;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        line-height: 2rem;
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


</style>
