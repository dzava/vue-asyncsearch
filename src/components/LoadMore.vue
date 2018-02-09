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
    export default {
        inject: ['searchStore'],
        props: {
            name: {
                default: 'page',
                type: String,
            },
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
            value: {
                get() {
                    return this.searchStore.getFilter(this.name)
                },
                set(value) {
                    this.searchStore.setFilter(this.name, value)
                },
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
        created() {
            this.searchStore.registerFilter(this.name, 1)
        },
    }
</script>
