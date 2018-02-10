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
    import ParamMixin from '../mixins/ParamMixin'

    export default {
        mixins: [ParamMixin],
        props: {
            name: {
                default: 'page',
                type: String,
            },
            defaultValue: {
                default: 1,
            },
        },
        computed: {
            current() {
                return this.searchStore.pagination.current_page
            },
            total() {
                return this.searchStore.pagination.last_page
            },
        },
        methods: {
            page(page) {
                this.value = page
            },
        },
    }
</script>
