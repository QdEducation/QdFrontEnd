import {inject, injectable} from "inversify";
import {
    IClassroomCreator, id, IQuestion, ITopic, ITopicWithId,
    ToggleUserHasQuestionMutationArgs
} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
import {MUTATION_NAMES} from "../../appStore";
const template = require('./classroom.html').default
import './classroom.less'
import {GLOBALS} from "../../globals";

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
                    date: GLOBALS.date,
                    title: GLOBALS.className,
                }
            },
            watch: {
            },
            computed: {
                topics() {
                    const topics: ITopicWithId[] = me.store.getters.topics(this.classroomId)
                    console.log('topics in topics computed is ', topics)
                    return topics
                },
                userId() {
                    const userId: id = me.store.getters.userId
                    return userId
                }
            },
            methods: {
                aMethod() {
                    console.log('a method called')
                },
                tapTopic(topicId) {
                    console.log('tap topic called')
                    const mutationArgs: ToggleUserHasQuestionMutationArgs = {
                        topicId,
                        userId: this.userId,
                        classroomId: this.classroomId,
                    }
                    me.store.commit(MUTATION_NAMES.TOGGLE_USER_HAS_QUESTION, mutationArgs)
                }
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
