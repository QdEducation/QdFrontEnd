import {IQuestion} from "../interfaces";

export function isQueueValid(queue: IQuestion[]) {
    if (!(queue instanceof Array)){
        return false
    }
    if (queue.length){
        const question0 = queue[0]
        return question0.topic && question0.student
    }

}