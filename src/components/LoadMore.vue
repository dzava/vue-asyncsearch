<style>
</style>

<template>
    <button v-if="current < total"
            :disabled="isLoading"
            :class="{ 'as-load-more-is-loading': isLoading }"
            @click="loadMore()">
        <slot>
            Load more
        </slot>
    </button>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'
    import PaginationMixin from '../mixins/PaginationMixin'

    export default {
        mixins: [ParamMixin, PaginationMixin],
        methods: {
            loadMore() {
                if (this.value + 1 > this.total) {
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
