<script>
    export default {
        inject: ['searchStore'],
        props: {
            delay: {
                type: Number,
                default: 0,
            },
            tag: {
                type: String,
                default: 'div',
            },
        },
        data() {
            return {
                show: false,
                timeoutId: null,
            }
        },
        watch: {
            'searchStore.isLoading'(isLoading) {
                if (isLoading) {
                    clearTimeout(this.timeoutId)
                    this.timeoutId = setTimeout(() => this.show = true, this.delay)
                } else {
                    clearTimeout(this.timeoutId)
                    this.timeoutId = null
                    this.show = false
                }
            },
        },
        render(h) {
            if (this.show) {
                return h(this.tag, this.$slots.default)
            }
        },
    }
</script>
