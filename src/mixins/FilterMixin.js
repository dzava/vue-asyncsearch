export default {
    inject: ['searchStore'],
    props: {
        name: {
            type: String,
            required: true,
        },
        defaultValue: {
            required: true,
        },
        resetFilters: {
            default() {
                return []
            },
        },
    },
    computed: {
        value: {
            get() {
                return this.searchStore.getFilter(this.name)
            },
            set(value) {
                this.searchStore.stop()

                this.searchStore.setFilter(this.name, value)
                this.resetFilters.forEach(filter => this.searchStore.resetFilter(filter))

                this.searchStore.start()
                this.searchStore.search()
            },
        },
    },
    created() {
        this.searchStore.registerFilter(this.name, this.defaultValue)
    },
}
