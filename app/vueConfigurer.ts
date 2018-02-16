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
import {ClassroomCreatorCreator} from './components/classroomCreator/classroomCreator'

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
    private classroomCreatorCreator: IClassroomCreatorCreator
    private store: Store<any>
    constructor(@inject(TYPES.VueConfigurerArgs){
        studentViewCreator, studentClassViewer,
        teacherClassViewerCreator, topicCreator, headerCreator,
        classroomCreatorCreator,
        store,
    }: VueConfigurerArgs ) {
        this.classroomCreator = studentClassViewer
        this.studentViewCreator = studentViewCreator
        this.teacherViewCreator = teacherClassViewerCreator
        this.topicCreator = topicCreator
        this.headerCreator = headerCreator
        this.classroomCreatorCreator = classroomCreatorCreator
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
        const ClassroomCreator = this.classroomCreatorCreator.create()

        Vue.component('classroom', Classroom)
        Vue.component('topic', Topic)
        Vue.component('appHeader', Header)
        Vue.component('studentView', StudentView)
        Vue.component('login', Login)
        // Vue.component('main', Login)
        const routes = [
            { path: '/', component: Main, props: true },
            { path: '/' + GLOBALS.TEACHER_CLASSROOM_VIEWER + '/:classroomId', component: TeacherView, props: true },
            { path: '/' + GLOBALS.CLASSROOM_CREATOR + '/:teacherId', component: ClassroomCreator, props: true },
            { path: '/' + GLOBALS.CLASSROOMS + '/', component: Classroom, name:'classroom', props: true },
            { path: '/' + 'samplePath' + '/', component: Login, name:'samplePath', props: true },
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
    @inject(TYPES.IStudentViewCreator) public studentClassViewer: IStudentClassViewerCreator
    @inject(TYPES.IStudentViewCreator) public studentViewCreator: IStudentViewCreator
    @inject(TYPES.ITeacherClassViewerCreator) public teacherClassViewerCreator: ITeacherClassViewerCreator
    @inject(TYPES.ITopicCreator) public topicCreator: ITopicCreator
    @inject(TYPES.IHeaderCreator) public headerCreator: IHeaderCreator
    @inject(TYPES.IClassroomCreatorCreator) public classroomCreatorCreator: IClassroomCreatorCreator
    @inject(TYPES.Store) public store: Store<any>
}
