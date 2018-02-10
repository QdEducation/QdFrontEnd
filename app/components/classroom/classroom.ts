import {inject, injectable} from "inversify";
import {IClassroomCreator} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
const template = require('./classroom.html').default

@injectable()
export class ClassroomCreator implements IClassroomCreator {
    private store: Store<any>
    constructor(@inject(TYPES.ClassroomCreatorArgs){
        store
    }: ClassroomCreatorArgs ) {
        this.store = store
    }
    public create() {
        const me = this
        const component = {
            props: ['classroomId'],
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
                    title: 'temp title',
                    date: 'temp date',
                    topicsData: [],
                }
            },
            watch: {
            },
            computed: {
                topics() {
                    return me.store.getters
                }
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
export class ClassroomCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
}
