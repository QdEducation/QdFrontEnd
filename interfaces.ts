export interface IApp {
    start()
}
export interface IVueConfigurer {
    configure()
}
export interface IComponentCreator {
    create()
}
export interface IStudentViewCreator extends IComponentCreator {
}
export interface IClassroomCreator extends IComponentCreator {
}
export interface ITeacherViewCreator extends IComponentCreator {
}

export interface ITopic {
    title: string,
    tags: string[]
}
export interface IPerson {
    name: string
}
export interface IStudent extends IPerson {
}
export interface ITeacher extends IPerson {
}
export interface IClass {
    teacher: id,
    queue: IQuestion[],
    topics: id[],
}
export interface IQuestion {
    student: id,
    topic: id,
}
export interface IFormattedQuestion {
    studentName: string,
    topic: string,
}
export type id = string
export interface IHash<T> {
    [id: string]: T
}
export interface IState {
    userId: id,
    classes: IHash<IClass>,
    students: IHash<IStudent>,
    teachers: IHash<ITeacher>,
    topics: IHash<ITopic>,
}

export interface ToggleUserHasQuestionMutationArgs {
    classroomId, userId, topicId
}
export interface RemoveUserHasQuestionMutationArgs {
    classroomId, questionIndex
}
