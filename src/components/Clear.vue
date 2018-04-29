<style>
</style>

<template>
    <button type="reset" @click.prevent="clear">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            params: {
                type: Array,
                default() {
                    return []
                },
            },
            label: {
                type: String,
                default: 'Clear',
            },
        },
        methods: {
            clear() {
                if (this.params.length) {
                    this.searchStore.stop()

                    this.params.forEach(p => this.searchStore.resetQueryParam(p))

                    this.searchStore.start()
                    this.searchStore.refresh()
                } else {
                    this.searchStore.clear()
                }
            },
        },
    }
</script>
