import {ITeacher} from "../../interfaces";

export function isValidTeacher(teacher: ITeacher) {
    return teacher && teacher.classes
}