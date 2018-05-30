import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import main from '@/components/main'
import pay from '@/components/pay'
import charges from '@/components/charges'
import brand from '@/components/brand'
import user from '@/components/user'
import paytab1 from '@/components/pay-tab1'
import paytab2 from '@/components/pay-tab2'
import paytab3 from '@/components/pay-tab3'
import paytab4 from '@/components/pay-tab4'
import chargesTab1 from '@/components/charges-tab1'
import chargesTab2 from '@/components/charges-tab2'
import brandtab1 from '@/components/brand-tab1'
import brandtab2 from '@/components/brand-tab2'
import brandtab3 from '@/components/brand-tab3'
import brandtab4 from '@/components/brand-tab4'
import userTab1 from '@/components/user-tab1'
import userTab2 from '@/components/user-tab2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: '/main/tab1',
          component: pay,
          children: [
            {
              path: '/pay/tab1',
              component: paytab1
            },
            {
                path: '/pay/tab2',
                component: paytab2
            },
            {
                path: '/pay/tab3',
                component: paytab3
            },
            {
                path: '/pay/tab4',
                component: paytab4
            }
          ]
        },
        {
            path: '/main/tab2',
            component: charges,
            children: [
                {
                    path: '/charges/tab1',
                    component: chargesTab1
                },
                {
                    path: '/charges/tab2',
                    component: chargesTab2
                }
            ]
        },
        {
            path: '/main/tab3',
            component: brand,
            children: [
                {
                    path: '/brand/tab1',
                    component: brandtab1
                },
                {
                    path: '/brand/tab2',
                    component: brandtab2
                },
                {
                    path: '/brand/tab3',
                    component: brandtab3
                },
                {
                    path: '/brand/tab4',
                    component: brandtab4
                }
            ]
        },
        {
            path: '/main/tab4',
            component: user,
            children: [
                {
                    path: '/user/tab1',
                    component: userTab1
                },
                {
                    path: '/user/tab2',
                    component: userTab2
                }
            ]
        }
      ]
    }
  ]
})
