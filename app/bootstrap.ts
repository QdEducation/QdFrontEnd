import 'reflect-metadata'
import {myContainer, myContainerLoadAllModules} from "../inversify.config";
import {IApp} from "../interfaces";
import {TYPES} from "../types";

console.log('hello world')
myContainerLoadAllModules()
const app: IApp = myContainer.get<IApp>(TYPES.IApp)
app.start()
