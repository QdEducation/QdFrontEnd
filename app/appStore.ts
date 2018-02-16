import {Store} from 'vuex'
import * as Vuex from 'vuex'
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {
    IClass,
    IHash,
    IQuestion, IState, ITopic, RemoveUserHasQuestionMutationArgs,
    ToggleUserHasQuestionMutationArgs,
    ITopicWithId, id, LoadRoomsForTeachersMutationArgs, ITeacherLoader, ToggleUserNeedsHelpMutationArgs,
    LoadClassRoomMutationArgs,
} from "../interfaces";
import {addQuestion, getQuestionIndex, hasQuestion, removeQuestion} from "./components/studentClassViewer/classroomUtils";
import {Debugger} from "inspector";
import firebase from 'firebase'
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
    TOGGLE_USER_NEEDS_HELP = 'toggleUserNeedsHelp',
    ADD_USER_HAS_QUESTION = 'addUserHasQuestion',
    REMOVE_USER_HAS_QUESTION = 'removeUserHasQuestion',
    LOAD_CLASSROOM = 'loadClassroom',
    LOAD_CLASSROOM_1_QUEUE_DATA = 'loadClassroom1QueueData',
    LOAD_ROOMS_FOR_TEACHER = 'loadRoomsForTeachers',
    LOGIN_WITH_GOOGLE = 'loginWithGoogle',
    // toggleUserHasQuestion = 'toggleUserHasQuestion' // ({classroomId, userId, topicId}){

    // }
}

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
           return []
           // const klass = state.classes[classroomId]
           // const topicIds = klass.topics
           // const topics: ITopicWithId[] = topicIds.map( getters.topic)
           // console.log("topics in getters are ", topics)
           //
           // // TODO: implement
           // return topics
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
    // called by /teacherRoomViewer/:classroomId
    usersWhoNeedHelp(state: IState, getters) {
        console.log('users who need help called')
        return (classroomId: id): id[] => { // array of student ids. . . . eventually return the whole user object
            // TODO: make sure whatever component is calling this getter also calls the MUTATION to load this room from the DB
            const classroom = state.classes[classroomId]
            const users = classroom.queue && Object.keys(classroom.queue) || []
            console.log('users who need help is ', users)
            return users

        }
    },
    // questions(state: IState, getters) {
    //     return (classroomId: id): IQuestion[] => {
    //         console.log('appStore questions getter called ', state)
    //         const studentClassViewer = state.classes[classroomId]
    //         if (!studentClassViewer) {
    //             throw new RangeError('Could not find studentClassViewer with id of ' + classroomId + ' in studentClassViewer hashmap ' + studentClassViewer)
    //         }
    //         const {queue: questions} = studentClassViewer
    //
    //         return questions
    //     }
    // },
    // hasQuestion(state: IState, getters) {
    //     return (classroomId, question) => hasQuestion({classes: state.classes, classroomId, question})
    //
    // },
    userHasAccess(state: IState, getters) {
        return (userId: id): boolean => {
            // eventually check if user has a license
            return !!getters.userId
        }
    },
    studentName(state: IState, getters) {
        return (studentId: id): string => state.students[studentId].name
    },
    userId(state, getters): id {
        return state.userId
    },
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
    [MUTATION_NAMES.TOGGLE_USER_NEEDS_HELP] (state: IState, {classroomId, userId} : ToggleUserNeedsHelpMutationArgs) {
        console.log('toggle User needs help called', state, classroomId, userId)
        // const args: ToggleUserHasQuestionMutationArgs = {classroomId, userId, topicId}
        // const question: IQuestion = {student: userId, topic: topicId}
        // const questionIndex = getQuestionIndex({classes: state.classes,classroomId, question })
        // const userCurrentlyHasTheQuestion = questionIndex > -1
        // if (userCurrentlyHasTheQuestion) {
        //     const args: RemoveUserHasQuestionMutationArgs = {
        //         classroomId, questionIndex
        //     }
        //     mutations[MUTATION_NAMES.REMOVE_USER_HAS_QUESTION](state, args)
        // } else {
        //     const args: ToggleUserHasQuestionMutationArgs = {
        //         classroomId, userId,
        //     }
        //     mutations[MUTATION_NAMES.ADD_USER_HAS_QUESTION](state, args)
        // }
    },
    [MUTATION_NAMES.LOAD_CLASSROOM] (state: IState, {classroomId, classroom}: LoadClassRoomMutationArgs) {
        Vue.set(state.classes, classroomId, classroom)
    },
    [MUTATION_NAMES.LOAD_CLASSROOM_1_QUEUE_DATA] (state: IState, queue: IQuestion[]) {
        // const classroom = state.classes[1]
        // classroom.queue = queue
    },
    [MUTATION_NAMES.LOGIN_WITH_GOOGLE](state: IState) {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then( (result) => {
            const userId = result.user.uid
            state.userId = userId
            console.log('login result', result)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential
            console.error('There was an error ', errorCode, errorMessage, email, credential)
        });

    },
    [MUTATION_NAMES.LOAD_ROOMS_FOR_TEACHER](state: IState, {teacherId} :LoadRoomsForTeachersMutationArgs) {

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
    constructor(@inject(TYPES.AppStoreArgs){
        teacherLoader,
        state
    }: AppStoreArgs) {
        if (initialized) {
            throw new RangeError('You cannot create another Store. The Vuex Store has already been created')
        }
        Vue.use(Vuex)
        const stateArgs = {
            ...state,
            teacherLoader
        }
        const store = new Store({
            state: stateArgs,
            mutations,
            actions,
            getters,
        } ) as Store<any>
        store['teacherLoader'] = teacherLoader // pass injectionWorks test
        initialized = true
        return store
    }
}
@injectable()
export class AppStoreArgs {
    @inject(TYPES.ITeacherLoader) teacherLoader: ITeacherLoader
    @inject(TYPES.IState) state: IState
}
