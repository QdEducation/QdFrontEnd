import {Store} from 'vuex'
import * as Vuex from 'vuex'
import {inject, injectable} from "inversify";
import {TYPES} from "../types";

let Vue = require('vue').default // for webpack
if (!Vue) {
    Vue = require('vue') // for ava-ts tests
}
// import Vue from 'vue';
// if (!Vue) {
//     import * as Vue from 'vue'
// }
export enum MUTATION_NAMES {
}

const state = {

}
const getters = {
}
const mutations = {
}
const actions = {}

let initialized = false
@injectable()
export default class AppStore {
    constructor(@inject(TYPES.AppStoreArgs){}: AppStoreArgs) {
        if (initialized) {
            throw new RangeError('You cannot create another Store. The Vuex Store has already been created')
        }
        Vue.use(Vuex)
        const store = new Store({
            state,
            mutations,
            actions,
            getters,
        } ) as Store<any>
        initialized = true
        return store
    }
}
@injectable()
export class AppStoreArgs {
}
