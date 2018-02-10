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

    export default {
        mixins: [ParamMixin],
        props: {
            name: {
                default: 'page',
                type: String,
            },
            defaultValue: {
                default: 1,
            }
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
