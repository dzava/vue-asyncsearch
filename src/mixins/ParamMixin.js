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
    created() {
        this.searchStore.addQueryParam(this.name, this.defaultValue, {
            refreshOnChange: this.refreshOnChange,
            addToUrl: this.addToUrl,
        })
    },
}
