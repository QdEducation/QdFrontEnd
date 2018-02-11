import {inject, injectable, tagged} from 'inversify';
import {
    IApp, IClassroomCreator, IStudentViewCreator, ITeacherViewCreator, ITopicCreator,
    IVueConfigurer,
    IHeaderCreator,
} from "../interfaces";
import {TYPES} from "../types";
import {ComponentOptions} from "vue";
import Vue from 'vue'
import {GLOBALS} from "./globals";

let VueRouter = require('vue-router').default;
if (!VueRouter) {
    VueRouter = require('vue-router')
}
const BOOTSTRAP_ELEMENT_SELECTOR = '#app'

@injectable()
export class VueConfigurer implements IVueConfigurer {
    private classroomCreator: IClassroomCreator
    private studentViewCreator: IStudentViewCreator
    private teacherViewCreator: ITeacherViewCreator
    private topicCreator: ITopicCreator
    private headerCreator: IHeaderCreator
    constructor(@inject(TYPES.VueConfigurerArgs){
        studentViewCreator, classroomCreator,
        teacherViewCreator, topicCreator, headerCreator,
    }: VueConfigurerArgs ) {
        this.classroomCreator = classroomCreator
        this.studentViewCreator = studentViewCreator
        this.teacherViewCreator = teacherViewCreator
        this.topicCreator = topicCreator
        this.headerCreator = headerCreator
    }
    public configure() {
        Vue.use(VueRouter)
        console.log('vue configured')
        const Classroom = this.classroomCreator.create()
        const StudentView = this.studentViewCreator.create()
        const TeacherView = this.teacherViewCreator.create()
        const Topic = this.topicCreator.create()
        const Header = this.headerCreator.create()

        Vue.component('classroom', Classroom)
        Vue.component('topic', Topic)
        Vue.component('appHeader', Header)
        const routes = [
            { path: '/', component: StudentView, props: true },
            { path: '/' + GLOBALS.TEACHER_VIEW_PATH + '/:classroomId', component: TeacherView, props: true },
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
            // store: this.store,
            router
        } as ComponentOptions<any> /*TODO: should be ComponentOptions<Vue>*/)
    }
}

@injectable()
export class VueConfigurerArgs {
    @inject(TYPES.IClassroomCreator) public classroomCreator: IClassroomCreator
    @inject(TYPES.IStudentViewCreator) public studentViewCreator: IStudentViewCreator
    @inject(TYPES.ITeacherViewCreator) public teacherViewCreator: ITeacherViewCreator
    @inject(TYPES.ITopicCreator) public topicCreator: ITopicCreator
    @inject(TYPES.IHeaderCreator) public headerCreator: IHeaderCreator
}
