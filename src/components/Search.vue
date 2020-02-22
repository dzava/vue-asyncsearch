<style>
</style>

<script>
    import SearchStore from '../SearchStore'

    export default {
        provide() {
            if (this.searchStore) {
                this.localSearchStore = this.searchStore
            } else {
                this.localSearchStore = new SearchStore(this.url, this.storeConfig)
            }

            return {
                searchStore: this.localSearchStore,
            }
        },
        props: {
            url: {
                type: String,
                required: true,
            },
            searchStore: {
                default() {
                    return this.localSearchStore
                },
            },
            http: {
                default() {
                    return this.$http || window.axios
                },
            },
            pagination: {
                type: Object,
                default() {
                    return {last_page: 'last_page', current_page: 'current_page'}
                },
            },
            refreshOnParamChange: {
                type: Boolean,
                default: true,
            },
            useHistory: {
                type: Boolean,
                default: true,
            },
            searchOnLoad: {
                type: Boolean,
                default: true,
            },
            tag: {
                type: String,
                default: 'div',
            },
        },
        data() {
            return {
                localSearchStore: null,
            }
        },
        computed: {
            storeConfig() {
                return {
                    http: this.http,
                    pagination: this.pagination,
                    refreshOnParamChange: this.refreshOnParamChange,
                    useHistory: this.useHistory,
                }
            },
        },
        mounted() {
            this.localSearchStore.start()
            if (this.searchOnLoad) {
                this.localSearchStore.refresh()
            }
        },
        methods: {
            refresh() {
                this.localSearchStore.refresh()
            },
        },
        render(h) {
            const slots = this.$scopedSlots.default({refresh: this.refresh})

            if (slots.length === 1) {
                return slots[0]
            }

            return h(this.tag, slots)
        },
    }
</script>
