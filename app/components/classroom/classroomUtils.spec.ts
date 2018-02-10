import test from 'ava'
import {expect} from 'chai'
import {IClass, id, IHash, IQuestion, IState} from "../../../interfaces";
import {addQuestion, getQuestionIndex, removeQuestion} from "./classroomUtils";

test('getQuestionIndex valid', t => {
    const topic0 = '2344'
    const topic1 = '52344'
    const topic2 = '652344'
    const studentA = '0987'
    const studentB = '10987'
    const index0topic: id = topic2
    const index0student: id = studentA
    const index1topic: id = topic1
    const index1student: id = studentB
    const teacher: id = '23324'
    const topics: id[] = [topic0, topic1, topic2]
    const questionToSearchFor: IQuestion = {
        topic: index1topic, student: index1student
    }
    const queue: IQuestion[] = [
        {topic: index0topic, student: index0student},
        questionToSearchFor
    ]
    const aClass: IClass = {
        teacher,
        topics,
        queue
    }
    const classroomId = '2342343424'
    const classes: IHash<IClass> = {
        [classroomId]: aClass
    }
    const expectedIndex = 1
    const actualIndex = getQuestionIndex({classes, classroomId, question: questionToSearchFor})
    // const state: IState =
    expect(expectedIndex).to.deep.equal(actualIndex)

    t.pass()

})
test('getQuestionIndex valid', t => {
    const topic0 = '2344'
    const topic1 = '52344'
    const topic2 = '652344'
    const studentA = '0987'
    const studentB = '10987'
    const index0topic: id = topic2
    const index0student: id = studentA
    const index1topic: id = topic1
    const index1student: id = studentB
    const teacher: id = '23324'
    const topics: id[] = [topic0, topic1, topic2]
    const questionToSearchFor: IQuestion = {
        topic: index1topic, student: index1student
    }
    const nonExistentQuestion: IQuestion = {
        topic: '92837469328743728694', student: '92837469328743728694'
    }
    const queue: IQuestion[] = [
        {topic: index0topic, student: index0student},
        questionToSearchFor
    ]
    const aClass: IClass = {
        teacher,
        topics,
        queue
    }
    const classroomId = '2342343424'
    const classes: IHash<IClass> = {
        [classroomId]: aClass
    }
    const expectedIndex = -1
    const actualIndex = getQuestionIndex({classes, classroomId, question: nonExistentQuestion})
    // const state: IState =
    expect(expectedIndex).to.deep.equal(actualIndex)

    t.pass()

})
test('addQuestion', t => {
    const topic0 = '2344'
    const topic1 = '52344'
    const topic2 = '652344'
    const studentA = '0987'
    const studentB = '10987'
    const index0topic: id = topic2
    const index0student: id = studentA
    const index1topic: id = topic1
    const index1student: id = studentB
    const teacher: id = '23324'
    const topics: id[] = [topic0, topic1, topic2]
    const questionToAdd: IQuestion = {
        topic: index1topic, student: index1student
    }
    const queue: IQuestion[] = [
        {topic: index0topic, student: index0student},
    ]
    const expectedQueue: IQuestion[] = [
        ...queue,
        questionToAdd
    ]
    const aClass: IClass = {
        teacher,
        topics,
        queue
    }
    const classroomId = '2342343424'
    const classes: IHash<IClass> = {
        [classroomId]: aClass
    }


    addQuestion({classes, classroomId, question: questionToAdd})
    const actualQueue = classes[classroomId].queue
    expect(actualQueue).to.deep.equal(expectedQueue)
    t.pass()

})
test('removeQuestion', t => {
    const topic0 = '2344'
    const topic1 = '52344'
    const topic2 = '652344'
    const studentA = '0987'
    const studentB = '10987'
    const index0topic: id = topic2
    const index0student: id = studentA
    const index1topic: id = topic1
    const index1student: id = studentB
    const teacher: id = '23324'
    const topics: id[] = [topic0, topic1, topic2]
    const questionToRemove: IQuestion = {
        topic: index1topic, student: index1student
    }
    const expectedQueue: IQuestion[] = [
        {topic: index0topic, student: index0student},
    ]
    const queue: IQuestion[] = [
        ...expectedQueue,
        questionToRemove
    ]
    const aClass: IClass = {
        teacher,
        topics,
        queue
    }
    const classroomId = '2342343424'
    const classes: IHash<IClass> = {
        [classroomId]: aClass
    }
    const indexToRemove = 1
    removeQuestion({classes, classroomId, questionIndex: indexToRemove})
    const actualQueue = classes[classroomId].queue
    // const state: IState =
    expect(actualQueue).to.deep.equal(expectedQueue)

    t.pass()
})
