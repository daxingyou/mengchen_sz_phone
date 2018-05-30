<template>
    <div>
        <div style="margin-top: 0.5rem">
            <div>
                <select v-model="formData.player_id" v-on:change="" class="m-input">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
        </div>
        <div style="margin-top: 0.5rem">
            <table width="91%" style="margin-left: 1.1rem">
                <thead style="background-color: #fffffe;">
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            订单说明
                        </th>
                        <th>
                            订单状态
                        </th>
                        <th>
                            发货状态
                        </th>
                        <th>
                            创建时间
                        </th>
                        <th>
                            支付时间
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
                        <td>2018-04-23
                            23:22:22</td>
                        <td>2018-04-23
                            23:22:22</td>
                        <td class="caozuo">支付</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
export default {
  name: 'pay',
  data () {
    return {
        formData: {
            player_id: ''
        },
        tableData:[]
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
        },
        record: function () {
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
    .m-input{
        height: 2rem;
        width: 90%;
        border: 0px;
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        padding-left: 5px;
        padding-right: 5px;
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
    .caozuo{
        font-family: MicrosoftYaHei;
        text-decoration: underline;
        font-size: 0.5rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #089380;
    }
</style>
