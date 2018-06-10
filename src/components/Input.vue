<style>

</style>

<template>
    <input type="text" v-model="value" @keydown.enter.prevent="onEnter"/>
</template>

<script>
    import ParamMixin from '../mixins/ParamMixin'

    const debounce = require('lodash.debounce')

    export default {
        mixins: [ParamMixin],
        props: {
            delay: {
                type: Number,
                default: 500,
            },
        },
        computed: {
            value: {
                get() {
                    return this.searchStore.getQueryParam(this.name)
                },
                set(value) {
                    this.searchStore.stop()
                    this.resetParams.forEach(param => this.searchStore.resetQueryParam(param))

                    this.searchStore.setQueryParam(this.name, value)
                    this.searchStore.start()
                    if (this.refreshOnChange) {
                        this.delayedSearch()
                    }
                },
            },
            delayedSearch() {
                return debounce(function () {
                    this.searchStore.refresh()
                }, this.delay)
            },
        },
        methods: {
            onEnter() {
                if (!this.refreshOnChange) {
                    this.searchStore.refresh()
                }
            },
        },
    }
</script>
