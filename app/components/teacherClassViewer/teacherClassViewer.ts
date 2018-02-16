import {inject, injectable} from "inversify";
import {
    IClass, IClassroomLoader, IFormattedQuestion, IQuestion, ITeacherClassViewerCreator,
    LoadClassRoomMutationArgs
} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
const template = require('./teacherClassViewer.html').default
import './teacherClassViewer.less'
import {GLOBALS} from "../../globals";
import {MUTATION_NAMES} from "../../appStore";

const DEFAULT_CLASSROOM_ID = '1'
@injectable()
export class TeacherClassViewerCreator implements ITeacherClassViewerCreator {
    private store: Store<any>
    private classLoader: IClassroomLoader
    constructor(@inject(TYPES.TeacherViewCreatorArgs){
        store,
        classLoader
   }: TeacherViewCreatorArgs ) {
        this.store = store
        this.classLoader = classLoader
    }
    public create() {
        const me = this
        console.log('teacherClassViewerCreator create just called')
        const component = {
            props: ['classroomId'],
            template,
            async created() {
                console.log('teacherId view created')
            },
            async mounted() {
                // load data via loaders, and upon that data receive call a store mutation to essentially store in store whatever users need help
                console.log('teacherId view mounted', this.classroomId)
                const classroom: IClass = await me.classLoader.downloadData(this.classroomId)
                const mutationArgs: LoadClassRoomMutationArgs = {
                    classroomId: this.classroomId,
                    classroom
                }
                this.$store.commit(MUTATION_NAMES.LOAD_CLASSROOM, mutationArgs)

                // TODO: add syncing . . . so that whenever a new user gets added to the classroom queue, it gets added to store and then piped in to the teacherClassViewer via getters
            },
            data() {
                return {
                    date: GLOBALS.date,
                    title: GLOBALS.className,
                }
            },
            watch: {
            },
            computed: {
                usersWhoNeedHelp() {
                    return this.$store.getters.usersWhoNeedHelp(this.classroomId)
                },
                // questions() {
                //     const questionsUnformatted: IQuestion[] = me.store.getters.questions(this.classroomId)
                //     console.log('questions Unformatted in questions computed is ', questionsUnformatted)
                //     const questionsFormatted: IFormattedQuestion[] = formatQuestions({store: me.store, questions: questionsUnformatted})
                //     console.log('questions formatted in questions computed is ', questionsFormatted)
                //     return questionsFormatted
                // }
            },
        }
        return component
        // return {} as Component
    }
}
function formatQuestions({store, questions}: {store: Store<any>, questions: IQuestion[]}): IFormattedQuestion[] {
    const formattedQuestions: IFormattedQuestion[] = questions.map(q => {
        const formattedQuestion: IFormattedQuestion = {
            studentName: store.getters.studentName(q.student),
            topic: store.getters.topicName(q.topic)
        }
        return formattedQuestion
    })
    return formattedQuestions
}
@injectable()
export class TeacherViewCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
    @inject(TYPES.IClassLoader) public classLoader: IClassroomLoader
}
