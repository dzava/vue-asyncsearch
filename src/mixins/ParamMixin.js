export default {
    inject: ['searchStore'],
    props: {
        name: {
            type: String,
            required: true,
        },
        defaultValue: {
            default: '',
        },
        resetParams: {
            type: Array,
            default() {
                return []
            },
        },
    },
    computed: {
        value: {
            get() {
                return this.searchStore.getQueryParam(this.name)
            },
            set(value) {
                this.searchStore.stop()

                this.searchStore.setQueryParam(this.name, value)
                this.resetParams.forEach(param => this.searchStore.resetQueryParam(param))

                this.searchStore.start()
                this.searchStore.search()
            },
        },
    },
    created() {
        this.searchStore.addQueryParam(this.name, this.defaultValue)
    },
}
