<style>

</style>

<template>
    <input type="text" v-model="value"/>
</template>

<script>
    const debounce = require('lodash.debounce')

    export default {
        inject: ['searchStore'],
        props: {
            name: {
                required: true,
            },
            defaultValue: {
                default: '',
            },
            resetFilters: {
                default() {
                    return []
                },
            },
        },
        computed: {
            value: {
                get() {
                    return this.searchStore.getFilter(this.name)
                },
                set(value) {
                    this.searchStore.stop()

                    this.searchStore.setFilter(this.name, value)
                    this.resetFilters.forEach(filter => this.searchStore.resetFilter(filter))

                    this.searchStore.start()
                    this.delayedSearch()
                },
            },
        },
        methods: {
            delayedSearch: debounce(function () {
                this.searchStore.search()
            }, 300),
        },
        created() {
            this.searchStore.registerFilter(this.name, this.defaultValue)
        },
    }
</script>
