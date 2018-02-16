import {inject, injectable, tagged} from 'inversify';
import {Store} from "vuex";
import {IApp, IDataSubscriber, IQuestion, IVueConfigurer} from "../interfaces";
import './main.less'
import {TYPES} from "../types";
import * as firebase from 'firebase'
import Reference = firebase.database.Reference;
import {TAGS} from "./tags";
import {AppArgs} from "./app";
import {MUTATION_NAMES} from "./appStore";
@injectable()
export class DataSubscriber implements IDataSubscriber {
    private classroom1QuestionsRef: Reference
    private store: Store<any>
    constructor(@inject(TYPES.DataSubscriberArgs){classroom1QuestionsRef, store}: DataSubscriberArgs) {
        this.classroom1QuestionsRef = classroom1QuestionsRef
        this.store = store
    }
    public start() {
        // this.classroom1QuestionsRef.on('value', snapshot => {
        //     const questions: IQuestion[] = snapshot.val()
        //     console.log('data received', questions)
        //     if (!questions) {
        //         return
        //     }
        //     this.store.commit(MUTATION_NAMES.LOAD_CLASSROOM_1_QUEUE_DATA, questions)
        //
        // })
        console.log("dataSubscriber started")
        // this.vueConfigurer.configure()
    }
}

@injectable()
export class DataSubscriberArgs {
    @inject(TYPES.FirebaseReference)
    @tagged(TAGS.ClassRoom1QuestionsRef, true)
        classroom1QuestionsRef: Reference
    @inject(TYPES.Store) public store: Store<any>
}
