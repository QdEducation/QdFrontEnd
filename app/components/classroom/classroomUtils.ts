import {IClass, id, IHash, IQuestion, IState} from "../../../interfaces";
import {classroom1QuestionsRef} from "../../../inversify.config";

export function getQuestionIndex({classes, classroomId, question}: {classes: IHash<IClass>, classroomId: id, question: IQuestion}): number {
    const classroom: IClass = classes[classroomId]
    const questions: IQuestion[] = classroom.queue
    const index = questions.indexOf(question)

    return index
}
export function removeQuestion({classes, classroomId, questionIndex}: {classes: IHash<IClass>, classroomId: id, questionIndex: number}) {
    const klass = classes[classroomId]
    const questions: IQuestion[] = klass.queue
    questions.splice(questionIndex, 1)
}
export function addQuestion({classes, classroomId, question}: {classes: IHash<IClass>, classroomId: id, question: IQuestion}) {
    const klass = classes[classroomId]
    const questions: IQuestion[] = klass.queue
    questions.push(question)
    classroom1QuestionsRef.update(questions)
    console.log('addQuestion questions just pushed. . . questions are now ', questions)
}
