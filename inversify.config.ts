import {Container, ContainerModule, interfaces} from "inversify";
import {App, AppArgs} from "./app/app";
import {IApp, IClassroomCreator, IStudentViewCreator, ITeacherViewCreator, IVueConfigurer, ITopicCreator, IHeaderCreator} from "./interfaces";
import {TYPES} from "./types";
import {VueConfigurer, VueConfigurerArgs} from "./app/vueConfigurer";
import {ClassroomCreator, ClassroomCreatorArgs} from "./app/components/classroom/classroom";
import {StudentViewCreator, StudentViewCreatorArgs} from "./app/components/studentView/studentView";
import {Store} from "vuex";
import Vuex from 'vuex'
import Vue from 'vue'
import {default as AppStore, AppStoreArgs} from "./app/appStore";
import {TeacherViewCreator, TeacherViewCreatorArgs} from "./app/components/teacherView/teacherView";
import {TopicCreator, TopicCreatorArgs} from "./app/components/topic/topic";
import {HeaderCreator, HeaderCreatorArgs} from "./app/components/header/header";

export const myContainer = new Container()
// export const components =
export const appStoreArgs
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<AppStoreArgs>(TYPES.AppStoreArgs).to(AppStoreArgs)

})

export const components
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IClassroomCreator>(TYPES.IClassroomCreator)
        .to(ClassroomCreator)
    bind<ClassroomCreatorArgs>(TYPES.ClassroomCreatorArgs)
        .to(ClassroomCreatorArgs)
    bind<IStudentViewCreator>(TYPES.IStudentViewCreator)
        .to(StudentViewCreator)
    bind<StudentViewCreatorArgs>(TYPES.StudentViewCreatorArgs)
        .to(StudentViewCreatorArgs)
    bind<ITeacherViewCreator>(TYPES.ITeacherViewCreator)
        .to(TeacherViewCreator)
    bind<TeacherViewCreatorArgs>(TYPES.TeacherViewCreatorArgs)
        .to(TeacherViewCreatorArgs)
    bind<ITopicCreator>(TYPES.ITopicCreator)
        .to(TopicCreator)
    bind<TopicCreatorArgs>(TYPES.TopicCreatorArgs)
        .to(TopicCreatorArgs)
    bind<IHeaderCreator>(TYPES.IHeaderCreator)
        .to(HeaderCreator)
    bind<HeaderCreatorArgs>(TYPES.HeaderCreatorArgs)
        .to(HeaderCreatorArgs)
})
export const app
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IApp>(TYPES.IApp)
        .to(App)
    bind<AppArgs>(TYPES.AppArgs)
        .to(AppArgs)
    bind<IVueConfigurer>(TYPES.IVueConfigurer)
        .to(VueConfigurer)
    bind<VueConfigurerArgs>(TYPES.VueConfigurerArgs)
        .to(VueConfigurerArgs)
    const store = new AppStore(appStoreArgs) as Store<any>
    bind<Store<any>>(TYPES.Store)
        .toConstantValue(store)
})
export function myContainerLoadAllModules() {
    myContainer.load(app)
    myContainer.load(components)
}

