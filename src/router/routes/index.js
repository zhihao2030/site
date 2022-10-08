import asyncRoutes from './modules'
import store from '@/store'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@components/home')

    },
    {
        path: '/display',
        name: 'display',
        component: () => import('@components/display'),
        children: asyncRoutes
    },
    {
        path: '/404',
        component: () => import('@/components/404/index.vue'),
    },
    {
        path: '*',
        redirect: '/404'
    }
]


// display 重定向
if (asyncRoutes && asyncRoutes.length) {
    const display = routes.find(route => route.name === 'display')
    const list = display.children.map(v=> ({
        path: `${display.path}/${v.path}`,
        ...v.meta
    }))
    store.commit('updateList',list)
    display.redirect = display.path + '/' + asyncRoutes[0].path
}


export default routes
