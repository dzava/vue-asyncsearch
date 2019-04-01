<style>
</style>

<template>
    <button v-if="current < total"
            :disabled="isLoading"
            :class="{ 'is-loading': isLoading }"
            @click="loadMore()">
        <slot>
            {{ label }}
        </slot>
    </button>
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
            label: {
                type: String,
                default: 'Load more',
            },
        },
        methods: {
            loadMore() {
                if (this.reachedTheEnd) {
                    return
                }

                this.searchStore.stop()
                this.value = this.current + 1
                this.searchStore.start()
                this.searchStore.loadMore()
            },
        },
    }
</script>
