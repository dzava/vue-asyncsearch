<style>
</style>

<template>
    <div v-if="isLoading">
        <slot>{{ message }}</slot>
    </div>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            message: {
                default: 'Loading...',
            },
        },
        computed: {
            isLoading() {
                return this.searchStore.isLoading
            },
        },
    }
</script>
