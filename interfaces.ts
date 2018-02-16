export interface IApp {
    start()
}
export interface IDataSubscriber {
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
export interface IStudentClassViewerCreator extends IComponentCreator {
}
export interface ITeacherClassViewerCreator extends IComponentCreator {
}
export interface ITopicCreator extends IComponentCreator {
}
export interface IHeaderCreator extends IComponentCreator {
}
export interface IClassroomCreatorCreator extends IComponentCreator {
}

export interface ITopic {
    title: string,
    tags: string[]
}
export interface ITopicWithId extends ITopic {
    id: id,
}
export interface IPerson {
    name: string
}
export interface IStudent extends IPerson {
}
export interface ITeacher extends IPerson {
    classes: IHash<boolean> // hashmap of class ids that belong to the teacherId
}
export interface IClass {
    name: string,
    teacherId: id,
    queue: IHash<id> // hash map of user ids //<IPerson[],
    // topics: id[],
}
export interface IClassWithId extends IClass {
    id: id
}
export interface IQuestion {
    student: id,
    topic: id,
}
export interface IFormattedQuestion {
    studentName: string,
    topic: string,
}
export type id = string // CANNOT be 0 or "0" because of falsey checks
export interface IHash<T> {
    [id: string]: T
}
export interface IState {
    userId: id,
    classes: IHash<IClass>,
    students: IHash<IStudent>,
    teachers: IHash<ITeacher>,
    topics: IHash<ITopic>,
    teacherLoader: ITeacherLoader
}

export interface ToggleUserHasQuestionMutationArgs {
    classroomId, userId, topicId
}
export interface ToggleUserNeedsHelpMutationArgs {
    classroomId, userId //, topicId
}
export interface RemoveUserHasQuestionMutationArgs {
    classroomId, questionIndex
}
export interface LoadRoomsForTeachersMutationArgs {
    teacherId,
}
export interface LoadClassRoomMutationArgs {
    classroomId: id,
    classroom: IClass
}
export interface CreateClassroomMutationArgs {
    teacherId: id,
    classroomId: id,
    clasroomName: string
}


// loaders
export interface ITeacherLoader {
    downloadData(teacherId): Promise<ITeacher>
}
export interface IClassroomLoader {
    downloadData(classId: id): Promise<IClass>
}
