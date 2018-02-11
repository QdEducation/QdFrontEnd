import {inject, injectable} from "inversify";
import {
    IFormattedQuestion, IQuestion, ITeacherViewCreator, ITopic, ITopicCreator,
    ToggleUserHasQuestionMutationArgs
} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
import {MUTATION_NAMES} from "../../appStore";
const template = require('./topic.html').default
import './topic.less'

const DEFAULT_CLASSROOM_ID = '1'
@injectable()
export class TopicCreator implements ITopicCreator {
    private store: Store<any>
    constructor(@inject(TYPES.TopicCreatorArgs){
        store
    }: TopicCreatorArgs ) {
        this.store = store
    }
    public create() {
        const me = this
        console.log('topicCreator create just called', template)
        const component = {
            props: ['topicData', 'topicId'],
            template,
            computed: {
                title() {
                    return this.topicData && this.topicData.title
                },
                active() {
                    return Math.random() > .5
                }
            },
            methods: {
            }
        }
        return component
        // return {} as Component
    }
}
function formatQuestions({store, questions}: {store: Store<any>, questions: IQuestion[]}): IFormattedQuestion[] {
    return []
}
@injectable()
export class TopicCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
}
