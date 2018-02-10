<style>

</style>

<template>
    <input type="text" v-model="value"/>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'

    const debounce = require('lodash.debounce')

    export default {
        mixins: [ParamMixin],
        computed: {
            value: {
                get() {
                    return this.searchStore.getQueryParam(this.name)
                },
                set(value) {
                    this.searchStore.stop()

                    this.searchStore.setQueryParam(this.name, value)
                    this.resetParams.forEach(param => this.searchStore.resetQueryParam(param))

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
    }
</script>
