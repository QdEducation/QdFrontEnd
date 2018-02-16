import './classroomCreator.less'
import {MUTATION_NAMES} from "../../appStore";
import {
    IClass, id, ITeacher, ITeacherLoader, IClassroomLoader,
    IClassroomCreatorCreator, IClassWithId, LoadClassRoomMutationArgs, CreateClassroomMutationArgs
} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
import {inject, injectable} from "inversify";
const env = process.env.NODE_ENV || 'development'
if (env === 'test') {
    let register = require('ignore-styles').default
    if (!register) {
        register = require('ignore-styles')
    }
    register(['.html'])
}
// tslint:disable-next-line no-var-requires
const template = require('./classroomCreator.html').default || require('./classroomCreator.html')
const md5 = require('md5').default || require('md5')


@injectable()
export class ClassroomCreatorCreator implements IClassroomCreatorCreator {
    private teacherLoader: ITeacherLoader
    private classroomLoader: IClassroomLoader
    constructor(@inject(TYPES.ITeacherLoader){
        teacherLoader,
        classroomLoader
    }: RoomCreatorCreatorArgs){
        this.teacherLoader = teacherLoader
        this.classroomLoader = classroomLoader
    }

    public create()
    {
        const me = this
        console.log('teacherClassViewerCreator create just called')
        const component =
        {
            template, // '<div> {{movie}} this is the tree template</div>',
            props: ['teacherId'],
            async created() {
                // this.$store.commit(MUTATION_NAMES.LOAD_ROOMS_FOR_TEACHER, {teacherId: this.$store.getters.userId})

                console.log('studentClassViewer created with teacherId id of', this.teacherId)
                // const teacherId: id = this.$store.getters.userId
                const teacherId: id = this.teacherId
                const teacher: ITeacher = await me.teacherLoader.downloadData(teacherId)
                if (!teacher.classes) {
                    // actually create the classes property for the teacherId rather than just returning
                    return
                }
                const classPromises: Promise<IClassWithId>[] = Object.keys(teacher.classes).map(async (classId: id) => {
                    const klass: IClass = await me.classroomLoader.downloadData(classId)
                    const classWithId: IClassWithId = {
                        ...klass,
                        id: classId
                    }
                    console.log('classWithId is', classWithId)
                    return classWithId
                })
                console.log('classPromises downloaded in studentClassViewer are', classPromises)
                const classes: IClassWithId[] = await Promise.all(classPromises)
                console.log('classes downloaded in studentClassViewer are', classes)
                classes.forEach((klass: IClassWithId) => {
                    const mutationArgs: LoadClassRoomMutationArgs = {
                        classroomId: klass.id,
                        classroom: klass
                    }
                    this.$store.commit(MUTATION_NAMES.LOAD_CLASSROOM, mutationArgs)
                })


                // load the teacherId into the state - so that we can get the classroomIds that belong to the teacherId
                // use a getter to get all the classroomIds that belong to the teacherId
                // use classroomLoader to load each class for each classId
                // now our roomsComputedProperty getter will behave as expec
            },
            computed: {
                roomIds(): id[] {
                    console.log('rooms computed called in roomcreator')
                    const teacherId: id = this.teacherId
                    const roomIds: id[] = this.$store.getters.classroomIdsByTeacher(teacherId)
                    return roomIds

                },
                rooms(): IClass[] {
                    return []
                }
                // userHasAccess() {
                //     const has: boolean = this.$store.getters.userHasAccess(this.$store.getters.userId)
                //     console.log('has is ', has) // << should actually be a promise
                //     return has
                // }
            },
            methods: {
                createClassroom(classroomName){
                    const stringToHash = this.teacherId + '__' + classroomName
                    const id = md5(stringToHash)
                    const mutationArgs: CreateClassroomMutationArgs = {
                        teacherId: this.teacherId,
                        clasroomName: classroomName,
                        classroomId: id
                    }
                    this.$store.commit(MUTATION_NAMES.CREATE_CLASSROOM, mutationArgs)

                }
            },
            data() {
                return {
                }
            },
        }
    }
}
@injectable()
export class RoomCreatorCreatorArgs {
    @inject(TYPES.ITeacherLoader) public teacherLoader: ITeacherLoader
    @inject(TYPES.IClassLoader) public classroomLoader: IClassroomLoader
}

// export default
