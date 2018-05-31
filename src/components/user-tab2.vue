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
                {{userinfo.account}}
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                代理商级别:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                {{userinfo.level}}
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                上级代理:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                {{userinfo.parent}}
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                房卡库存:
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                {{userinfo.inventory}}
            </div>
        </div>

        <div style="margin-top: 0.5rem;margin-left: 1rem;margin-right: 1rem" class="d-flex justify-content-between">
            <div class="key" style="text-align: left">
                上次登录时间：
            </div>
            <div class="value" style="text-align: left;width: 10rem">
                {{userinfo.login_time}}
            </div>
        </div>

        <div v-on:click=showDia() align="left" style="margin-top: 1rem" class="change-pwd">修改密码</div>


        <div v-show="user_show" class="user-dialog">

            <div align="left" class="user-dialog-inner">
                <p class="d-title">修改密码</p>

                <div class="normal">原密码</div>
                <div>
                    <input v-model="changeData.password" class="m-input"/>
                </div>


                <div class="normal">新密码</div>
                <div>
                    <input v-model="changeData.new_password" class="m-input"/>
                </div>


                <div class="normal">再次确认密码</div>
                <div>
                    <input v-model="changeData.new_password_confirmation" class="m-input"/>
                </div>

                <div style="margin-top: 1rem;">
                    <div v-on:click=changePsw() style="margin: 0 auto;margin-top: 0.5rem" class="pay-btn"><span>提交</span></div>
                </div>

            </div>

            <div v-on:click=showDia() class="close">
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
        userinfo:{
            id:'',
            account:'',
            level:'',
            name:'',
            inventory:0,
            parent:'',
            login_time:''
        },
        changeData:{
            password :'',
            new_password:'',
            new_password_confirmation:''
        },
        user_show:false
    }
  },
  created: function () {
      this.info()
  },
    methods: {
        showDia(){
            if(this.user_show == true){
                this.user_show = false
            }else{
                this.user_show = true
            }
        },
        info() {
            var _this = this;
            myTools.axiosInstance.get('/api/info')
            .then(function (response) {
                if (response.status === 200) {
                    console.info(response.data)
                    var data = response.data
                    _this.userinfo.id = data.id
                    _this.userinfo.account = data.account
                    _this.userinfo.level = data.group.name
                    _this.userinfo.name = data.name
                    _this.userinfo.parent = data.parent.name
                    _this.userinfo.inventory = _this.filterInventorys(data.inventorys)
                    _this.userinfo.login_time = data.updated_at
                } else {
                    alert(JSON.stringify(response.data.data))
                }
            })
            .catch(function (err) {
                alert(err)
            })
        },
        filterInventorys(inventorys){
            console.info(JSON.stringify(inventorys))
            var invent = 0
            if(inventorys.length > 0){
                for(var i=0;i <= inventorys.length;i++){
                    if(inventorys[i].item_id == 1){
                        invent = inventorys[i].stock
                        break
                    }
                }
            }
            return invent
        },
        changePsw() {
            var _this = this;
            myTools.axiosInstance.put('/agent/api/self/password',qs.stringify(this.changeData))
            .then(function (response) {
                if (response.status === 200) {
                    _this.showDia()
                }else{
                    alert(JSON.stringify(response.data))
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

    .user-dialog{
        position: fixed;
        top:4rem;
        left: 0px;
        width: 100%;
        height: 100%;
        background-color:#0000007F;
        padding: 1rem;
        z-index: 10;
    }
    .user-dialog-inner{
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
