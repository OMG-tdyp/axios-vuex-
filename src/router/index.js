import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import page1 from '@/components/page1'
import page2 from '@/components/page2'
import login from '@/components/login'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '/page1',
          name: 'page1',
          component: page1,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/page2',
          name: 'page2',
          component: page2,
          meta: {
            requiresAuth: true,
          },
        },
      ]
    }
  ]
});

//注册全局钩子用来拦截导航
router.beforeEach((to,from,next) => {
  //获取store里面的isLogin
  let token = store.state.isLogin;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth) {
    if(token) {
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} //将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
});

export default router;
