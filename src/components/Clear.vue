<style>
</style>

<template>
    <button type="reset" @click.prevent="clear">
        <slot>
            <span>Clear</span>
        </slot>
    </button>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            filters: {
                type: Array,
                default() {
                    return []
                },
            },
        },
        data: function () {
            return {}
        },
        methods: {
            clear() {
                if (this.filters.length) {
                    this.searchStore.stop()

                    this.filters.forEach(f => this.searchStore.resetFilter(f))

                    this.searchStore.start()
                    this.searchStore.search()
                } else {
                    this.searchStore.clear()
                }
            },
        },
    }
</script>
