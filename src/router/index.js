import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
Vue.use(VueRouter)

export default new VueRouter({
    base:'/',
    mode:'hash',// default-->hash
    routes,
    scrollBehavior:()=>{
        return {x:0,y:0}
    }
})
