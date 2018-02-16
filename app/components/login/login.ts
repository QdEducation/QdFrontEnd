import {MUTATION_NAMES} from '../../appStore';
import * as firebase from 'firebase';
const env = process.env.NODE_ENV || 'development'
let template
if (env === 'test') {
    let register = require('ignore-styles').default || require('ignore-styles')
    register(['.html, .less'])
} else {
    let style = require('./login.less').default || require('./login.less')
    template = require('./login.html').default || require('./login.html')
}
// tslint:disable-next-line no-var-requires
export default {
    template, // '<div> {{movie}} this is the tree template</div>',
    data() {
        return {
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        }
    },
    // TODO: loggedIn getter
    methods: {
        loginWithGoogle() {
            this.$store.commit(MUTATION_NAMES.LOGIN_WITH_GOOGLE)
        }
    }
}
