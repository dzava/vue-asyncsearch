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
                default: 'No results matched your query.',
            },
            path: {
                type: String,
                default: 'data',
            },
        },
        computed: {
            show() {
                return this.searchStore.getResults(this.path).length === 0 && !this.searchStore.isFirstLoad
            },
        },
    }
</script>
