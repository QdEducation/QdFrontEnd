import {inject, injectable, tagged} from 'inversify';
import {IApp, IVueConfigurer} from "../interfaces";
import {TYPES} from "../types";
import {ComponentOptions} from "vue";
import Vue from 'vue'

let VueRouter = require('vue-router').default;
if (!VueRouter) {
    VueRouter = require('vue-router')
}
const BOOTSTRAP_ELEMENT_SELECTOR = '#app'

@injectable()
export class VueConfigurer implements IVueConfigurer {
    constructor(@inject(TYPES.VueConfigurerArgs){}: VueConfigurerArgs ) {
    }
    public configure() {
        console.log('vue configured')

        Vue.use(VueRouter);
        const routes = [
            // { path: '/', component: KnawledgeMap, props: true },
            // { path: '/ebbinghaus', component: Ebbinghaus, props: true },
            // { path: '/coordinates', component: Coordinates, props: true },
        ]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
        const router = new VueRouter({
            routes, // short for `routes: routes`
            mode: 'history',
        })

        const vm = new Vue({
            el: BOOTSTRAP_ELEMENT_SELECTOR,
            created() {
                // log('Vue instance created')
                return void 0
            },
            data() {
                return {
                }
            },
            computed: {
            },
            methods: {
            },
            // store: this.store,
            router
        } as ComponentOptions<any> /*TODO: should be ComponentOptions<Vue>*/)
    }
}

@injectable()
export class VueConfigurerArgs {
}





