import {inject, injectable, tagged} from 'inversify';
import {
    IApp, IStudentClassViewerCreator, IStudentViewCreator, ITeacherClassViewerCreator, ITopicCreator,
    IVueConfigurer,
    IHeaderCreator, IClassroomCreatorCreator,
} from "../interfaces";
import {TYPES} from "../types";
import {ComponentOptions} from "vue";
import Vue from 'vue'
import {GLOBALS} from "./globals";
import {Store} from "vuex";
import Login from './components/login/login'
import Main from './components/main/main'
import {ClassroomCreatorCreator} from './components/roomCreator/roomCreator'

let VueRouter = require('vue-router').default;
if (!VueRouter) {
    VueRouter = require('vue-router')
}
const BOOTSTRAP_ELEMENT_SELECTOR = '#app'

@injectable()
export class VueConfigurer implements IVueConfigurer {
    private classroomCreator: IStudentClassViewerCreator
    private studentViewCreator: IStudentViewCreator
    private teacherViewCreator: ITeacherClassViewerCreator
    private topicCreator: ITopicCreator
    private headerCreator: IHeaderCreator
    private roomCreatorCreator: IClassroomCreatorCreator
    private store: Store<any>
    constructor(@inject(TYPES.VueConfigurerArgs){
        studentViewCreator, classroomCreator,
        teacherViewCreator, topicCreator, headerCreator,
        roomCreatorCreator,
        store,
    }: VueConfigurerArgs ) {
        this.classroomCreator = classroomCreator
        this.studentViewCreator = studentViewCreator
        this.teacherViewCreator = teacherViewCreator
        this.topicCreator = topicCreator
        this.headerCreator = headerCreator
        this.roomCreatorCreator = roomCreatorCreator
        this.store = store
    }
    public configure() {
        Vue.use(VueRouter)
        console.log('vue configured')
        const Classroom = this.classroomCreator.create()
        const StudentView = this.studentViewCreator.create()
        const TeacherView = this.teacherViewCreator.create()
        const Topic = this.topicCreator.create()
        const Header = this.headerCreator.create()
        const RoomCreator = this.roomCreatorCreator.create()

        Vue.component('classroom', Classroom)
        Vue.component('topic', Topic)
        Vue.component('appHeader', Header)
        Vue.component('studentView', StudentView)
        Vue.component('login', Login)
        // Vue.component('main', Login)
        const routes = [
            { path: '/', component: Main, props: true },
            { path: '/' + GLOBALS.TEACHER_CLASSROOM_VIEWER + '/:classroomId', component: TeacherView, props: true },
            { path: '/' + GLOBALS.CLASSROOM_CREATOR + '/', component: RoomCreator, props: true },
            { path: '/' + GLOBALS.CLASSROOMS + '/', component: Classroom, name:'classroom', props: true },
        ]

        const router = new VueRouter({
            routes,
            // mode: 'history',
        })

        const vm = new Vue({
            el: BOOTSTRAP_ELEMENT_SELECTOR,
            created() {
                console.log('Vue instance created')
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
            store: this.store,
            router
        } as ComponentOptions<any> /*TODO: should be ComponentOptions<Vue>*/)
    }
}

@injectable()
export class VueConfigurerArgs {
    @inject(TYPES.IClassroomCreator) public classroomCreator: IStudentClassViewerCreator
    @inject(TYPES.IStudentViewCreator) public studentViewCreator: IStudentViewCreator
    @inject(TYPES.ITeacherViewCreator) public teacherViewCreator: ITeacherClassViewerCreator
    @inject(TYPES.ITopicCreator) public topicCreator: ITopicCreator
    @inject(TYPES.IHeaderCreator) public headerCreator: IHeaderCreator
    @inject(TYPES.IClassroomCreatorCreator) public roomCreatorCreator: IClassroomCreatorCreator
    @inject(TYPES.Store) public store: Store<any>
}
