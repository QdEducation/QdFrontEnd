import {inject, injectable} from "inversify";
import {IFormattedQuestion, IQuestion, ITeacherViewCreator} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
const template = require('./teacherClassViewer.html').default
import './teacherClassViewer.less'
import {GLOBALS} from "../../globals";

const DEFAULT_CLASSROOM_ID = '1'
@injectable()
export class TeacherViewCreator implements ITeacherViewCreator {
    private store: Store<any>
    constructor(@inject(TYPES.TeacherViewCreatorArgs){
       store
   }: TeacherViewCreatorArgs ) {
        this.store = store
    }
    public create() {
        const me = this
        console.log('teacherViewCreator create just called')
        const component = {
            props: ['classroomId'],
            template,
            async created() {
                console.log('teacher view created')
            },
            mounted() {
                console.log('teacher view mounted')
                // this.$store.commit()
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
                questions() {
                    const questionsUnformatted: IQuestion[] = me.store.getters.questions(this.classroomId)
                    console.log('questions Unformatted in questions computed is ', questionsUnformatted)
                    const questionsFormatted: IFormattedQuestion[] = formatQuestions({store: me.store, questions: questionsUnformatted})
                    console.log('questions formatted in questions computed is ', questionsFormatted)
                    return questionsFormatted
                }
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
}
