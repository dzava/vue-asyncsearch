<script>
    export default {
        inject: ['searchStore'],
        props: {
            tag: {
                type: String,
                default: 'div',
            },
            path: {
                type: String,
                default: 'data',
            },
        },
        computed: {
            show() {
                return this.searchStore.getResults(this.path).length === 0 && !this.searchStore.isFirstLoad
            },
        },
        render(h) {
            if (this.show === false) {
                return null
            }

            return h(this.tag, this.$slots.default)
        },
    }
</script>
