<style>
</style>

<template>
    <button v-if="current < total"
            :disabled="isLoading"
            :class="{ 'as-load-more-is-loading': isLoading }"
            @click="loadMore()">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import PaginationMixin from '../mixins/PaginationMixin'

    export default {
        mixins: [ParamMixin, PaginationMixin],
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

                this.value++
                this.searchStore.loadMore()

                this.searchStore.start()
            },
        },
    }
</script>
