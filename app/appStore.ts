import {Store} from 'vuex'
import * as Vuex from 'vuex'
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {
    IClass,
    IHash,
    IQuestion, IState, ITopic, RemoveUserHasQuestionMutationArgs,
    ToggleUserHasQuestionMutationArgs
} from "../interfaces";
import {addQuestion, getQuestionIndex, removeQuestion} from "./components/classroom/classroomUtils";
import {Debugger} from "inspector";
const initialState: IState = require('./initialData.json')
console.log("")

let Vue = require('vue').default // for webpack
if (!Vue) {
    Vue = require('vue') // for ava-ts tests
}
// import Vue from 'vue';
// if (!Vue) {
//     import * as Vue from 'vue'
// }
export enum MUTATION_NAMES {
    TOGGLE_USER_HAS_QUESTION = 'toggleUserHasQuestion',
    ADD_USER_HAS_QUESTION = 'addUserHasQuestion',
    REMOVE_USER_HAS_QUESTION = 'removeUserHasQuestion',
    // toggleUserHasQuestion = 'toggleUserHasQuestion' // ({classroomId, userId, topicId}){

    // }
}

const state: IState = initialState // as IState
// {
//     classes: {
//
//     },
//     students: {
//
//     },
//     teachers: {
//
//     },
//     topics: {
//
//     }
// }
const getters = {
    topics(state, getters) {
       return (classroomId): ITopic[] => {
           const topics: ITopic[] = []
           // TODO: implement
           return topics
       }
    },
    questions(state, getters) {
        return classroomId => {
            const questions = []
            // TODO: implement
            return questions
        }
    },
    userId(state, getters) {
        return state.userId
    }
}
const mutations = {
    [MUTATION_NAMES.TOGGLE_USER_HAS_QUESTION] (state: IState, {classroomId, userId, topicId} : ToggleUserHasQuestionMutationArgs) {
        // const args: ToggleUserHasQuestionMutationArgs = {classroomId, userId, topicId}
        const question: IQuestion = {student: userId, topic: topicId}
        const questionIndex = getQuestionIndex({classes: state.classes,classroomId, question })
        const userCurrentlyHasTheQuestion = questionIndex > -1
        if (userCurrentlyHasTheQuestion) {
            const args: RemoveUserHasQuestionMutationArgs = {
                classroomId, questionIndex
            }
            mutations[MUTATION_NAMES.REMOVE_USER_HAS_QUESTION](state, args)
        } else {
            const args: ToggleUserHasQuestionMutationArgs = {
                classroomId, userId, topicId
            }
            mutations[MUTATION_NAMES.ADD_USER_HAS_QUESTION](state, args)
        }

    }
}
mutations[MUTATION_NAMES.REMOVE_USER_HAS_QUESTION] = function (state: IState, {classroomId, questionIndex} : RemoveUserHasQuestionMutationArgs) {
        const classes: IHash<IClass> = state.classes
        removeQuestion({classes, classroomId, questionIndex})
}
mutations[MUTATION_NAMES.ADD_USER_HAS_QUESTION] = function (state: IState, {classroomId, userId, topicId} : ToggleUserHasQuestionMutationArgs) {
    const classes: IHash<IClass> = state.classes
    addQuestion({classes, classroomId, question: {student: userId, topic: topicId}})
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
