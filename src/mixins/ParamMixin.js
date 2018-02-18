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
        refreshOnChange: {
            type: Boolean,
            default() {
                return this.searchStore.getOption('refreshOnParamChange')
            },
        },
        addToUrl: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        value: {
            get() {
                return this.searchStore.getQueryParam(this.name)
            },
            set(value) {
                this.searchStore.stop()
                this.resetParams.forEach(param => this.searchStore.resetQueryParam(param))
                this.searchStore.start()

                this.searchStore.setQueryParam(this.name, value)
            },
        },
    },
    created() {
        this.searchStore.addQueryParam(this.name, this.defaultValue, {
            refreshOnChange: this.refreshOnChange,
            addToUrl: this.addToUrl,
        })
    },
}
