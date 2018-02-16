import {IClass, IClassLoader, ITeacher, ITeacherLoader} from "../../interfaces";
import {inject, injectable, tagged} from "inversify";
import Reference = firebase.database.Reference;
import {TYPES} from "../../types";
import {TAGS} from "../tags";

@injectable()
export class ClassLoader implements IClassLoader {
    private firebaseRef: Reference
    constructor(@inject(TYPES.ClassLoaderArgs){firebaseRef}: ClassLoaderArgs) {
        this.firebaseRef = firebaseRef
    }
    public downloadData(classId): Promise<IClass> {
        console.log('classRoomLoader ' + classId + 'downloading! ')
        return new Promise((resolve, reject) => {
            this.firebaseRef.once('value', snapshot => {
                const klass: IClass = snapshot.val()
                console.log('class with id of ' + classId + 'just downloaded. it is ' + klass)
                // if (!isValidTeacher(teacher)){
                // }
                resolve(klass)
            })
        }) as Promise<IClass>
    }

}
@injectable()
export class ClassLoaderArgs {
    @inject(TYPES.FirebaseReference)
    @tagged(TAGS.USERS_REF, true)
    private firebaseRef: Reference
}
