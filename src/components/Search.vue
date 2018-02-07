<style>

</style>

<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    import SearchStore from '../SearchStore'

    export default {
        provide() {
            if (this.searchStore) {
                this.localSearchStore = this.searchStore
            } else {
                this.localSearchStore = new SearchStore(this.url, this.storeConfig)
            }

            return {
                searchStore: this.localSearchStore,
            }
        },
        props: {
            url: {
                type: String,
                required: true,
            },
            searchStore: {
                default() {
                    return this.localSearchStore
                },
            },
            storeConfig: {
                type: Object,
                default() {
                    return {}
                },
            },
        },
        data() {
            return {
                localSearchStore: null,
            }
        },
        mounted() {
            this.localSearchStore.start()
            this.localSearchStore.search()
        },
    }
</script>
