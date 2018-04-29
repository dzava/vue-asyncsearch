<style>
</style>

<template>
    <div v-if="hasResults">
        <slot v-for="(result, index) in results" :result="result" :index="index">
            {{ result }}
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
            results() {
                return this.searchStore.results
            },
            hasResults() {
                return this.results.length > 0
            },
        },
    }
</script>
