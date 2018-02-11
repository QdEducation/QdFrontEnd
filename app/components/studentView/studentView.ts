import {inject, injectable} from "inversify";
import {IStudentViewCreator} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
const template = require('./studentView.html').default
import './studentView.less'

const DEFAULT_CLASSROOM_ID = '1'
@injectable()
export class StudentViewCreator implements IStudentViewCreator {
    private store: Store<any>
    constructor(@inject(TYPES.StudentViewCreatorArgs){
       store
   }: StudentViewCreatorArgs ) {
        this.store = store
    }
    public create() {
        const me = this
        console.log('studentViewCreator create just called')
        const component = {
            template,
            // '<div>This is the template for tree.html</div>',
            // require('./tree.html'), // '<div> {{movie}} this is the tree template</div>',
            async created() {
                console.log('student view created')
            },
            mounted() {
            },
            data() {
                return {
                    classroomId: DEFAULT_CLASSROOM_ID
                }
            },
            watch: {
            },
            computed: {
            },
            methods: {
                aMethod() {
                },
            }
        }
        return component
        // return {} as Component
    }
}
@injectable()
export class StudentViewCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
}
