import {ITeacher, ITeacherLoader} from "../../interfaces";
import {inject, injectable, tagged} from "inversify";
import Reference = firebase.database.Reference;
import {TYPES} from "../../types";
import {TAGGED} from "inversify/dts/constants/metadata_keys";
import {TAGS} from "../tags";
import {isValidTeacher} from "./teacherValidator";

@injectable()
export class TeacherLoader implements ITeacherLoader {
    private firebaseRef: Reference
    constructor(@inject(TYPES.TeacherLoaderArgs){firebaseRef}: TeacherLoaderArgs) {
        this.firebaseRef = firebaseRef
    }
    public downloadData(teacherId): Promise<ITeacher> {
        return new Promise((resolve, reject) => {
            this.firebaseRef.once('value', snapshot => {
                const teacher: ITeacher = snapshot.val()
                console.log('teacher with id of ' + teacherId + 'just downloaded')
                if (!isValidTeacher(teacher)){
                }
                resolve(teacher)
            })
        }) as Promise<ITeacher>
    }

}
@injectable()
export class TeacherLoaderArgs {
    @inject(TYPES.FirebaseReference)
    @tagged(TAGS.USERS_REF, true)
        private firebaseRef: Reference
}