import './main.less'
const env = process.env.NODE_ENV || 'development'
if (env === 'test') {
    let register = require('ignore-styles').default
    if (!register) {
        register = require('ignore-styles')
    }
    register(['.html'])
}
// tslint:disable-next-line no-var-requires
const template = require('./main.html').default
export default {
    template, // '<div> {{movie}} this is the tree template</div>',
    props: [],
    async created() {
    },
    computed: {
        userHasAccess() {
            const has: boolean = this.$store.getters.userHasAccess(this.$store.getters.userId)
            console.log('has is ', has) // << should actually be a promise
            return has
        }
    },
    asyncComputed: {
    },
    data() {
        return {
            userId: this.$store.state.userId
            // studySettings: defaultStudySettings
        }
    },
}
