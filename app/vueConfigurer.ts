import {inject, injectable, tagged} from 'inversify';
import {IApp, IClassroomCreator, IStudentViewCreator, ITeacherViewCreator, IVueConfigurer} from "../interfaces";
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
    private classroomCreator: IClassroomCreator
    private studentViewCreator: IStudentViewCreator
    private teacherViewCreator: ITeacherViewCreator
    constructor(@inject(TYPES.VueConfigurerArgs){
        studentViewCreator, classroomCreator,
        teacherViewCreator,
    }: VueConfigurerArgs ) {
        this.classroomCreator = classroomCreator
        this.studentViewCreator = studentViewCreator
        this.teacherViewCreator = teacherViewCreator
    }
    public configure() {
        Vue.use(VueRouter)
        console.log('vue configured')
        const Classroom = this.classroomCreator.create()
        const StudentView = this.studentViewCreator.create()
        const TeacherView = this.teacherViewCreator.create()

        Vue.component('classroom', Classroom)
        const routes = [
            { path: '/', component: StudentView, props: true },
            { path: '/teacherView', component: TeacherView, props: true },
        ]

        const router = new VueRouter({
            routes,
            mode: 'history',
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
    @inject(TYPES.IClassroomCreator) classroomCreator: IClassroomCreator
    @inject(TYPES.IStudentViewCreator) studentViewCreator: IStudentViewCreator
    @inject(TYPES.ITeacherViewCreator) teacherViewCreator: ITeacherViewCreator
}
