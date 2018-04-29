<style>
</style>

<template>
    <button @click.prevent="search()">
        <slot>{{ label }}</slot>
    </button>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            label: {
                type: String,
                default: 'Search',
            },
        },
        methods: {
            search() {
                return this.searchStore.refresh()
            },
        },
    }
</script>
