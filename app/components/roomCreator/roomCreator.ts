import './roomCreator.less'
import {MUTATION_NAMES} from "../../appStore";
import {IClass} from "../../../interfaces";
const env = process.env.NODE_ENV || 'development'
if (env === 'test') {
    let register = require('ignore-styles').default
    if (!register) {
        register = require('ignore-styles')
    }
    register(['.html'])
}
// tslint:disable-next-line no-var-requires
const template = require('./roomCreator.html').default || require('./roomCreator.html')
export default {
    template, // '<div> {{movie}} this is the tree template</div>',
    props: [],
    async created() {
        this.$store.commit(MUTATION_NAMES.LOAD_ROOMS_FOR_TEACHER, {teacherId: this.$store.getters.userId})
    },
    computed: {
        rooms(): IClass[] {
            console.log('rooms computed called in roomcreator')
            return this.$store.getters.roomsByTeacher(this.$store.getters.userId)
        }
        // userHasAccess() {
        //     const has: boolean = this.$store.getters.userHasAccess(this.$store.getters.userId)
        //     console.log('has is ', has) // << should actually be a promise
        //     return has
        // }
    },
    data() {
        return {
        }
    },
}
