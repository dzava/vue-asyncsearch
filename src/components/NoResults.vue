<style>
</style>

<template>
    <div v-if="show">
        <slot>
            No results matched your query.
        </slot>
    </div>
</template>

<script>
    export default {
        inject: ['searchStore'],
        data: function () {
            return {}
        },
        computed: {
            show() {
                return this.searchStore.results.length === 0 && !this.searchStore.isFirstLoad
            },
        },
    }
</script>
