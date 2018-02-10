import {Container, ContainerModule, interfaces} from "inversify";
import {App, AppArgs} from "./app/app";
import {IApp, IVueConfigurer} from "./interfaces";
import {TYPES} from "./types";
import {VueConfigurer, VueConfigurerArgs} from "./app/vueConfigurer";

export const myContainer = new Container()
export const app
    = new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind) => {
    bind<IApp>(TYPES.IApp)
        .to(App)
    bind<AppArgs>(TYPES.AppArgs)
        .to(AppArgs)
    bind<IVueConfigurer>(TYPES.IVueConfigurer)
        .to(VueConfigurer)
    bind<VueConfigurerArgs>(TYPES.VueConfigurerArgs)
        .to(VueConfigurerArgs)
})
export function myContainerLoadAllModules() {
    myContainer.load(app)
}

