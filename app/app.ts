import {inject, injectable, tagged} from 'inversify';
import {IApp, IVueConfigurer} from "../interfaces";
import {TYPES} from "../types";
@injectable()
export class App implements IApp {
    private vueConfigurer: IVueConfigurer
    constructor(@inject(TYPES.AppArgs){vueConfigurer}: AppArgs ) {
        this.vueConfigurer = vueConfigurer
    }
    public start() {
        console.log("app started")
        this.vueConfigurer.configure()
    }
}

@injectable()
export class AppArgs {
    @inject(TYPES.IVueConfigurer) vueConfigurer: IVueConfigurer
}
