import {Container, ContainerModule, interfaces} from "inversify";
import {App, AppArgs} from "./app/app";
import {
    IApp, IClassroomCreator, IStudentViewCreator, ITeacherClassViewerCreator, IVueConfigurer, ITopicCreator,
    IHeaderCreator, IDataSubscriber, IState, ITeacherLoader, IClassLoader
} from "./interfaces";
import {TYPES} from "./types";
import {VueConfigurer, VueConfigurerArgs} from "./app/vueConfigurer";
import {ClassroomCreator, ClassroomCreatorArgs} from "./app/components/studentClassViewer/studentClassViewer";
import {StudentViewCreator, StudentViewCreatorArgs} from "./app/components/studentView/studentView";
import {Store} from "vuex";
import Vuex from 'vuex'
import Vue from 'vue'
import {default as AppStore, AppStoreArgs} from "./app/appStore";
import {TeacherClassViewerCreator, TeacherViewCreatorArgs} from "./app/components/teacherClassViewer/teacherClassViewer";
import {TopicCreator, TopicCreatorArgs} from "./app/components/topic/topic";
import {HeaderCreator, HeaderCreatorArgs} from "./app/components/header/header";
import firebaseConfig = require('./app/firebaseConfig.json')
import * as firebase from 'firebase'
import Reference = firebase.database.Reference;
import {TAGS} from "./app/tags";
import {DataSubscriber, DataSubscriberArgs} from "./app/dataSubscriber";
import {TeacherLoader, TeacherLoaderArgs} from "./app/loaders/teacherLoader";
import {ClassLoader, ClassLoaderArgs} from "./app/loaders/classLoader";
const initialState: IState = require('./app/initialData.json')

firebase.initializeApp(firebaseConfig)
export const myContainer = new Container()
// export const components =
export const appStoreArgsModule
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<AppStoreArgs>(TYPES.AppStoreArgs).to(AppStoreArgs)

})
export const classroomsRef = firebase.database().ref('classrooms')
export const classroom1QuestionsRef = firebase.database().ref('classrooms/1')
export const usersRef = firebase.database().ref('users')
export const references
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<Reference>(TYPES.FirebaseReference).toConstantValue(classroom1QuestionsRef)
        .whenTargetTagged(TAGS.ClassRoom1QuestionsRef, true)
    bind<Reference>(TYPES.FirebaseReference).toConstantValue(usersRef)
        .whenTargetTagged(TAGS.USERS_REF, true)
    })

export const loaders
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<TeacherLoaderArgs>(TYPES.TeacherLoaderArgs).to(TeacherLoaderArgs)
    bind<ITeacherLoader>(TYPES.ITeacherLoader)
        .to(TeacherLoader)
    bind<ClassLoaderArgs>(TYPES.ClassLoaderArgs).to(ClassLoaderArgs)
    bind<IClassLoader>(TYPES.IClassLoader)
        .to(ClassLoader)
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
    bind<ITeacherClassViewerCreator>(TYPES.ITeacherViewCreator)
        .to(TeacherClassViewerCreator)
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
    bind<IDataSubscriber>(TYPES.IDataSubscriber)
        .to(DataSubscriber)
    bind<DataSubscriberArgs>(TYPES.DataSubscriberArgs)
        .to(DataSubscriberArgs)

   bind<IState>(TYPES.IState)
       .toConstantValue(initialState)

    const appStoreArgs = myContainer.get<AppStoreArgs>(TYPES.AppStoreArgs)
    const store = new AppStore(appStoreArgs) as Store<any>
    bind<Store<any>>(TYPES.Store)
        .toConstantValue(store)
})
export function myContainerLoadAllModules() {
    myContainer.load(references)
    myContainer.load(loaders)
    myContainer.load(appStoreArgsModule)
    myContainer.load(app)
    myContainer.load(components)
}

