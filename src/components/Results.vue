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
        data: function () {
            return {}
        },
        computed: {
            results() {
                return this.searchStore.getResults(this.path)
            },
            shouldRender() {
                return this.results.length > 0
            },
        },
        render(h) {
            if (!this.shouldRender) {
                return ''
            }

            let slots = this.results.map(result => this.$scopedSlots.default({result}))

            return h(this.tag, slots)
        },
    }
</script>
