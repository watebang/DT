import homeRouter from './home-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/about',
    component: () => import('@/view/home/home'),
    children: [...homeRouter],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login'),
  },
  {
    path: '/fillsurvey/:id',
    name: 'fillsurvey',
    component: () => import('@/view/survey/survey-fill.vue'),
  },
  {
    path: '/succeed',
    name: 'succeed',
    component: () => import('@/view/survey/survey-fill-success.vue'),
  },
  {
    redirect: '/404',
    path: '*',
  },
]

export default routes
