import {inject, injectable} from "inversify";
import {IClassroomCreator, IQuestion, ITopic} from "../../../interfaces";
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
            async created() {
                console.log('teacher view created')
            },
            mounted() {
            },
            data() {
                return {
                    date: 'sample date',
                    title: 'sample title',
                }
            },
            watch: {
            },
            computed: {
                topics() {
                    const topics: ITopic[] = me.store.getters.topics(this.classroomId)
                    console.log('topics in topics computed is ', topics)
                    return topics
                }
            },
        }
        return component
        // return {} as Component
    }
}
@injectable()
export class ClassroomCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
}
