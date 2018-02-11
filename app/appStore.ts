import {Store} from 'vuex'
import * as Vuex from 'vuex'
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {
    IClass,
    IHash,
    IQuestion, IState, ITopic, RemoveUserHasQuestionMutationArgs,
    ToggleUserHasQuestionMutationArgs,
    ITopicWithId, id,
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
    LOAD_CLASSROOM_1_QUEUE_DATA = 'loadClassroom1QueueData',
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
    topics(state: IState, getters) {
       return (classroomId): ITopicWithId[] => {
           const klass = state.classes[classroomId]
           const topicIds = klass.topics
           const topics: ITopicWithId[] = topicIds.map( getters.topic)
           console.log("topics in getters are ", topics)

           // TODO: implement
           return topics
       }
    },
    topic(state: IState, getters) {
        return (topicId): ITopicWithId => {
            const topic = state.topics[topicId]
            const topicWithId = {
                ...topic,
                id: topicId
            }
            return topicWithId
        }
    },
    topicName(state: IState, getters) {
        return (topicId): string => state.topics[topicId].title
    },
    questions(state: IState, getters) {
        return (classroomId: id): IQuestion[] => {
            console.log('appStore questions getter called ', state)
            const classroom = state.classes[classroomId]
            if (!classroom) {
                throw new RangeError('Could not find classroom with id of ' + classroomId + ' in classroom hashmap ' + classroom)
            }
            const {queue: questions} = classroom

            return questions
        }
    },
    studentName(state: IState, getters) {
        return (studentId: id): string => state.students[studentId].name
    },
    userId(state, getters): id {
        return state.userId
    }
}
const mutations = {
    [MUTATION_NAMES.TOGGLE_USER_HAS_QUESTION] (state: IState, {classroomId, userId, topicId} : ToggleUserHasQuestionMutationArgs) {
        console.log('toggle User has question called', state, classroomId, userId, topicId)
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
    },
    [MUTATION_NAMES.LOAD_CLASSROOM_1_QUEUE_DATA] (state: IState, queue: IQuestion[]) {
        const classroom = state.classes[1]
        classroom.queue = queue
    },
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
