import {IClass, id, IHash, IQuestion, IState} from "../../../interfaces";
import {classroom1QuestionsRef, classroomsRef} from "../../../inversify.config";

export function getQuestionIndex({classes, classroomId, question}: {classes: IHash<IClass>, classroomId: id, question: IQuestion}): number {
    // console.log("getQUestionIndex ", classroomId, question)
    // const classroom: IClass = classes[classroomId]
    // const questions: IQuestion[] = classroom.queue
    let index = -1
    // for (let i = 0; i < questions.length; i++ ) {
    //     let {topic, student} = questions[i]
    //     if (topic == question.topic && student == question.student){
    //         index = i
    //         break
    //     }
    // }
    // console.log("END getQUestionIndex ", index, classroomId, question)

    return index
}
export function hasQuestion({classes, classroomId, question}){
    return getQuestionIndex({classes, classroomId, question}) > -1
}
export function removeStudentFromHelp({classes, classroomId, studentId}:{classes: IHash<IClass>, classroomId: id, studentId: id} ){
    console.log('removeStudentFromHelp called. classroomId' + classroomId + 'studentId ' + studentId)
    const classroomRef = classroomsRef.child(classroomId)
    const queueRef = classroomRef.child('queue')
    const queueStudentEntryRef = classroomRef.child(studentId)
    queueStudentEntryRef.update(false)
}
export function addStudentToHelp({classes, classroomId, studentId}:{classes: IHash<IClass>, classroomId: id, studentId: id} ){
    console.log('addStudentToHelp called. classroomId' + classroomId + 'studentId ' + studentId)
    const classroomRef = classroomsRef.child(classroomId)
    const queueRef = classroomRef.child('queue')
    const queueStudentEntryRef = classroomRef.child(studentId)
    queueStudentEntryRef.update(true)
}
export function removeQuestion({classes, classroomId, questionIndex}: {classes: IHash<IClass>, classroomId: id, questionIndex: number}) {
    // const klass = classes[classroomId]
    // const questions: IQuestion[] = klass.queue
    // questions.splice(questionIndex, 1)
    // console.log('removeQuestions questions about to be. . . questions are currently ', questions)
    // classroom1QuestionsRef.update(questions)
    // console.log('removeQuestions questions just pushed. . . questions are now ', questions)
}
export function addQuestion({classes, classroomId, question}: {classes: IHash<IClass>, classroomId: id, question: IQuestion}) {
    // const klass = classes[classroomId]
    // const questions: IQuestion[] = klass.queue
    // questions.push(question)
    // classroom1QuestionsRef.update(questions)
    // console.log('addQuestion questions just pushed. . . questions are now ', questions)
}
