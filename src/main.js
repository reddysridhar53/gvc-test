import Vue from 'vue'
import store from './store'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import PlanetsList from './components/PlanetsList'
import Planet from './components/Planet'

const routes = [
    { path: '/planets', component: PlanetsList },
    { path: '/planets/:planetId', component: Planet }
]

const router = new VueRouter({
    routes,
    mode: 'history',
})

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
