<script>
    export default {
        inject: ['searchStore'],
        props: {
            tag: {
                type: String,
                default: 'div',
            },
        },
        data: function () {
            return {}
        },
        computed: {
            results() {
                return this.searchStore.results
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
