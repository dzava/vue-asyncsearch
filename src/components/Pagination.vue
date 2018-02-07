<style>
</style>

<template>
    <nav class="as-pagination" v-if="total > 1">
        <slot :current="current" :total="total" :page="page">
            <a href="#"
               class="as-pagination-item"
               :class="{ 'active': current === p }"
                v-for="p in total"
                @click.prevent="page(p)">
                {{ p }}
            </a>
        </slot>
    </nav>
</template>

<script>
    export default {
        inject: ['searchStore'],
        props: {
            name: {
                default: 'page',
                type: String,
            },
        },
        computed: {
            current() {
                return this.searchStore.pagination.current_page
            },
            total() {
                return this.searchStore.pagination.last_page
            },
            value: {
                get() {
                    return this.searchStore.getFilter(this.name)
                },
                set(value) {
                    this.searchStore.setFilter(this.name, value)
                },
            },
        },
        methods: {
            page(page) {
                this.value = page
            },
        },
        created() {
            this.searchStore.registerFilter(this.name, 1)
        },
    }
</script>
