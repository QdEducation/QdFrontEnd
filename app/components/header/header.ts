import {inject, injectable} from "inversify";
import {
    IHeaderCreator, id, IQuestion, ITopic, ITopicWithId,
    ToggleUserHasQuestionMutationArgs
} from "../../../interfaces";
import {Store} from "vuex";
import {TYPES} from "../../../types";
import {MUTATION_NAMES} from "../../appStore";
const template = require('./header.html').default
import './header.less'

@injectable()
export class HeaderCreator implements IHeaderCreator {
    private store: Store<any>
    constructor(@inject(TYPES.HeaderCreatorArgs){
        store
    }: HeaderCreatorArgs ) {
        this.store = store
    }
    public create() {
        const me = this
        const component = {
            props: ['title', 'subtitle'],
            template,
        }
        return component
        // return {} as Component
    }
}
@injectable()
export class HeaderCreatorArgs {
    @inject(TYPES.Store) public store: Store<any>
}
