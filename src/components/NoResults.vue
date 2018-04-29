<style>
</style>

<template>
    <div v-if="show">
        <slot>
            {{ message }}
        </slot>
    </div>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            message: {
                type: String,
                default: 'No results matched your query.'
            },
        },
        computed: {
            show() {
                return this.searchStore.results.length === 0 && !this.searchStore.isFirstLoad
            },
        },
    }
</script>
