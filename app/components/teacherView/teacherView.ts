import {inject, injectable} from "inversify";
import {IFormattedQuestion, IQuestion, ITeacherViewCreator} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
const template = require('./teacherView.html').default

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
            },
            data() {
                return {
                }
            },
            watch: {
            },
            computed: {
                questions() {
                    const questionsUnformatted: IQuestion[] = me.store.getters.questions(this.classroomId)
                    console.log('questions Unformatted in questions computed is ', questionsUnformatted)
                    const questionsFormatted = formatQuestions({store: me.store, questions: questionsUnformatted})
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
    return []
}
@injectable()
export class TeacherViewCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
}
