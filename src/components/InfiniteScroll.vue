<style>
</style>

<template>
    <div>
        <slot :reachedTheEnd="reachedTheEnd" :reachedLimit="reachedLimit">
        </slot>
    </div>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import PaginationMixin from '../mixins/PaginationMixin'
    import ValueMixin from '../mixins/ValueMixin'

    export default {
        mixins: [ParamMixin, PaginationMixin, ValueMixin()],
        props: {
            addToUrl: {
                type: Boolean,
                default: false,
            },
            limit: {
                type: Number,
                default: 0,
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                },
            },
            delay: {
                type: Number,
                default: 1000,
            },
        },
        data() {
            return {
                observer: null,
                timesLoaded: 0,
            }
        },
        computed: {
            reachedLimit() {
                return this.limit > 0 && this.timesLoaded >= this.limit
            },
        },
        methods: {
            loadMore() {
                if (this.reachedTheEnd) {
                    return
                }
                this.timesLoaded++

                this.searchStore.stop()
                this.value++
                this.searchStore.loadMore()
                this.searchStore.start()
            },
            setupObserver() {
                this.observer = new IntersectionObserver((entries) => {

                    if (this.reachedLimit) {
                        this.observer.disconnect()
                        return
                    }

                    let shouldLoad = entries.filter(entry => entry.isIntersecting).length > 0

                    if (shouldLoad) {
                        this.loadMore()
                    }

                }, this.options)

                this.observer.observe(this.$el)
            },
        },
        watch: {
            current(current) {

                if (current !== 1) {
                    return
                }

                this.timesLoaded = 0
                this.observer.observe(this.$el)
            },
        },
        mounted() {
            setTimeout(this.setupObserver, this.delay)
        },
    }
</script>
