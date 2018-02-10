export default {
    props: {
        name: {
            default: 'page',
            type: String,
        },
        defaultValue: {
            default: 1,
        },
        refreshOnChange: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        current() {
            return this.searchStore.pagination.current_page
        },
        total() {
            return this.searchStore.pagination.last_page
        },
        isLoading() {
            return this.searchStore.isLoading
        },
    },
}
