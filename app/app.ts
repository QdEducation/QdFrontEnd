import {inject, injectable, tagged} from 'inversify';
import {IApp, IDataSubscriber, IVueConfigurer} from "../interfaces";
import './main.less'
import {TYPES} from "../types";
@injectable()
export class App implements IApp {
    private vueConfigurer: IVueConfigurer
    private dataSubscriber: IDataSubscriber
    constructor(@inject(TYPES.AppArgs){vueConfigurer, dataSubscriber}: AppArgs ) {
        this.vueConfigurer = vueConfigurer
        this.dataSubscriber = dataSubscriber
    }
    public start() {
        console.log("app started")
        this.vueConfigurer.configure()
        this.dataSubscriber.start()
    }
}

@injectable()
export class AppArgs {
    @inject(TYPES.IVueConfigurer) vueConfigurer: IVueConfigurer
    @inject(TYPES.IDataSubscriber) dataSubscriber: IDataSubscriber
}
