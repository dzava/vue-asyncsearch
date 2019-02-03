<style>
</style>

<template>
    <button @click.prevent="search()">
        <slot>Search</slot>
    </button>
</template>

<script>
    export default {
        inject: ['searchStore'],
        methods: {
            search() {
                return this.searchStore.refresh()
            },
        },
    }
</script>
